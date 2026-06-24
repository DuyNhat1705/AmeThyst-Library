import pool from '../config/db.config.mjs';

/**
 * Creates a search history entry for a logged-in user.
 * @param {string} userId - UUID of the user
 * @param {string} searchContent - Composed search text and filters summary
 * @param {string} searchMode - 'standard' or 'semantic'
 * @param {object} filters - JSON object of applied filters
 * @returns {Promise<object>} The created history object
 */
export const createSearchHistory = async (userId, searchContent, searchMode, filters) => {
  const sql = `
    INSERT INTO search_history (user_id, search_content, search_mode, filters, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING search_id AS id, user_id AS "userId", search_content AS "searchContent", search_mode AS "searchMode", filters, clicked_book_ids AS "clickedBookIds", created_at AS timestamp
  `;
  const values = [userId, searchContent, searchMode, JSON.stringify(filters || {})];
  const result = await pool.query(sql, values);
  return result.rows[0];
};

/**
 * Appends a book ID to the clickedBookIds array of a search history entry.
 * @param {string} searchHistoryId - UUID of the search history log
 * @param {string} bookId - ID of the clicked book
 * @returns {Promise<object>} The updated history object or null
 */
export const addClickedBook = async (searchHistoryId, bookId) => {
  const sql = `
    UPDATE search_history
    SET clicked_book_ids = array_append(COALESCE(clicked_book_ids, ARRAY[]::VARCHAR(20)[]), $2)
    WHERE search_id = $1
    RETURNING search_id AS id, user_id AS "userId", search_content AS "searchContent", search_mode AS "searchMode", filters, clicked_book_ids AS "clickedBookIds", created_at AS timestamp
  `;
  const result = await pool.query(sql, [searchHistoryId, bookId]);
  return result.rows[0] || null;
};

/**
 * Retrieves search history entries for a given user.
 * @param {string} userId - UUID of the user
 * @returns {Promise<Array>} List of search history objects
 */
export const getSearchHistoryByUserId = async (userId) => {
  const sql = `
    SELECT search_id AS id, user_id AS "userId", search_content AS "searchContent", search_mode AS "searchMode", filters, clicked_book_ids AS "clickedBookIds", created_at AS timestamp
    FROM search_history
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(sql, [userId]);
  return result.rows;
};

/**
 * Retrieves a search history entry by ID.
 * @param {string} searchHistoryId - UUID of the search history entry
 * @returns {Promise<object>} Search history entry or null
 */
export const getSearchHistoryById = async (searchHistoryId) => {
  const sql = `
    SELECT search_id AS id, user_id AS "userId", search_content AS "searchContent", search_mode AS "searchMode", filters, clicked_book_ids AS "clickedBookIds", created_at AS timestamp
    FROM search_history
    WHERE search_id = $1
  `;
  const result = await pool.query(sql, [searchHistoryId]);
  return result.rows[0] || null;
};
