import neo4j from 'neo4j-driver';
import { driver, chromaClient } from '../config/db.mjs';

export function Sum(num1, num2) {
  return num1 + num2;
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

    // Enrich with covers
    const enrichedBooks = await Promise.all(books.map(async (book) => {
      let coverUrl = null;
      if (book.isbn13) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn13}-M.jpg?default=false`;
      } else if (book.isbn) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`;
      }

      if (coverUrl) {
        try {
          const res = await fetch(coverUrl, { method: 'HEAD' });
          if (res.ok) {
            return { ...book, coverUrl };
          }
        } catch (e) {
          // Ignore failed head checks
        }
      }
      return null; // Filtered out later
    }));

    return enrichedBooks.filter(b => b !== null);
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
