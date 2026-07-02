import express from 'express';
import { getRoomDetailsController, getRoomAvailabilityController } from '../controllers/room.controllers.mjs';

const router = express.Router();

router.get('/details', getRoomDetailsController);
router.get('/availability', getRoomAvailabilityController);

export default router;
