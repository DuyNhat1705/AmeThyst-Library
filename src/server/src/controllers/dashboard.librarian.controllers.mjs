import { verifyPin as verifyPinService, confirmBorrowing as confirmBorrowingService, cancelBorrowing as cancelBorrowingService, verifyReturnPin as verifyReturnPinService, confirmReturn as confirmReturnService, getOutstandingDebts as getOutstandingDebtsService, confirmPayment as confirmPaymentService } from '../services/dashboard.librarian.services.mjs';


const verifyPin = async (req, res) => {


  try {
    const { pin } = req.body;
    const branchId = req.user.branch_id;



    if (!pin || pin.length !== 6) {


      return res.status(400).json({ success: false, data: null, message: 'A valid 6-digit PIN is required.' });
    }


    const result = await verifyPinService(pin, branchId);



    if (result.error) {


      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }


    res.json({ success: true, data: { borrowId: result.borrowId, borrower: result.borrower, book: result.book }, message: 'PIN verified successfully' });
  } catch (error) {



    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};


const confirmBorrowing = async (req, res) => {


  try {
    const { borrow_id } = req.body;



    if (!borrow_id) {


      return res.status(400).json({ success: false, data: null, message: 'borrow_id is required.' });
    }


    const result = await confirmBorrowingService(borrow_id);



    if (result.error) {


      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }


    res.json({ success: true, data: { borrowId: result.borrowId, status: result.status, due_date: result.due_date }, message: 'Borrowing confirmed successfully' });
  } catch (error) {



    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};


const cancelBorrowing = async (req, res) => {


  try {
    const { borrow_id } = req.body;



    if (!borrow_id) {


      return res.status(400).json({ success: false, data: null, message: 'borrow_id is required.' });
    }


    const result = await cancelBorrowingService(borrow_id);



    if (result.error) {


      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }


    res.json({ success: true, data: { borrowId: result.borrowId, status: result.status }, message: 'Borrowing cancelled successfully. Book quantity updated.' });
  } catch (error) {



    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};


const verifyReturnPin = async (req, res) => {
  try {
    const { pin } = req.body;

    if (!pin || pin.length !== 6) {
      return res.status(400).json({ success: false, data: null, message: 'A valid 6-digit PIN is required.' });
    }

    const result = await verifyReturnPinService(pin);

    if (result.error) {
      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }

    res.json({ success: true, data: result, message: 'Return PIN verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

const confirmReturn = async (req, res) => {
  try {
    const { borrow_id, branch_id, conditions, description, is_lost } = req.body;

    if (!borrow_id || !branch_id) {
      return res.status(400).json({ success: false, data: null, message: 'borrow_id and branch_id are required' });
    }

    const result = await confirmReturnService(borrow_id, branch_id, conditions || [], description || null, is_lost || false);

    if (result.error) {
      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }

    res.json({ success: true, data: result.data, message: 'Return confirmed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

const getOutstandingDebts = async (req, res) => {
  try {
    const { search } = req.query;
    const result = await getOutstandingDebtsService(search || null);
    res.json({ success: true, data: result, message: 'Outstanding debts retrieved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { penalty_id } = req.body;

    if (!penalty_id) {
      return res.status(400).json({ success: false, data: null, message: 'penalty_id is required' });
    }

    const result = await confirmPaymentService(penalty_id);

    if (result.error) {
      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }

    res.json({ success: true, data: result, message: 'Payment confirmed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};

export { verifyPin, confirmBorrowing, cancelBorrowing, verifyReturnPin, confirmReturn, getOutstandingDebts, confirmPayment };

