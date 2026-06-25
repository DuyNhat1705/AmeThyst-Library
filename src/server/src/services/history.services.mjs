import { createSearchHistory, addClickedBook, getSearchHistoryByUserId } from '../models/history.models.mjs';

/**
 * Logs search query and configuration for an authenticated user.
 * 
 * @param {string} userId - The user ID
 * @param {string} query - The search query string
 * @param {object} filters - The active filters
 * @returns {Promise<object|null>} The logged entry or null if skipped
 */
export const logSearchHistory = async (userId, query, filters, bookClicked = null) => {
  if (!userId) return null;

  const cleanQuery = query && query.trim() ? query.trim() : null;
  const hasFilters = filters && Object.keys(filters).length > 0;

  if (!cleanQuery && !hasFilters && !bookClicked) {
    console.log('Skipping search history log for empty query, empty filters, and no book click.');
    return null;
  }

  try {
    return await createSearchHistory(userId, cleanQuery, filters, bookClicked);
  } catch (error) {
    console.error('Error logging search history:', error);
    return null;
  }
};

/**
 * Retrieves search history entries for a given user.
 * 
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} List of user search histories
 */
export const getUserSearchHistory = async (userId) => {
  if (!userId) return [];
  try {
    return await getSearchHistoryByUserId(userId);
  } catch (error) {
    console.error('Error fetching user search history:', error);
    return [];
  }
};

/**
 * Appends a book ID to a search history's click log.
 * 
 * @param {string} searchHistoryId - UUID of the search log
 * @param {string} bookId - ID of the clicked book
 * @returns {Promise<object|null>} The updated history or null
 */
export const logBookClick = async (searchHistoryId, bookId) => {
  if (!searchHistoryId || !bookId) {
    throw new Error('Missing searchHistoryId or bookId');
  }
  try {
    return await addClickedBook(searchHistoryId, bookId);
  } catch (error) {
    console.error('Error logging book click interaction:', error);
    throw error;
  }
};
