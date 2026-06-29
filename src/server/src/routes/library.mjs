import {Router} from 'express';
import { getAllBooks, getBookDetails, getBookRecommendations, getRelatedBooks, reserveBook, cancelReservation, getMyBorrowRecords, generatePin, cleanupPin } from '../controllers/library.controller.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { authorizeRole } from '../middlewares/role.middleware.mjs';
import { validateBookFilters } from '../middlewares/validation.middleware.mjs';
const router = Router();

router.get('/api/library/books', validateBookFilters, getAllBooks);
router.get('/api/library/books/:id', getBookDetails);
router.get('/api/library/books/:id/recommendations', getBookRecommendations);
router.get('/api/library/my-borrowed', verifyToken, getMyBorrowRecords);
router.get('/api/library/books/:id/related', getRelatedBooks);
router.post('/api/library/reserve', verifyToken, authorizeRole('user'), reserveBook);
router.post('/api/library/reserve/:reservationId/pin', verifyToken, generatePin);
router.post('/api/library/reserve/:reservationId/pin/cleanup', verifyToken, cleanupPin);
router.delete('/api/library/reserve/:reservationId', verifyToken, cancelReservation);

export default router;