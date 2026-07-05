import express from 'express';
import { generatePin, cleanupPin, cancelReservation, getMyBorrowRecords } from '../controllers/dashboard.user.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';

const router = express.Router();

router.post('/reserve/:reservationId/pin', verifyToken, generatePin);
router.post('/reserve/:reservationId/pin/cleanup', verifyToken, cleanupPin);
router.delete('/reserve/:reservationId', verifyToken, cancelReservation);
router.get('/my-borrowed', verifyToken, getMyBorrowRecords);

export default router;
