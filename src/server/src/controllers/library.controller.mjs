import { getBookById, getRecommendations, createReservation, getBooksList, cancelReservationById, getUserBorrowRecords } from '../services/library.services.mjs';

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const result = await getBooksList(page, limit);
    res.json(result);
  } catch (error) {
    console.error('Error fetching books from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const book = await getBookById(id, userId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBookRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const recommendations = await getRecommendations(id);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const reserveBook = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId, branchId } = req.body;
    
    if (!bookId || !branchId) {
      return res.status(400).json({ 
        success: false, 
        error: { code: 'MISSING_PARAMETERS', message: 'bookId and branchId are required' } 
      });
    }

    const result = await createReservation(userId, bookId, branchId);
    
    if (result.error) {
      return res.status(result.statusCode || 400).json({ 
        success: false, 
        error: result.error 
      });
    }
    
    res.status(201).json({ success: true, data: result.reservation });
  } catch (error) {
    console.error('Error reserving book:', error);
    res.status(500).json({ 
      success: false, 
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } 
    });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reservationId } = req.params;

    const result = await cancelReservationById(userId, reservationId);
    
    if (result.error) {
      return res.status(result.statusCode || 400).json({ 
        success: false, 
        error: result.error 
      });
    }
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ 
      success: false, 
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } 
    });
  }
};

const getMyBorrowRecords = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await getUserBorrowRecords(userId);
    res.json(result);
  } catch (error) {
    console.error('Error fetching borrow records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllBooks, getBookDetails, getBookRecommendations, reserveBook, cancelReservation, getMyBorrowRecords };