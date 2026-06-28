import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { getEvents, getAgenda, createEvent } from '../controllers/dashboard.user.controllers.mjs';

const router = express.Router();

router.get('/events', verifyToken, getEvents);
router.get('/agenda', verifyToken, getAgenda);
router.post('/events', verifyToken, createEvent);

export default router;
