import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getMetrics } from '../controllers/dashboardController';

const router = express.Router();

router.use(requireAuth);

router.get('/metrics', getMetrics);

export default router;
