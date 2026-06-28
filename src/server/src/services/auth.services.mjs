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

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return await createUser({ email, passwordHash, username, phoneNumber, avatar, role });
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error('Invalid email or password');

  const safeRole = user.role || 'user';

  const token = jwt.sign(
    { userId: user.user_id, email: user.email, role: safeRole },
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
      role: safeRole,
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
