import express from 'express';
import { getPickups, verifyPin, confirmBorrowing, cancelBorrowing, verifyReturnPin, confirmReturn, getOutstandingDebts, getPaidFees, getActiveBorrowings, confirmPayment, verifyRoomPin, confirmRoomCheckin, getRoomsOverview, getActiveReservations, getRoomSchedule, getReservationDetail } from '../controllers/dashboard.librarian.controllers.mjs';
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

router.get('/pickups', verifyToken, authorizeRole('librarian'), getPickups);
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
router.post('/verify-return-pin', verifyToken, authorizeRole('librarian'), verifyReturnPin);
router.post('/confirm-return', verifyToken, authorizeRole('librarian'), confirmReturn);
router.get('/active-borrowings', verifyToken, authorizeRole('librarian'), getActiveBorrowings);
router.get('/loan-fees/outstanding', verifyToken, authorizeRole('librarian'), getOutstandingDebts);
router.get('/loan-fees/history', verifyToken, authorizeRole('librarian'), getPaidFees);
router.post('/loan-fees/confirm-payment', verifyToken, authorizeRole('librarian'), confirmPayment);
router.post('/verify-room-pin', verifyToken, authorizeRole('librarian'), verifyRoomPin);
router.post('/confirm-room-checkin', verifyToken, authorizeRole('librarian'), confirmRoomCheckin);
router.get('/rooms/overview', verifyToken, authorizeRole('librarian'), getRoomsOverview);
router.get('/rooms/reservations', verifyToken, authorizeRole('librarian'), getActiveReservations);
router.get('/rooms/schedule', verifyToken, authorizeRole('librarian'), getRoomSchedule);
router.get('/rooms/reservations/:reserveId', verifyToken, authorizeRole('librarian'), getReservationDetail);

export default router;
