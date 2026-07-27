import express from 'express';
import { getPickups, verifyPin, confirmBorrowing, cancelBorrowing, verifyReturnPin, confirmReturn, getOutstandingDebts, confirmPayment } from '../controllers/dashboard.librarian.controllers.mjs';
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

router.get('/pickups', getPickups);
router.post('/verify-pin', verifyPin);
router.post('/confirm-borrowing', confirmBorrowing);
router.post('/cancel-borrowing', cancelBorrowing);

// Announcement management routes
router.post('/announcements', verifyToken, authorizeRole('librarian', 'admin'), createAnnouncementController);
router.get('/announcements', verifyToken, authorizeRole('librarian', 'admin'), getAnnouncementsForManagementController);
router.get('/announcements/:id', verifyToken, authorizeRole('librarian', 'admin'), getAnnouncementByIdController);
router.patch('/announcements/:id/status', verifyToken, authorizeRole('librarian', 'admin'), updateAnnouncementStatusController);
router.put('/announcements/:id', verifyToken, authorizeRole('librarian', 'admin'), editAnnouncementDetailsController);
router.delete('/announcements/:id', verifyToken, authorizeRole('librarian', 'admin'), deleteAnnouncementController);
router.post('/verify-return-pin', verifyToken, authorizeRole('librarian'), verifyReturnPin);
router.post('/confirm-return', verifyToken, authorizeRole('librarian'), confirmReturn);
router.get('/loan-fees/outstanding', verifyToken, authorizeRole('librarian'), getOutstandingDebts);
router.post('/loan-fees/confirm-payment', verifyToken, authorizeRole('librarian'), confirmPayment);

export default router;
