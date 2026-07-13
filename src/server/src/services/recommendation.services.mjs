import pool from '../config/postgres.mjs';
import { getSession } from '../config/memgraph.config.mjs';
import { syncRecommendationClick } from './memgraphSync.services.mjs';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { cleanText } from './search.services.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../../');
const PREDICT_SCRIPT = path.join(ROOT_DIR, 'server/src/recommendation/predict.py');

export const RECOMMENDATION_LIMIT = 15;

/**
 * Executes the Python LightGBM ranker script using stdin/stdout.
 */
const runRankerInference = (userId, candidates) => {
  return new Promise((resolve, reject) => {
    const pythonCmd = process.env.PYTHON_COMMAND || 'python';
    
    const pyProcess = spawn(pythonCmd, [PREDICT_SCRIPT], {
      cwd: ROOT_DIR,
      env: { ...process.env, PYTHONPATH: ROOT_DIR }
    });
    
    let stdoutData = '';
    let stderrData = '';
    
    pyProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });
    
    pyProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });
    
    pyProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Predict script exited with code ${code}. Error: ${stderrData}`));
        return;
      }
      
      try {
        const parsed = JSON.parse(stdoutData);
        if (parsed.success) {
          resolve(parsed.ranked);
        } else {
          reject(new Error(parsed.error || 'Unknown python script error'));
        }
      } catch (err) {
        reject(new Error(`Failed to parse prediction output: ${stdoutData}. Error: ${err.message}`));
      }
    });
    
    // Write input JSON to prediction stdin
    pyProcess.stdin.write(JSON.stringify({ user_id: userId, candidates }));
    pyProcess.stdin.end();
  });
};

/**
 * Fetches personalized candidates from Memgraph.
 */
const fetchPersonalizedCandidates = async (userId) => {
  let session;
  try {
    session = getSession();
    
    // First, try matching based on user's recent interactions (User -> Book -> Genre/Author -> Book)
    const interactionQuery = `
      MATCH (u:User {id: $userId})-[r:INTERACTED]->(b_interacted:Book)
      MATCH (b_interacted)-[:HAS_GENRE|WRITTEN_BY]-(meta)-[]-(b_candidate:Book)
      WHERE b_candidate <> b_interacted
      OPTIONAL MATCH (u)-[borrowed:BORROWED]->(b_candidate)
      OPTIONAL MATCH (u)-[wished:WISHED]->(b_candidate)
      OPTIONAL MATCH (u)-[wishlisted:WISHLISTED]->(b_candidate)
      OPTIONAL MATCH (u)-[recommended:RECOMMENDED]->(b_candidate) WHERE recommended.renewed_at IS NULL
      WITH u, b_candidate, borrowed, wished, wishlisted, recommended
      WHERE borrowed IS NULL AND wished IS NULL AND wishlisted IS NULL AND recommended IS NULL
      WITH DISTINCT u, b_candidate
      LIMIT 150
      CALL link_prediction.predict(u, b_candidate) YIELD score
      RETURN b_candidate.id AS id, score
      ORDER BY score DESC
      LIMIT 80
    `;
    
    const result = await session.run(interactionQuery, { userId });
    let candidates = result.records.map(r => ({
      id: r.get('id'),
      gcn_score: r.get('score')
    }));
    
    // If not enough candidates (e.g. cold start), fall back to general high-rated books
    if (candidates.length < 40) {
      console.log(`Cold start or low interaction count for user ${userId}. Fetching general candidates...`);
      const fallbackQuery = `
        MATCH (u:User {id: $userId})
        MATCH (b:Book)
        OPTIONAL MATCH (u)-[borrowed:BORROWED]->(b)
        OPTIONAL MATCH (u)-[wished:WISHED]->(b)
        OPTIONAL MATCH (u)-[wishlisted:WISHLISTED]->(b)
        OPTIONAL MATCH (u)-[recommended:RECOMMENDED]->(b) WHERE recommended.renewed_at IS NULL
        WITH u, b, borrowed, wished, wishlisted, recommended
        WHERE borrowed IS NULL AND wished IS NULL AND wishlisted IS NULL AND recommended IS NULL
        WITH DISTINCT u, b
        ORDER BY b.rating DESC, b.title ASC
        LIMIT 100
        CALL link_prediction.predict(u, b) YIELD score
        RETURN b.id AS id, score
        ORDER BY score DESC
        LIMIT 80
      `;
      const fallbackResult = await session.run(fallbackQuery, { userId });
      const fallbackCandidates = fallbackResult.records.map(r => ({
        id: r.get('id'),
        gcn_score: r.get('score')
      }));
      
      // Merge unique candidates
      const seenIds = new Set(candidates.map(c => c.id));
      for (const fc of fallbackCandidates) {
        if (!seenIds.has(fc.id)) {
          candidates.push(fc);
        }
        if (candidates.length >= 80) break;
      }
    }
    
    return candidates;
  } catch (error) {
    console.error('Failed to fetch GCN candidates from Memgraph:', error);
    return [];
  } finally {
    if (session) {
      await session.close();
    }
  }
};

/**
 * Fetches globally hot/trending candidates from PostgreSQL.
 */
const fetchTrendingCandidates = async (userId) => {
  try {
    const query = `
      SELECT b.book_id, COALESCE(COUNT(bb.borrow_id), 0) + COALESCE(COUNT(uw.wish_id), 0) + COALESCE(COUNT(sh.search_id), 0) as interactions
      FROM public.books b
      LEFT JOIN public.borrow_book bb ON b.book_id = bb.book_id AND bb.reserve_date > NOW() - INTERVAL '30 days'
      LEFT JOIN public.user_wishlist uw ON b.book_id = uw.book_id AND uw.added_at > NOW() - INTERVAL '30 days'
      LEFT JOIN public.search_history sh ON b.book_id = sh.book_clicked AND sh.created_at > NOW() - INTERVAL '30 days'
      WHERE b.book_id NOT IN (
        SELECT book_id FROM public.borrow_book WHERE user_id = $1
        UNION
        SELECT book_id FROM public.user_wishlist WHERE user_id = $1
      )
      GROUP BY b.book_id
      ORDER BY interactions DESC
      LIMIT 20
    `;
    const result = await pool.query(query, [userId]);
    return result.rows.map(row => ({
      id: row.book_id,
      gcn_score: 0.1 // Default baseline GCN score for trending candidates
    }));
  } catch (error) {
    console.error('Failed to fetch trending candidates from Postgres:', error);
    return [];
  }
};

/**
 * Returns active recommendations for a user. If none, generates new ones.
 */
export const getUserRecommendations = async (userId) => {
  try {
    // 1. Check if there are active (unrenewed) recommendations in Postgres
    const activeQuery = `
      SELECT r.book_id, r.score, b.title, b.author, b.image_url
      FROM public.recommends r
      JOIN public.books b ON r.book_id = b.book_id
      WHERE r.user_id = $1 AND r.renewed_at IS NULL
      ORDER BY r.score DESC
      LIMIT ${RECOMMENDATION_LIMIT}
    `;
    const activeRes = await pool.query(activeQuery, [userId]);
    
    if (activeRes.rows.length >= RECOMMENDATION_LIMIT - 1) {
      return activeRes.rows.map(row => ({
        id: row.book_id,
        title: cleanText(row.title),
        author: row.author ? row.author.map(cleanText).join(', ') : 'Unknown Author',
        coverImage: row.image_url || null,
        score: row.score
      }));
    }
    
    // 2. No active recommendations found, generate fresh ones
    return await generateRecommendations(userId);
  } catch (error) {
    console.error('Error in getUserRecommendations:', error);
    // Fallback: RECOMMENDATION_LIMIT random books from catalog if everything fails
    const fallback = await pool.query(
      `SELECT book_id, title, author, image_url FROM public.books LIMIT ${RECOMMENDATION_LIMIT}`
    );
    return fallback.rows.map(row => ({
      id: row.book_id,
      title: cleanText(row.title),
      author: row.author ? row.author.map(cleanText).join(', ') : 'Unknown Author',
      coverImage: row.image_url || null,
      score: 0.0
    }));
  }
};

/**
 * Generates fresh recommendations using two-stage pipeline.
 */
export const generateRecommendations = async (userId) => {
  try {
    // Stage 1: Candidate retrieval
    const [personalized, trending] = await Promise.all([
      fetchPersonalizedCandidates(userId),
      fetchTrendingCandidates(userId)
    ]);
    
    // Merge into unique candidate list
    const candidateMap = new Map();
    personalized.forEach(c => candidateMap.set(c.id, c));
    trending.forEach(c => {
      if (!candidateMap.has(c.id)) {
        candidateMap.set(c.id, c);
      }
    });
    
    let candidatePool = Array.from(candidateMap.values());
    if (candidatePool.length === 0) {
      throw new Error('No recommendation candidates compiled.');
    }
    
    // PostgreSQL Hard Guardrail: Inventory Verification
    const candidateIds = candidatePool.map(c => c.id);
    const stockQuery = `
      SELECT book_id, COALESCE(SUM(available_quantity), 0) as total_copies
      FROM public.library
      WHERE book_id = ANY($1)
      GROUP BY book_id
      HAVING SUM(available_quantity) > 0
    `;
    const stockRes = await pool.query(stockQuery, [candidateIds]);
    const validBookIds = new Set(stockRes.rows.map(row => row.book_id));
    
    // Filter candidates having stock > 0
    let filteredPool = candidatePool.filter(c => validBookIds.has(c.id));
    
    if (filteredPool.length === 0) {
      // If all candidates are out of stock, relax guardrail to show catalog items
      filteredPool = candidatePool;
    }
    
    // Stage 2: Micro Ranking via LightGBM
    const rankedCandidates = await runRankerInference(userId, filteredPool);
    
    // Epsilon-Greedy Exploration Blending
    // Slots 1 to LIMIT-1: Algorithmic Top
    // Slot LIMIT: 10% chance to pick a random choice from ranks LIMIT to 30, 90% chance to pick rank LIMIT-1
    const finalSelection = [];
    
    // Pull top LIMIT - 1 candidates
    const limitForDirect = RECOMMENDATION_LIMIT - 1;
    for (let i = 0; i < Math.min(limitForDirect, rankedCandidates.length); i++) {
      finalSelection.push(rankedCandidates[i]);
    }
    
    // Apply Epsilon-Greedy for the last slot
    if (rankedCandidates.length > limitForDirect) {
      const explore = Math.random() < 0.10;
      if (explore && rankedCandidates.length > RECOMMENDATION_LIMIT) {
        const maxIndex = Math.min(30, rankedCandidates.length - 1);
        const randIdx = Math.floor(RECOMMENDATION_LIMIT + Math.random() * (maxIndex - RECOMMENDATION_LIMIT + 1));
        finalSelection.push(rankedCandidates[randIdx]);
      } else {
        finalSelection.push(rankedCandidates[limitForDirect]);
      }
    }
    
    // Save generated recommendations in PostgreSQL
    const insertValues = [];
    const showedAt = new Date().toISOString();
    
    for (const item of finalSelection) {
      insertValues.push(`('${userId}', '${item.id}', ${item.score}, '${showedAt}')`);
    }
    
    if (insertValues.length > 0) {
      const insertQuery = `
        INSERT INTO public.recommends (user_id, book_id, score, showed_at)
        VALUES ${insertValues.join(', ')}
        ON CONFLICT (user_id, book_id) WHERE (renewed_at IS NULL)
        DO UPDATE SET score = EXCLUDED.score, showed_at = EXCLUDED.showed_at
      `;
      await pool.query(insertQuery);
    }
    
    // Fetch details for returned books
    const selectedIds = finalSelection.map(item => item.id);
    const detailsQuery = `
      SELECT book_id, title, author, image_url
      FROM public.books
      WHERE book_id = ANY($1)
    `;
    const detailsRes = await pool.query(detailsQuery, [selectedIds]);
    const detailsMap = new Map(detailsRes.rows.map(row => [row.book_id, row]));
    
    return finalSelection.map(item => {
      const details = detailsMap.get(item.id);
      return {
        id: item.id,
        title: details ? cleanText(details.title) : 'Unknown Title',
        author: details && details.author ? details.author.map(cleanText).join(', ') : 'Unknown Author',
        coverImage: details ? details.image_url : null,
        score: item.score
      };
    });
    
  } catch (error) {
    console.error('Failed to generate recommendations:', error);
    throw error;
  }
};

/**
 * Renews/archives recommendations.
 */
export const renewUserRecommendations = async (userId) => {
  const renewedAt = new Date().toISOString();
  
  // 1. Invalidate in Postgres
  await pool.query(
    `UPDATE public.recommends SET renewed_at = $1 WHERE user_id = $2 AND renewed_at IS NULL`,
    [renewedAt, userId]
  );
  
  // 2. Generate new recommendations
  return await generateRecommendations(userId);
};

/**
 * Tracks click interaction.
 */
export const logRecommendationClick = async (userId, bookId) => {
  const clickedAt = new Date().toISOString();
  
  // 1. Update in Postgres
  const result = await pool.query(
    `UPDATE public.recommends 
     SET is_clicked = TRUE, renewed_at = $1 
     WHERE user_id = $2 AND book_id = $3 AND renewed_at IS NULL`,
    [clickedAt, userId, bookId]
  );
  
  if (result.rowCount > 0) {
    // 2. Async Non-Blocking sync to Memgraph
    syncRecommendationClick(userId, bookId, clickedAt).catch(err =>
      console.error('Failed to async sync click to Memgraph:', err)
    );
  }
  
  return result.rowCount > 0;
};

/**
 * Fetches trending books list.
 */
export const getTrendingRecommendations = async (userId) => {
  const trending = await fetchTrendingCandidates(userId);
  if (trending.length === 0) {
    // Fallback: 6 random books
    const fallback = await pool.query(
      `SELECT book_id, title, author, image_url FROM public.books LIMIT 6`
    );
    return fallback.rows.map(row => ({
      id: row.book_id,
      title: cleanText(row.title),
      author: row.author ? row.author.map(cleanText).join(', ') : 'Unknown Author',
      coverImage: row.image_url || null
    }));
  }
  
  const selectedIds = trending.map(item => item.id).slice(0, 6);
  const detailsQuery = `
    SELECT book_id, title, author, image_url
    FROM public.books
    WHERE book_id = ANY($1)
  `;
  const detailsRes = await pool.query(detailsQuery, [selectedIds]);
  const detailsMap = new Map(detailsRes.rows.map(row => [row.book_id, row]));
  
  return selectedIds.map(id => {
    const details = detailsMap.get(id);
    return {
      id,
      title: details ? cleanText(details.title) : 'Unknown Title',
      author: details && details.author ? details.author.map(cleanText).join(', ') : 'Unknown Author',
      coverImage: details ? details.image_url : null
    };
  });
};
