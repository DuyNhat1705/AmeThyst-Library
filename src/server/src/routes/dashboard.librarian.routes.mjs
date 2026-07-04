import express from 'express';
import { verifyPin, confirmBorrowing, cancelBorrowing } from '../controllers/dashboard.librarian.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { authorizeRole } from '../middlewares/role.middleware.mjs';

const router = express.Router();

router.post('/verify-pin', verifyToken, authorizeRole('librarian'), verifyPin);
router.post('/confirm-borrowing', verifyToken, authorizeRole('librarian'), confirmBorrowing);
router.post('/cancel-borrowing', verifyToken, authorizeRole('librarian'), cancelBorrowing);

export default router;
