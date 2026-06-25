import express from 'express';
import passport from '../config/passport.mjs';
import { register, login, forgot, verify, reset, verifyEmailHandler, resendVerification } from '../controllers/auth.controllers.mjs';
import { signToken, buildUserPayload } from '../utils/authHelpers.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgot);
router.post('/verify-otp', verify);
router.post('/reset-password', reset);
router.post('/verify-email', verifyEmailHandler);
router.post('/resend-verification', resendVerification);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }),
  (req, res) => {
    const token = signToken(req.user.user_id, req.user.email);
    const user = buildUserPayload(req.user);

    res.redirect(
      `${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  }
);

export default router;