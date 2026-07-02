import { verifyPin as verifyPinService, confirmLoan as confirmLoanService, cancelLoan as cancelLoanService } from '../services/dashboard.librarian.services.mjs';


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


const confirmLoan = async (req, res) => {


  try {
    const { borrow_id } = req.body;



    if (!borrow_id) {


      return res.status(400).json({ success: false, data: null, message: 'borrow_id is required.' });
    }


    const result = await confirmLoanService(borrow_id);



    if (result.error) {


      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }


    res.json({ success: true, data: { borrowId: result.borrowId, status: result.status, due_date: result.due_date }, message: 'Loan confirmed successfully' });
  } catch (error) {



    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};


const cancelLoan = async (req, res) => {


  try {
    const { borrow_id } = req.body;



    if (!borrow_id) {


      return res.status(400).json({ success: false, data: null, message: 'borrow_id is required.' });
    }


    const result = await cancelLoanService(borrow_id);



    if (result.error) {


      return res.status(result.statusCode).json({ success: false, data: null, message: result.error.message });
    }


    res.json({ success: true, data: { borrowId: result.borrowId, status: result.status }, message: 'Loan cancelled successfully. Book quantity updated.' });
  } catch (error) {



    res.status(500).json({ success: false, data: null, message: error.message || 'An unexpected error occurred.' });
  }
};


export { verifyPin, confirmLoan, cancelLoan };

