import express from 'express';
import { verifyPin, confirmBorrowing, cancelBorrowing, verifyReturnPin, confirmReturn, getOutstandingDebts, confirmPayment } from '../controllers/dashboard.librarian.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { authorizeRole } from '../middlewares/role.middleware.mjs';

const router = express.Router();

router.post('/verify-pin', verifyToken, authorizeRole('librarian'), verifyPin);
router.post('/confirm-borrowing', verifyToken, authorizeRole('librarian'), confirmBorrowing);
router.post('/cancel-borrowing', verifyToken, authorizeRole('librarian'), cancelBorrowing);
router.post('/verify-return-pin', verifyToken, authorizeRole('librarian'), verifyReturnPin);
router.post('/confirm-return', verifyToken, authorizeRole('librarian'), confirmReturn);
router.get('/loan-fees/outstanding', verifyToken, authorizeRole('librarian'), getOutstandingDebts);
router.post('/loan-fees/confirm-payment', verifyToken, authorizeRole('librarian'), confirmPayment);

export default router;
