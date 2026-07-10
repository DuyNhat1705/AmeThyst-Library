import express from 'express';
import { verifyPin, confirmBorrowing, cancelBorrowing } from '../controllers/dashboard.librarian.controllers.mjs';
import {
  createAnnouncementController,
  getAnnouncementsForManagementController,
  getAnnouncementByIdController,
  updateAnnouncementStatusController,
  editAnnouncementDetailsController,
  deleteAnnouncementController
} from '../controllers/announcement.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';
import { authorizeRole } from '../middlewares/role.middleware.mjs';

const router = express.Router();

router.post('/verify-pin', verifyToken, authorizeRole('librarian'), verifyPin);
router.post('/confirm-borrowing', verifyToken, authorizeRole('librarian'), confirmBorrowing);
router.post('/cancel-borrowing', verifyToken, authorizeRole('librarian'), cancelBorrowing);

// Announcement management routes
router.post('/announcements', verifyToken, authorizeRole('librarian', 'admin'), createAnnouncementController);
router.get('/announcements', verifyToken, authorizeRole('librarian', 'admin'), getAnnouncementsForManagementController);
router.get('/announcements/:id', verifyToken, authorizeRole('librarian', 'admin'), getAnnouncementByIdController);
router.patch('/announcements/:id/status', verifyToken, authorizeRole('librarian', 'admin'), updateAnnouncementStatusController);
router.put('/announcements/:id', verifyToken, authorizeRole('librarian', 'admin'), editAnnouncementDetailsController);
router.delete('/announcements/:id', verifyToken, authorizeRole('librarian', 'admin'), deleteAnnouncementController);

export default router;
