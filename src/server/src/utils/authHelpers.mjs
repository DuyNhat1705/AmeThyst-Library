import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from '../config/postgres.mjs';

export const SALT_ROUNDS = 10;

export const signToken = (userId, email, role, branchId, tokenVersion = 0) =>
  jwt.sign(
    { userId, email, role, branch_id: branchId || null, token_version: tokenVersion || 0 },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export const buildUserPayload = (user) => ({
  userId: user.user_id,
  email: user.email,
  username: user.username,
  avatar: user.avatar,
  role: user.role,
  branch_id: user.branch_id || null,
  must_change_password: user.must_change_password ?? false,
});

export const withTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const PENDING_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Dùng chung cho register, verifyEmail, resendVerification
// Xóa pending row cũ rồi insert row mới trong cùng transaction
// Trả về token mới để gửi email
export const replacePendingUser = async (client, { email, passwordHash, username }) => {
  const token = crypto.randomUUID();
  const expiredAt = new Date(Date.now() + PENDING_TTL_MS);

  await client.query('DELETE FROM pending_users WHERE email = $1', [email]);
  await client.query(
    `INSERT INTO pending_users (token, email, password_hash, username, role, expired_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [token, email, passwordHash, username, 'user', expiredAt]
  );

  return token;
};