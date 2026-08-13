import bcrypt from 'bcryptjs';
import {
  findUserByEmail,
  getPendingByToken,
  getPendingByEmail,
  deletePendingByToken,
  deletePendingByEmail,
  insertUserFromPending,
  recordLoginFailure,
  recordLoginSuccess,
} from '../models/auth.models.mjs';
import pool from '../config/postgres.mjs';
import { sendVerificationEmail } from '../utils/mailer.mjs';
import {
  buildUserPayload,
  withTransaction,
  replacePendingUser,
  SALT_ROUNDS,
} from '../utils/authHelpers.mjs';


// ─── Register ─────────────────────────────────────────────────────────────────

export const registerUser = async ({ email, password, username }) => {
  const existing = await findUserByEmail(email);
  if (existing) return { message: 'If this email can be registered, a verification message will be sent.' };

  const pendingRow = await getPendingByEmail(email);
  if (pendingRow) {
    if (new Date() > new Date(pendingRow.expired_at)) {
      await deletePendingByEmail(email);
    } else {
      return { message: 'If this email can be registered, a verification message will be sent.' };
    }
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const token = await withTransaction((client) =>
    replacePendingUser(client, { email, passwordHash, username })
  );

  await sendVerificationEmail(email, token);
  return { message: 'If this email can be registered, a verification message will be sent.' };
};

// ─── Verify Email ─────────────────────────────────────────────────────────────

export const verifyEmail = async ({ token }) => {
  const row = await getPendingByToken(token);
  if (!row) throw new Error('Invalid or expired verification link.');

  if (new Date() > new Date(row.expired_at)) {
    await deletePendingByToken(token);
    throw new Error('Verification link has expired. Please register again.');
  }

  const existing = await findUserByEmail(row.email);
  if (existing) {
    await deletePendingByToken(token);
    throw new Error('Email already exists.');
  }

  const user = await withTransaction(async (client) => {
    const userRow = await insertUserFromPending({
      email: row.email,
      passwordHash: row.password_hash,
      username: row.username,
    }, client);
    await deletePendingByToken(token, client);
    return userRow;
  });

  return { user: buildUserPayload(user), userRow: user };
};

// ─── Resend Verification ──────────────────────────────────────────────────────

export const resendVerificationEmailService = async ({ email }) => {
  const pendingRow = await getPendingByEmail(email);
  if (!pendingRow) {
    return { message: 'If a pending registration exists, a verification message will be sent.' };
  }

  const newToken = await withTransaction((client) =>
    replacePendingUser(client, {
      email,
      passwordHash: pendingRow.password_hash,
      username: pendingRow.username,
    })
  );

  await sendVerificationEmail(email, newToken);
  return { message: 'If a pending registration exists, a verification message will be sent.' };
};

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  const fallbackHash = '$2b$10$7EqJtq98hPqEX7fNZaFWoO.HkLXrKYuRpfM8caUVbVQyTgT1nYq2K';
  const isMatch = await bcrypt.compare(password, user?.password_hash || fallbackHash);
  const locked = user?.locked_until && new Date(user.locked_until) > new Date();
  if (!user || !isMatch || user.status !== 'active' || locked) {
    if (user && !locked) await recordLoginFailure(user.user_id);
    throw new Error('Invalid email or password');
  }

  await recordLoginSuccess(user.user_id);
  const refreshed = await pool.query('SELECT * FROM public.users WHERE user_id = $1', [user.user_id]);
  return refreshed.rows[0] || user;
};
