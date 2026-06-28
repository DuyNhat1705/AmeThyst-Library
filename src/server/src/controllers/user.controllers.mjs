import bcrypt from 'bcryptjs';
import { getUserById, getUserWithPassword, updateUser, updatePassword } from '../models/user.models.mjs';
import { SALT_ROUNDS } from '../utils/authHelpers.mjs';
import { updateAvatarService } from '../services/user.services.mjs';

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

    if (username !== undefined) {
      if (typeof username !== 'string' || !username.trim()) {
        return res.status(400).json({ error: 'Username cannot be empty' });
      }
    }

    if (phoneNumber !== undefined && phoneNumber !== null) {
      const phoneRegex = /^\d{9,10}$/;
      if (typeof phoneNumber !== 'string' || !phoneRegex.test(phoneNumber)) {
        return res.status(400).json({ error: 'Invalid phone number format. Must be 9-10 digits.' });
      }
    }

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

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await updatePassword(req.user.userId, passwordHash);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;
    const file = req.file;
    const { avatarUrl } = req.body;

    const updatedUser = await updateAvatarService(userId, file, avatarUrl);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getProfile, updateProfile, changePassword, uploadAvatar };
