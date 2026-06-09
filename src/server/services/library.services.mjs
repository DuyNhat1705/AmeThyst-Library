import neo4j from 'neo4j-driver';
import { driver, chromaClient } from '../config/db.mjs';

export function Sum(num1, num2) {
  return num1 + num2;
}

async function getCoverUrl(isbn13, isbn) {
  let coverUrl = null;
  if (isbn13) {
    coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn13}-M.jpg?default=false`;
  } else if (isbn) {
    coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
  }

  if (coverUrl) {
    try {
      const res = await fetch(coverUrl, { method: 'HEAD' });
      if (res.ok) return coverUrl;
    } catch (e) {
      // Ignore
    }
  }
  return null;
}

export async function getSurfingBooks(limit = 20, skip = 0) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (b:Book) 
       RETURN b.book_id AS id, b.title AS title, b.isbn AS isbn, b.isbn13 AS isbn13
       SKIP $skip LIMIT $limit`,
      { skip: neo4j.int(skip), limit: neo4j.int(limit) }
    );

    const books = result.records.map(record => ({
      id: record.get('id'),
      title: record.get('title'),
      isbn: record.get('isbn'),
      isbn13: record.get('isbn13')
    }));

    const enrichedBooks = await Promise.all(books.map(async (book) => {
      const coverUrl = await getCoverUrl(book.isbn13, book.isbn);
      if (coverUrl) return { ...book, coverUrl };
      return null;
    }));

    return enrichedBooks.filter(b => b !== null);
  } finally {
    await session.close();
  }
}

export async function searchBooksOpac(query, limit = 20) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (b:Book)
       WHERE toLower(b.title) CONTAINS toLower($query) OR b.isbn CONTAINS $query OR b.isbn13 CONTAINS $query
       RETURN b.book_id AS id
       LIMIT $limit`,
      { query, limit: neo4j.int(limit) }
    );
    return result.records.map(record => record.get('id'));
  } finally {
    await session.close();
  }
}

export async function searchBooksSemantic(query, limit = 20) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/search/semantic?q=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    if (data.results) {
      return data.results.map(r => r.book_id);
    }
    return [];
  } catch (error) {
    console.error("Semantic search fetch error:", error);
    return [];
  }
}

export async function enrichSearchResults(bookIds) {
  if (!bookIds || bookIds.length === 0) return [];
  const session = driver.session();
  try {
    // Cast bookIds to strings just in case
    const ids = bookIds.map(id => id.toString());
    const result = await session.run(
      `MATCH (b:Book)
       WHERE b.book_id IN $ids
       OPTIONAL MATCH (b)-[:WRITTEN_BY]->(a:Author)
       RETURN b.book_id AS id, b.title AS title, b.isbn AS isbn, b.isbn13 AS isbn13, collect(DISTINCT a.name) AS authors`,
      { ids }
    );

    const books = result.records.map(record => ({
      id: record.get('id'),
      title: record.get('title'),
      isbn: record.get('isbn'),
      isbn13: record.get('isbn13'),
      authors: record.get('authors')
    }));

    // Maintain order
    const bookMap = new Map(books.map(b => [b.id.toString(), b]));
    const orderedBooks = ids.map(id => bookMap.get(id)).filter(Boolean);

    const enrichedBooks = await Promise.all(orderedBooks.map(async (book) => {
      const coverUrl = await getCoverUrl(book.isbn13, book.isbn);
      if (coverUrl) return { ...book, coverUrl };
      return { ...book, coverUrl: null }; // Keep them but without cover for search results?
      // Actually surfing page filters them. Let's stay consistent if we use masonry.
    }));

    return enrichedBooks.filter(b => b.coverUrl !== null);
  } finally {
    await session.close();
  }
}

export async function getBookDetails(bookId) {
  const session = driver.session();
  try {
    // 1. Get Graph Relationships from Memgraph
    const graphResult = await session.run(
      `MATCH (b:Book {book_id: $bookId})
       OPTIONAL MATCH (b)-[:WRITTEN_BY]->(a:Author)
       OPTIONAL MATCH (b)-[:HAS_GENRE]->(g:Genre)
       RETURN b, collect(DISTINCT a.name) AS authors, collect(DISTINCT g.name) AS genres`,
      { bookId }
    );

    if (graphResult.records.length === 0) return null;

    const record = graphResult.records[0];
    const bookData = record.get('b').properties;
    const authors = record.get('authors');
    const genres = record.get('genres');

    // 2. Get Vector Data from ChromaDB
    let vectorData = null;
    try {
      const collection = await chromaClient.getCollection({ name: "book_descriptions" });
      const chromaRes = await collection.get({
        ids: [bookId.toString()],
        include: ["embeddings", "metadatas", "documents"]
      });
      
      if (chromaRes.ids.length > 0) {
        vectorData = {
          description: chromaRes.documents[0],
          metadata: chromaRes.metadatas[0]
        };
      }
    } catch (e) {
      console.error("ChromaDB retrieval error:", e);
    }

    return {
      ...bookData,
      authors,
      genres,
      vectorData
    };
  } finally {
    await session.close();
  }
}
