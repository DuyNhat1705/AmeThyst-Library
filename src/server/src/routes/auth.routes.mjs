import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.mjs';
import { register, login, forgot, verify, reset } from '../controllers/auth.controllers.mjs';

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgot);
router.post('/verify-otp', verify);
router.post('/reset-password', reset);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login`, session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.user_id, email: req.user.email },
      process.env.JWT_SECRET || 'your_super_secret_key_here',
      { expiresIn: '7d' }
    );

    const user = {
      userId: req.user.user_id,
      email: req.user.email,
      username: req.user.username,
      avatar: req.user.avatar,
    };

    res.redirect(
      `${FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  }
);

export default router;
