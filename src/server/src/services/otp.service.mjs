import bcrypt from 'bcryptjs';
import pool from '../config/postgres.mjs';
import {
  findUserByEmail,
  saveOtpDB,
  getOtpDB,
  markVerifiedDB,
  deleteOtpDB,
} from '../models/auth.models.mjs';
import { sendOTPEmail } from '../utils/mailer.mjs';
import {
  generateOtp,
  validateOtpRecord,
  validateVerifiedRecord,
  OTP_VERIFY_TTL,
  OTP_RESET_TTL,
} from '../utils/otpHelpers.mjs';
import { SALT_ROUNDS } from '../utils/authHelpers.mjs';


export const sendOtp = async (email) => {
  const otp = generateOtp();
  const expiredAt = new Date(Date.now() + OTP_VERIFY_TTL);

  await saveOtpDB(email, otp, expiredAt);
  await sendOTPEmail(email, otp);
  return { message: 'OTP sent to your email' };
};

export const verifyOtp = async ({ email, otp }) => {
  const row = await getOtpDB(email);
  validateOtpRecord(row, otp);

  const newExpiredAt = new Date(Date.now() + OTP_RESET_TTL);
  await markVerifiedDB(email, newExpiredAt);
  return { message: 'OTP verified successfully' };
};

export const checkVerified = async (email) => {
  const row = await getOtpDB(email);
  validateVerifiedRecord(row);
};

export const clearOtp = async (email) => {
  await deleteOtpDB(email);
};

export const forgotPassword = async ({ email }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Email does not exist');
  return await sendOtp(email);
};

export const resetPassword = async ({ email, newPassword }) => {
  await checkVerified(email);

  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await pool.query(
    'UPDATE users SET password_hash = $1 WHERE email = $2',
    [passwordHash, email]
  );

  await clearOtp(email);
  return { message: 'Password reset successfully' };
};


