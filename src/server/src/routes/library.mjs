import {Router} from 'express';
import { calculateSum, getBookDetails, getBookRecommendations, reserveBook } from '../controllers/library.controller.mjs';
const router = Router();

router.post('/library/calculate', calculateSum);
router.get('/api/library/books/:id', getBookDetails);
router.get('/api/library/books/:id/recommendations', getBookRecommendations);
router.post('/api/library/reserve', reserveBook);

export default router;