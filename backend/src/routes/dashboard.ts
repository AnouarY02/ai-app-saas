import express from 'express';
import { requireAuth } from '../middleware/auth';
import { getSummary } from '../controllers/dashboardController';

const router = express.Router();

router.use(requireAuth);

router.get('/summary', getSummary);

export default router;
