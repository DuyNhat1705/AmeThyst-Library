import { getBookById, getRecommendations, getRelatedBooks as getRelatedBooksService, createReservation, getBooksList, cancelReservationById, getUserBorrowRecords, generatePickupPin, cleanupReservationPin, verifyPin as verifyPinService, confirmLoan as confirmLoanService, cancelLoan as cancelLoanService } from '../services/library.services.mjs';

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const { genres, branches, availableOnly, startYear, endYear } = req.query;
    
    const filters = {
      genres: genres ? genres.split(',') : [],
      branches: branches ? branches.split(',').map(Number) : [],
      availableOnly: availableOnly === 'true',
      startYear: startYear ? parseInt(startYear) : null,
      endYear: endYear ? parseInt(endYear) : null
    };

    const result = await getBooksList(page, limit, filters);
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

const getRelatedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const related = await getRelatedBooksService(id);
    res.json(related);
  } catch (error) {
    console.error('Error fetching related books:', error);
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

const generatePin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reservationId } = req.params;

    const result = await generatePickupPin(userId, reservationId);

    if (result.error) {
      return res.status(result.statusCode || 400).json({
        success: false,
        error: result.error
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error generating pickup PIN:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }
    });
  }
};

const cleanupPin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reservationId } = req.params;
    const cleaned = await cleanupReservationPin(userId, reservationId);
    res.json({ success: true, cleaned });
  } catch (error) {
    console.error('Error cleaning up PIN:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }
    });
  }
};

const verifyPin = async (req, res) => {
  console.log('[loan-flow] === verify-pin controller ===');
  try {
    const { pin } = req.body;
    const branchId = req.user.branch_id;
    console.log('[loan-flow] req.body.pin:', pin);
    console.log('[loan-flow] req.user.branch_id:', branchId);
    console.log('[loan-flow] req.user.role:', req.user.role);
    console.log('[loan-flow] req.user.userId:', req.user.userId);

    if (!pin || pin.length !== 6) {
      console.log('[loan-flow] PIN validation failed');
      return res.status(400).json({ success: false, data: null, message: 'A valid 6-digit PIN is required.' });
    }

    console.log('[loan-flow] Calling verifyPinService...');
    const result = await verifyPinService(pin, branchId);
    console.log('[loan-flow] verifyPinService result:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.log('[loan-flow] Service returned error:', result.error.code, result.error.message);
      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }

    console.log('[loan-flow] PIN verified successfully, borrowId:', result.borrowId);
    res.json({ success: true, data: { borrowId: result.borrowId, borrower: result.borrower, book: result.book }, message: 'PIN verified successfully' });
  } catch (error) {
    console.error('[loan-flow] EXCEPTION in verifyPin controller:', error);
    console.error('[loan-flow] Stack:', error.stack);
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

const confirmLoan = async (req, res) => {
  console.log('[loan-flow] === confirm-loan controller ===');
  try {
    const { borrow_id } = req.body;
    console.log('[loan-flow] borrow_id:', borrow_id);

    if (!borrow_id) {
      console.log('[loan-flow] borrow_id missing');
      return res.status(400).json({ success: false, data: null, message: 'borrow_id is required.' });
    }

    console.log('[loan-flow] Calling confirmLoanService...');
    const result = await confirmLoanService(borrow_id);
    console.log('[loan-flow] confirmLoanService result:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.log('[loan-flow] Service returned error:', result.error.code, result.error.message);
      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }

    console.log('[loan-flow] Loan confirmed, borrowId:', result.borrowId, 'due:', result.due_date);
    res.json({ success: true, data: { borrowId: result.borrowId, status: result.status, due_date: result.due_date }, message: 'Loan confirmed successfully' });
  } catch (error) {
    console.error('[loan-flow] EXCEPTION in confirmLoan controller:', error);
    console.error('[loan-flow] Stack:', error.stack);
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

const cancelLoan = async (req, res) => {
  console.log('[loan-flow] === cancel-loan controller ===');
  try {
    const { borrow_id } = req.body;
    console.log('[loan-flow] borrow_id:', borrow_id);

    if (!borrow_id) {
      console.log('[loan-flow] borrow_id missing');
      return res.status(400).json({ success: false, data: null, message: 'borrow_id is required.' });
    }

    console.log('[loan-flow] Calling cancelLoanService...');
    const result = await cancelLoanService(borrow_id);
    console.log('[loan-flow] cancelLoanService result:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.log('[loan-flow] Service returned error:', result.error.code, result.error.message);
      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }

    console.log('[loan-flow] Loan cancelled, borrowId:', result.borrowId);
    res.json({ success: true, data: { borrowId: result.borrowId, status: result.status }, message: 'Loan cancelled successfully. Book quantity updated.' });
  } catch (error) {
    console.error('[loan-flow] EXCEPTION in cancelLoan controller:', error);
    console.error('[loan-flow] Stack:', error.stack);
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

export { getAllBooks, getBookDetails, getBookRecommendations, getRelatedBooks, reserveBook, cancelReservation, getMyBorrowRecords, generatePin, cleanupPin, verifyPin, confirmLoan, cancelLoan };