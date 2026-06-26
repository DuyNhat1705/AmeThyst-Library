import { saveOtp, getOtp, markVerified, deleteOtp } from '../utils/otpStore.mjs';
import { sendOTPEmail } from '../utils/mailer.mjs';

export const sendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOtp(email, otp);
  await sendOTPEmail(email, otp);
  return { message: 'OTP sent to your email' };
};

export const verifyOtp = async ({ email, otp }) => {
  const record = getOtp(email);
  if (!record) throw new Error('Invalid OTP');
  if (Date.now() > record.expiresAt) throw new Error('OTP has expired');
  if (record.otp !== otp) throw new Error('Incorrect OTP');

  markVerified(email);
  return { message: 'OTP verified successfully' };
};

export const checkVerified = (email) => {
  const record = getOtp(email);
  if (!record?.verified) throw new Error('OTP not verified');
};

export const clearOtp = (email) => deleteOtp(email);
