import {Router} from 'express';
import { getAllBooks, getBookDetails, getBookRecommendations, reserveBook, cancelReservation, getMyBorrowRecords, generatePin, cleanupPin } from '../controllers/library.controller.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
const router = Router();

router.get('/api/library/books', getAllBooks);
router.get('/api/library/books/:id', getBookDetails);
router.get('/api/library/books/:id/recommendations', getBookRecommendations);
router.get('/api/library/my-borrowed', verifyToken, getMyBorrowRecords);
router.post('/api/library/reserve', verifyToken, reserveBook);
router.post('/api/library/reserve/:reservationId/pin', verifyToken, generatePin);
router.post('/api/library/reserve/:reservationId/pin/cleanup', verifyToken, cleanupPin);
router.delete('/api/library/reserve/:reservationId', verifyToken, cancelReservation);

export default router;