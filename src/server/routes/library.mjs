import { Router } from 'express';
import { calculateSum, getSurfingPage, getBookDeepDive, searchBooks } from '../controllers/library.controller.mjs';

const router = Router();

router.post('/library/calculate', calculateSum);
router.get('/api/books/surfing', getSurfingPage);
router.get('/api/books/search', searchBooks);
router.get('/api/books/:id/details', getBookDeepDive);

export default router;
