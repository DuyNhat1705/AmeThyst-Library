import pool from '../config/db.config.mjs';
import { generateQueryEmbedding } from './embedding.services.mjs';

/**
 * Clean coding: Helper to clean UTF-8 text anomalies.
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/â”€Ã©â”¬âŒ/g, 'Ré')
    .replace(/â”€Ã©â”¬Â¿/g, 'è')
    .replace(/â”€Ã©â”¬Ã¡/g, 'à')
    .replace(/â• Ã‡â•¦Ã¥/g, 'å')
    .replace(/â”œÃ³Î“Ã©Â¼Î“Ã‡Â£/g, '"')
    .replace(/â”œÃ³Î“Ã©Â¼Î“Ã‡Â¥/g, '"')
    .replace(/â”€Ã©â”¬â–“/g, 'ô')
    .replace(/â”€Ã©â”¬â”‚/g, 'ó')
    .replace(/\t/g, ' ')
    .trim();
}

/**
 * Executes standard keyword-based metadata search
 */
export const executeStandardSearch = async (query, filters) => {
  let whereClauses = ['1=1'];
  let params = [];
  let paramIdx = 1;

  if (query && query.trim()) {
    const cleanQuery = `%${query.trim()}%`;
    whereClauses.push(`(
      b.title ILIKE $${paramIdx} OR 
      b.publisher ILIKE $${paramIdx} OR 
      b.isbn ILIKE $${paramIdx} OR 
      array_to_string(b.author, ' ') ILIKE $${paramIdx} OR
      b.description ILIKE $${paramIdx}
    )`);
    params.push(cleanQuery);
    paramIdx++;
  }

  const sql = `
    SELECT DISTINCT b.book_id, b.title, b.author, b.description, b.genres, b.isbn, b.publisher, b.publication_date, b.num_pages, b.language_code, b.image_url
    FROM books b
    LEFT JOIN library l ON b.book_id = l.book_id
    WHERE ${whereClauses.join(' AND ')}${clauseStr}
    ORDER BY b.title ASC
    LIMIT 50
  `;

  const result = await pool.query(sql, params);
  
  return result.rows.map(row => ({
    id: row.book_id,
    title: cleanText(row.title),
    author: row.author ? row.author.map(cleanText).join(', ') : 'Unknown Author',
    description: cleanText(row.description),
    genres: row.genres || [],
    isbn: row.isbn || '',
    publisher: cleanText(row.publisher) || 'N/A',
    publicationDate: row.publication_date ? row.publication_date.toISOString() : null,
    pageCount: row.num_pages || 0,
    language: row.language_code || 'en',
    coverImage: row.image_url || null
  }));
};

/**
 * Executes pgvector similarity-based semantic search
 */
export const executeSemanticSearch = async (query, filters) => {
  try {
    // Check if query is empty
    if (!query || !query.trim()) {
      // Fallback to standard search if query is empty
      return executeStandardSearch('', filters);
    }

    // Generate query embedding
    const embeddingVector = await generateQueryEmbedding(query);
    const vectorStr = JSON.stringify(embeddingVector);

    let params = [vectorStr];
    let paramIdx = 2;

    const sql = `
      SELECT DISTINCT b.book_id, b.title, b.author, b.description, b.genres, b.isbn, b.publisher, b.publication_date, b.num_pages, b.language_code, b.image_url,
             (b.embedding <=> $1::vector) AS distance
      FROM books b
      LEFT JOIN library l ON b.book_id = l.book_id
      WHERE b.embedding IS NOT NULL${clauseStr}
      ORDER BY distance ASC
      LIMIT 50
    `;

    const result = await pool.query(sql, params);

    return result.rows.map(row => ({
      id: row.book_id,
      title: cleanText(row.title),
      author: row.author ? row.author.map(cleanText).join(', ') : 'Unknown Author',
      description: cleanText(row.description),
      genres: row.genres || [],
      isbn: row.isbn || '',
      publisher: cleanText(row.publisher) || 'N/A',
      publicationDate: row.publication_date ? row.publication_date.toISOString() : null,
      pageCount: row.num_pages || 0,
      language: row.language_code || 'en',
      coverImage: row.image_url || null,
      similarity: 1 - (row.distance || 0) // Cosine similarity
    }));
  } catch (error) {
    console.error("Semantic search failed, degrading gracefully to standard search:", error);
    // Graceful degradation
    return executeStandardSearch(query, filters);
  }
};

/**
 * Unified search director
 */
export const executeSearch = async (query, searchMode, filters) => {
  if (searchMode === 'semantic') {
    return executeSemanticSearch(query, filters);
  } else {
    return executeStandardSearch(query, filters);
  }
};
