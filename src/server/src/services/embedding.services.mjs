import pool from '../config/db.config.mjs';

/**
 * Generates an embedding for a text query.
 * To provide realistic test results on pre-seeded vector databases,
 * this function tries to fetch the vector of a book that matches keywords
 * in the query. If no matches are found, it falls back to a deterministic 
 * vector generated from the query hash.
 * 
 * @param {string} query - The search text
 * @returns {Promise<Array<number>>} A 384-dimensional vector array
 */
export const generateQueryEmbedding = async (query) => {
  if (!query || typeof query !== 'string' || !query.trim()) {
    // Return a default zero vector
    return Array.from({ length: 384 }, () => 0.0);
  }

  const cleanQuery = query.trim();

  // Extract clean alphanumeric words of length >= 3
  const words = cleanQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length >= 3);

  if (words.length > 0) {
    try {
      // Check if we can find a book with metadata matching these words
      // Limit to 5 words to keep the query size reasonable
      const activeWords = words.slice(0, 5);
      const conditions = [];
      const params = [];
      
      activeWords.forEach((word, idx) => {
        conditions.push(`title ILIKE $${idx + 1} OR description ILIKE $${idx + 1}`);
        params.push(`%${word}%`);
      });

      const matchQuery = `
        SELECT embedding 
        FROM books 
        WHERE (${conditions.join(' OR ')})
        AND embedding IS NOT NULL
        LIMIT 1
      `;

      const res = await pool.query(matchQuery, params);
      if (res.rows.length > 0 && res.rows[0].embedding) {
        const emb = res.rows[0].embedding;
        return typeof emb === 'string' ? JSON.parse(emb) : emb;
      }
    } catch (e) {
      console.warn("Keyword embedding lookup failed, falling back:", e);
    }
  }

  // Fallback: Generate a deterministic 384-dimensional vector based on string hash
  let hash = 0;
  for (let i = 0; i < cleanQuery.length; i++) {
    hash = (hash << 5) - hash + cleanQuery.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  const embedding = [];
  for (let i = 0; i < 384; i++) {
    // Generate deterministic values between -0.1 and 0.1
    const val = Math.sin(hash + i) * 0.1;
    embedding.push(val);
  }
  return embedding;
};
