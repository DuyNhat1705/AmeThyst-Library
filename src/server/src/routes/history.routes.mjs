import express from 'express';
import { getHistory, logClick } from '../controllers/history.controllers.mjs';
import { requireAuth } from '../middlewares/auth.middlewares.mjs';

const router = express.Router();

// GET /api/search/history
router.get('/api/search/history', requireAuth, getHistory);

// POST /api/search/history/click
router.post('/api/search/history/click', requireAuth, logClick);

export default router;
