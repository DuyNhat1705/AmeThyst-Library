import express from 'express';
import { getRoomDetailsController, getRoomAvailabilityController, getStudyGroupFilterOptionsController, createReservationController, getUserReservationsController, cancelReservationController } from '../controllers/room.controllers.mjs';
import { verifyToken } from '../middlewares/auth.middleware.mjs';

const router = express.Router();

router.get('/study-group-filter-options', getStudyGroupFilterOptionsController);
router.get('/details', getRoomDetailsController);
router.get('/availability', getRoomAvailabilityController);
router.post('/reserve', verifyToken, createReservationController);
router.get('/user-reservations', verifyToken, getUserReservationsController);
router.delete('/reserve/:reserveId', verifyToken, cancelReservationController);

export default router;
