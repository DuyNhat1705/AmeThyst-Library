import { Router } from 'express';
import { calculateSum, getSurfingPage, getBookDeepDive, searchBooks, getGenres } from '../controllers/library.controller.mjs';

const router = Router();

router.post('/library/calculate', calculateSum);
router.get('/api/books/surfing', getSurfingPage);
router.get('/api/books/search', searchBooks);
router.get('/api/books/:id/details', getBookDeepDive);
router.get('/api/genres', getGenres);

export default router;
