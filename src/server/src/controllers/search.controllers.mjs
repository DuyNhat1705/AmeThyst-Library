import { executeSearch } from '../services/search.services.mjs';
import { logSearchHistory } from '../services/history.services.mjs';

/**
 * Executes standard/semantic search and logs history for logged-in users.
 * POST /api/search
 */
export const searchBooks = async (req, res) => {
  try {
    const { query, searchMode = 'standard', logHistory = true, filters } = req.body;

    // 1. Run the search
    const books = await executeSearch(query, searchMode, filters);

    // 2. Log search history if user is authenticated and logHistory is true
    let searchHistoryId = null;
    if (logHistory && req.user && req.user.userId) {
      const historyEntry = await logSearchHistory(req.user.userId, query, searchMode, filters);
      if (historyEntry) {
        searchHistoryId = historyEntry.id;
      }
    }

    // 3. Send response according to contract
    return res.status(200).json({
      books,
      totalResults: books.length,
      searchHistoryId
    });
  } catch (error) {
    console.error('Error in searchBooks controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
