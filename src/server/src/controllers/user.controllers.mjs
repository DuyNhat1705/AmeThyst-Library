import bcrypt from 'bcryptjs';
import { getUserById, getUserWithPassword, updateUser, updatePassword } from '../models/user.models.mjs';
import { SALT_ROUNDS } from '../utils/authHelpers.mjs';
import { updateAvatarService } from '../services/user.services.mjs';
import { systemConfigurationService } from '../services/system-configuration.services.mjs';
import { MAX_AVATAR_SIZE } from '../middlewares/multer.middlewares.mjs';

const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Expose the maximum borrow limit constant dynamically
    res.status(200).json({
      ...user,
      maxBorrowLimit: systemConfigurationService.getSnapshot().MAX_BORROW_LIMIT
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ALLOWED_PROFILE_FIELDS = [
  'username',
  'phoneNumber',
  'occupation',
  'birthDate',
  'gender',
  'hometown',
  'description',
  'avatar'
];

const updateProfile = async (req, res) => {
  try {
    const updateData = {};
    for (const field of ALLOWED_PROFILE_FIELDS) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field] === '' ? null : req.body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    if (updateData.username !== undefined) {
      if (typeof updateData.username !== 'string' || !updateData.username.trim()) {
        return res.status(400).json({ error: 'Username cannot be empty' });
      }
    }

    if (updateData.phoneNumber !== undefined && updateData.phoneNumber !== null) {
      const phoneRegex = /^\d{9,10}$/;
      if (typeof updateData.phoneNumber !== 'string' || !phoneRegex.test(updateData.phoneNumber)) {
        return res.status(400).json({ error: 'Invalid phone number format. Must be 9-10 digits.' });
      }
    }

    if (updateData.gender !== undefined && updateData.gender !== null) {
      const normalizedGender = updateData.gender.toLowerCase();
      if (normalizedGender !== 'male' && normalizedGender !== 'female' && normalizedGender !== 'other') {
        return res.status(400).json({ error: 'Invalid gender value. Must be male, female, or other.' });
      }
    }

    const user = await updateUser(req.user.userId, updateData);
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

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;
    const file = req.file;
    const { avatarUrl } = req.body;

    if (file && file.size > MAX_AVATAR_SIZE) {
      return res.status(400).json({ error: 'File size exceeds 2MB limit' });
    }

    const updatedUser = await updateAvatarService(userId, file, avatarUrl);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getProfile, updateProfile, changePassword, uploadAvatar };
