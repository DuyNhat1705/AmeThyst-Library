import express from 'express';
import { getPickups, verifyPin, confirmBorrowing, cancelBorrowing } from '../controllers/dashboard.librarian.controllers.mjs';

const router = express.Router();

router.get('/pickups', getPickups);
router.post('/verify-pin', verifyPin);
router.post('/confirm-borrowing', confirmBorrowing);
router.post('/cancel-borrowing', cancelBorrowing);

export default router;
