import jwt from 'jsonwebtoken';
import pool from '../config/postgres.mjs';

const authError = (res, status, code, message) => res.status(status).json({
  success: false,
  error: { code, message },
});

const authenticate = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded?.userId;
  if (!userId) {
    const error = new Error('Token does not contain a valid user identifier.');
    error.code = 'INVALID_TOKEN_USER';
    throw error;
  }
  const result = await pool.query(
    'SELECT user_id, email, role, branch_id FROM public.users WHERE user_id = $1',
    [userId],
  );
  if (!result.rows[0]) {
    const error = new Error('Your account is no longer available. Please sign in again.');
    error.code = 'AUTH_USER_NOT_FOUND';
    throw error;
  }
  const user = result.rows[0];
  return { ...decoded, userId: user.user_id, email: user.email, role: user.role, branch_id: user.branch_id ?? null };
};

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return authError(res, 401, 'AUTH_REQUIRED', 'No token provided.');

  try {
    req.user = await authenticate(token);
    next();
  } catch (err) {
    if (err.code === 'AUTH_USER_NOT_FOUND') return authError(res, 401, err.code, err.message);
    if (['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(err.name) || err.code === 'INVALID_TOKEN_USER') return authError(res, 401, 'INVALID_TOKEN', 'Invalid token.');
    return authError(res, 503, 'AUTH_DATABASE_UNAVAILABLE', 'Authentication service is temporarily unavailable.');
  }
};

/**
 * Middleware that optionally decodes JWT.
 * Does not block guests.
 */
export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = await authenticate(token);
    next();
  } catch (err) {
    if (err.code === 'AUTH_USER_NOT_FOUND') return authError(res, 401, err.code, err.message);
    if (['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(err.name) || err.code === 'INVALID_TOKEN_USER') {
      req.user = null;
      return next();
    }
    return authError(res, 503, 'AUTH_DATABASE_UNAVAILABLE', 'Authentication service is temporarily unavailable.');
  }
};

