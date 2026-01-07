import { Router } from 'express';
import { getMetrics } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/metrics', getMetrics);

export default router;
