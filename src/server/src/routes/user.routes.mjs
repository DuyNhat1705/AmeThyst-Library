import express from 'express';
import { getProfile, updateProfile, changePassword } from '../controllers/user.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/profile/password', verifyToken, changePassword);

export default router;
