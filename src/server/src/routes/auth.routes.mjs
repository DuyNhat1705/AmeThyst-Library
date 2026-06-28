import express from 'express';
import { register, login, forgot, verify, reset, verifyEmailHandler, resendVerification, googleAuth, googleCallback } from '../controllers/auth.controllers.mjs';

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgot);
router.post('/verify-otp', verify);
router.post('/reset-password', reset);

router.get('/google', googleAuth);
router.get('/google/callback', ...googleCallback);

export default router;
