import { getUserSearchHistory, logBookClick, logSearchHistory } from '../services/history.services.mjs';

/**
 * Retrieves search history for the authenticated user.
 * GET /api/search/history
 */
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await getUserSearchHistory(userId);
    return res.status(200).json({ history });
  } catch (error) {
    console.error('Error in getHistory controller:', error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Logs click interaction on a book card.
 * POST /api/search/history/click
 */
export const logClick = async (req, res) => {
  try {
    const { searchHistoryId, bookId, query, searchMode = 'standard', filters } = req.body;
    
    if (!bookId) {
      return res.status(400).json({ error: 'Missing bookId' });
    }

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: User must be logged in to log interaction history.' });
    }

    let updatedHistory;
    if (!searchHistoryId) {
      updatedHistory = await logSearchHistory(userId, query, filters, bookId);
    } else {
      updatedHistory = await logBookClick(searchHistoryId, bookId);
    }

    if (!updatedHistory) {
      return res.status(404).json({ error: 'Search history entry not found or failed to log click' });
    }

    return res.status(200).json({
      message: 'Click interaction logged successfully',
      searchHistoryId: updatedHistory.id,
      bookClicked: updatedHistory.bookClicked
    });
  } catch (error) {
    console.error('Error in logClick controller:', error);
    return res.status(500).json({ error: error.message });
  }
};
