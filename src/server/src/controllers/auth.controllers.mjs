import {
  registerUser, loginUser,
  verifyEmail, resendVerificationEmailService,
} from '../services/auth.services.mjs';
import { verifyOtp, forgotPassword, resetPassword } from '../services/otp.service.mjs';
import passport from '../config/passport.mjs';
import { signToken, buildUserPayload } from '../utils/authHelpers.mjs';

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const result = await registerUser({ email, password, username });
    res.status(201).json(result);
  } catch (err) {
    const status = err.message.includes('already exists') || err.message.includes('already been sent') ? 409 : 500;
    res.status(status).json({ error: err.message });
  }
};

export const verifyEmailHandler = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Verification token is required' });
    const result = await verifyEmail({ token });
    res.status(200).json(result);
  } catch (err) {
    let status = 500;
    if (err.message === 'Verification link has expired. Please register again.') {
      status = 410;
    } else if (
      err.message === 'Invalid or expired verification link.' ||
      err.message === 'Email already exists.'
    ) {
      status = 400;
    }
    res.status(status).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser({ email, password });
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const forgot = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword({ email });
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOtp({ email, otp });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const reset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await resetPassword({ email, newPassword });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const result = await resendVerificationEmailService({ email });
    res.status(200).json(result);
  } catch (err) {
    const status = err.message.includes('No pending') ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
};


export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});

export const googleCallback = [
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user.user_id, req.user.email);
    const user = buildUserPayload(req.user);
    res.redirect(
      `${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  },
];