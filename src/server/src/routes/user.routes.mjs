import express from 'express';
import { getProfile, updateProfile, changePassword, uploadAvatar } from '../controllers/user.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import upload from '../middlewares/multer.middlewares.mjs';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/profile/password', verifyToken, changePassword);
router.post('/avatar', verifyToken, upload.single('avatar'), uploadAvatar);

export default router;
