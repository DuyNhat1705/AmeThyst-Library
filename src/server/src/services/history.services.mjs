import { createSearchHistory, addClickedBook, getSearchHistoryByUserId } from '../models/history.models.mjs';

/**
 * Composes a rich text summary of search query and filters.
 */
function composeSearchContent(query, filters) {
  const queryStr = query && query.trim() ? `Query: "${query.trim()}"` : 'Query: (None)';
  
  if (!filters || Object.keys(filters).length === 0) {
    return `${queryStr} | Filters: None`;
  }
  
  const filterParts = [];
  
  // Genres
  if (filters.genres && Array.isArray(filters.genres) && filters.genres.length > 0) {
    filterParts.push(`Genres: [${filters.genres.join(', ')}]`);
  }
  
  // Branches
  if (filters.branches && Array.isArray(filters.branches) && filters.branches.length > 0) {
    filterParts.push(`Branches: [${filters.branches.join(', ')}]`);
  }
  
  // Publication date range
  if (filters.publicationDate) {
    const { start, end } = filters.publicationDate;
    if (start && end) {
      filterParts.push(`Years: ${start} - ${end}`);
    } else if (start) {
      filterParts.push(`Years: >= ${start}`);
    } else if (end) {
      filterParts.push(`Years: <= ${end}`);
    }
  }
  
  // Available Only
  if (filters.availableOnly) {
    filterParts.push('Available Only');
  }
  
  const filtersStr = filterParts.length > 0 ? `Filters: { ${filterParts.join('; ')} }` : 'Filters: None';
  return `${queryStr} | ${filtersStr}`;
}

/**
 * Logs search query and configuration for an authenticated user.
 * 
 * @param {string} userId - The user ID
 * @param {string} query - The search query string
 * @param {string} searchMode - 'standard' or 'semantic'
 * @param {object} filters - The active filters
 * @returns {Promise<object|null>} The logged entry or null if skipped
 */
export const logSearchHistory = async (userId, query, searchMode, filters) => {
  if (!userId) return null;

  const cleanQuery = query && query.trim() ? query.trim() : null;
  const hasFilters = filters && Object.keys(filters).length > 0;

  if (!cleanQuery && !hasFilters) {
    console.log('Skipping search history log for empty query and empty filters.');
    return null;
  }

  try {
    const searchContent = composeSearchContent(cleanQuery, filters);
    return await createSearchHistory(userId, searchContent, searchMode, filters);
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
