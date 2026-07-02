import {Router} from 'express';
import { getAllBooks, getBookDetails, getBookRecommendations, getRelatedBooks, reserveBook } from '../controllers/library.controller.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { authorizeRole } from '../middlewares/role.middleware.mjs';
import { validateBookFilters } from '../middlewares/validation.middleware.mjs';
const router = Router();

router.get('/api/library/books', validateBookFilters, getAllBooks);
router.get('/api/library/books/:id', getBookDetails);
router.get('/api/library/books/:id/recommendations', getBookRecommendations);
router.get('/api/library/books/:id/related', getRelatedBooks);
router.post('/api/library/reserve', verifyToken, authorizeRole('user'), reserveBook);

export default router;