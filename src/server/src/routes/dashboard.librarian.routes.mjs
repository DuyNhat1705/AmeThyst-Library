import express from 'express';
import { verifyPin, confirmLoan, cancelLoan } from '../controllers/dashboard.librarian.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { authorizeRole } from '../middlewares/role.middleware.mjs';

const router = express.Router();

router.post('/verify-pin', verifyToken, authorizeRole('librarian'), verifyPin);
router.post('/confirm-loan', verifyToken, authorizeRole('librarian'), confirmLoan);
router.post('/cancel-loan', verifyToken, authorizeRole('librarian'), cancelLoan);

export default router;
