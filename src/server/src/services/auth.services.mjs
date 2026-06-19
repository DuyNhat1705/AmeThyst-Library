import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/postgres.mjs';
import { findUserByEmail, createUser } from '../models/auth.models.mjs';
import { sendOtp, checkVerified, clearOtp } from './otp.service.mjs';

const SALT_ROUNDS = 10;

const registerUser = async ({ email, password, username, phoneNumber, avatar }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error('Email already exists');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return await createUser({ email, passwordHash, username, phoneNumber, avatar });
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user.user_id, email: user.email },
    process.env.JWT_SECRET || 'your_super_secret_key_here',
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      userId: user.user_id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    },
  };
};

const forgotPassword = async ({ email }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Email does not exist');
  return await sendOtp(email);
};

const resetPassword = async ({ email, newPassword }) => {
  checkVerified(email);

  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await pool.query(
    'UPDATE users SET password_hash = $1 WHERE email = $2',
    [passwordHash, email]
  );

  clearOtp(email);
  return { message: 'Password reset successfully' };
};

export { registerUser, loginUser, forgotPassword, resetPassword };
