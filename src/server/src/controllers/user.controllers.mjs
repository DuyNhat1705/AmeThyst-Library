import bcrypt from 'bcrypt';
import { getUserById, getUserWithPassword, updateUser, updatePassword } from '../models/user.models.mjs';
import { SALT_ROUNDS } from '../utils/authHelpers.mjs';

const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, phoneNumber, avatar } = req.body;
    const user = await updateUser(req.user.userId, { username, phoneNumber, avatar });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await getUserWithPassword(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.password_hash === 'GOOGLE_AUTH') {
      return res.status(400).json({ error: 'Google accounts cannot change password here' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' });

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await updatePassword(req.user.userId, passwordHash);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getProfile, updateProfile, changePassword };
