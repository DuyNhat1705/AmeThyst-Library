import {Router} from 'express';
import {calculateSum} from '../controllers/library.controller.mjs';
const router = Router();

router.post('/library/calculate', calculateSum);

export default router;