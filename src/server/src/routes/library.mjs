import {Router} from 'express';
import { getAllBooks, getBookDetails, getBookRecommendations, reserveBook } from '../controllers/library.controller.mjs';
const router = Router();

router.get('/api/library/books', getAllBooks);
router.get('/api/library/books/:id', getBookDetails);
router.get('/api/library/books/:id/recommendations', getBookRecommendations);
router.post('/api/library/reserve', reserveBook);

export default router;