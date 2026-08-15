import {
  registerUser, loginUser,
  verifyEmail, resendVerificationEmailService,
} from '../services/auth.services.mjs';
import { verifyOtp, forgotPassword, resetPassword } from '../services/otp.service.mjs';
import passport from '../config/passport.mjs';
import {
  CSRF_COOKIE,
  REFRESH_COOKIE,
  buildUserPayload,
  clearAuthCookies,
  csrfCookieOptions,
  generateCsrfToken,
  setAuthCookies,
} from '../utils/authHelpers.mjs';
import { getUserRecommendations } from '../services/recommendation.services.mjs';
import {
  createAuthSession,
  revokeRefreshToken,
  rotateAuthSession,
} from '../services/auth-session.services.mjs';

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
    const session = await createAuthSession(result.userRow, req);
    setAuthCookies(res, session);
    res.status(200).json({ user: session.user });

    // Precompute recommendations in the background on successful email verification
    if (result.user && result.user.role === 'user') {
      getUserRecommendations(result.user.userId).catch(err =>
        console.error(`[Precompute] Failed to precompute recommendations on verification for user ${result.user.userId}:`, err)
      );
    }
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
    const userRow = await loginUser({ email, password });
    const session = await createAuthSession(userRow, req);
    res.status(200);
    setAuthCookies(res, session);
    res.json({ user: session.user });

    // Precompute recommendations in the background on login
    if (session.user.role === 'user') {
      getUserRecommendations(session.user.userId).catch(err =>
        console.error(`[Precompute] Failed to precompute recommendations on login for user ${session.user.userId}:`, err)
      );
    }
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
    res.status(200).json({ message: 'If an account exists for this email, a reset code has been sent.' });
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
    res.status(200).json({ message: 'If a pending registration exists, a verification message will be sent.' });
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
  async (req, res, next) => {
    try {
      const session = await createAuthSession(req.user, req);
      setAuthCookies(res, session);
      res.redirect(`${process.env.CLIENT_URL}/auth/callback`);
    } catch (error) {
      next(error);
    }
  },
];

export const refresh = async (req, res) => {
  const session = await rotateAuthSession(req.cookies?.[REFRESH_COOKIE], req);
  if (!session) {
    clearAuthCookies(res);
    return res.status(401).json({ success: false, error: { code: 'REFRESH_INVALID', message: 'Session expired.' } });
  }
  setAuthCookies(res, session);
  return res.json({ success: true, data: { user: session.user } });
};

export const logout = async (req, res) => {
  await revokeRefreshToken(req.cookies?.[REFRESH_COOKIE], 'logout');
  clearAuthCookies(res);
  return res.status(204).end();
};

export const me = async (req, res) => res.json({ success: true, data: buildUserPayload({
  user_id: req.user.userId,
  email: req.user.email,
  username: req.user.username,
  avatar: req.user.avatar,
  role: req.user.role,
  branch_id: req.user.branch_id,
  must_change_password: req.user.must_change_password,
}) });

export const csrf = async (req, res) => {
  const token = req.cookies?.[CSRF_COOKIE] || generateCsrfToken();
  res.cookie(CSRF_COOKIE, token, csrfCookieOptions());
  return res.json({ success: true, data: { csrfToken: token } });
};
