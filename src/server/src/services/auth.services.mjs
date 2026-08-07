import bcrypt from 'bcryptjs';
import {
  findUserByEmail,
  getPendingByToken,
  getPendingByEmail,
  deletePendingByToken,
  deletePendingByEmail,
  insertUserFromPending,
} from '../models/auth.models.mjs';
import { sendVerificationEmail } from '../utils/mailer.mjs';
import {
  signToken,
  buildUserPayload,
  withTransaction,
  replacePendingUser,
  SALT_ROUNDS,
} from '../utils/authHelpers.mjs';


// ─── Register ─────────────────────────────────────────────────────────────────

export const registerUser = async ({ email, password, username }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error('Email already exists');

  const pendingRow = await getPendingByEmail(email);
  if (pendingRow) {
    if (new Date() > new Date(pendingRow.expired_at)) {
      await deletePendingByEmail(email);
    } else {
      throw new Error('A verification email has already been sent. Please check your inbox.');
    }
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const token = await withTransaction((client) =>
    replacePendingUser(client, { email, passwordHash, username })
  );

  await sendVerificationEmail(email, token);
  return { message: 'Verification email sent. Please check your inbox.' };
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

  return {
    token: signToken(user.user_id, user.email, user.role, user.branch_id, user.token_version ?? 0),
    user: buildUserPayload(user),
  };
};

// ─── Resend Verification ──────────────────────────────────────────────────────

export const resendVerificationEmailService = async ({ email }) => {
  const pendingRow = await getPendingByEmail(email);
  if (!pendingRow) {
    throw new Error('No pending registration found for this email. Please register again.');
  }

  const newToken = await withTransaction((client) =>
    replacePendingUser(client, {
      email,
      passwordHash: pendingRow.password_hash,
      username: pendingRow.username,
    })
  );

  await sendVerificationEmail(email, newToken);
  return { message: 'Verification email resent successfully.' };
};

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user || !user.password_hash) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error('Invalid email or password');

  return {
    token: signToken(user.user_id, user.email, user.role, user.branch_id),
    user: buildUserPayload(user),
  };
};
