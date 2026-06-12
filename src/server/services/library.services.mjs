import neo4j from 'neo4j-driver';
import { driver } from '../config/db.mjs';

export function Sum(num1, num2) {
  // Convert to numbers to avoid string concatenation
  return Number(num1) + Number(num2);
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
      // Add a 2-second timeout to the cover check
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      
      const res = await fetch(coverUrl, { 
        method: 'HEAD',
        signal: controller.signal
      });
      clearTimeout(timeout);
      
      if (res.ok) return coverUrl;
    } catch (e) {
      // Ignore failures
    }
  }
  return null;
}

export async function getSurfingBooks(limit = 20, skip = 0, genre = null) {
  const session = driver.session();
  try {
    const query = `
      MATCH (b:Book)
      ${genre ? 'MATCH (b)-[:HAS_GENRE]->(g:Genre {name: $genre})' : ''}
      RETURN b.id AS id, b.title AS title, b.isbn AS isbn, b.isbn13 AS isbn13
      SKIP $skip LIMIT $limit
    `;

    const result = await session.run(query, { 
      skip: neo4j.int(skip), 
      limit: neo4j.int(limit),
      genre 
    });

    const books = result.records.map(record => ({
      id: record.get('id'),
      title: record.get('title'),
      isbn: record.get('isbn'),
      isbn13: record.get('isbn13')
    }));

    const enrichedBooks = await Promise.all(books.map(async (book) => {
      const coverUrl = await getCoverUrl(book.isbn13, book.isbn);
      return { 
        ...book, 
        coverUrl: coverUrl || `https://via.placeholder.com/150x225?text=${encodeURIComponent(book.title)}` 
      };
    }));

    return enrichedBooks;
  } finally {
    await session.close();
  }
}

export async function getAllGenres() {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (g:Genre) RETURN g.name AS name ORDER BY name`
    );
    return result.records.map(record => record.get('name'));
  } finally {
    await session.close();
  }
}

export async function searchBooksOpac(query, limit = 20) {
  const session = driver.session();
  try {
    // Search in title, isbn, or author name
    const result = await session.run(
      `MATCH (b:Book)
       OPTIONAL MATCH (b)-[:WRITTEN_BY]->(a:Author)
       WITH b, a, toLower($query) AS lowerQuery
       WHERE toLower(b.title) CONTAINS lowerQuery 
          OR b.isbn CONTAINS $query 
          OR toLower(a.name) CONTAINS lowerQuery
       RETURN DISTINCT b.id AS id
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
    const ids = bookIds.map(id => id.toString());
    const result = await session.run(
      `MATCH (b:Book)
       WHERE b.id IN $ids
       OPTIONAL MATCH (b)-[:WRITTEN_BY]->(a:Author)
       RETURN b.id AS id, b.title AS title, b.isbn AS isbn, b.isbn13 AS isbn13, collect(DISTINCT a.name) AS authors`,
      { ids }
    );

    const books = result.records.map(record => ({
      id: record.get('id'),
      title: record.get('title'),
      isbn: record.get('isbn'),
      isbn13: record.get('isbn13'),
      authors: record.get('authors')
    }));

    const bookMap = new Map(books.map(b => [b.id.toString(), b]));
    const orderedBooks = ids.map(id => bookMap.get(id)).filter(Boolean);

    const enrichedBooks = await Promise.all(orderedBooks.map(async (book) => {
      const coverUrl = await getCoverUrl(book.isbn13, book.isbn);
      return { 
        ...book, 
        coverUrl: coverUrl || `https://via.placeholder.com/150x225?text=${encodeURIComponent(book.title)}` 
      };
    }));

    return enrichedBooks;
  } finally {
    await session.close();
  }
}

export async function getBookDetails(bookId) {
  const session = driver.session();
  try {
    // 1. Get Graph Relationships from Memgraph
    const graphResult = await session.run(
      `MATCH (b:Book {id: $bookId})
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

    // 2. Get Vector Data from Python AI Microservice
    let vectorData = null;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/vector-data`);
      if (response.ok) {
        vectorData = await response.json();
      }
    } catch (e) {
      console.error("AI service retrieval error:", e);
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
