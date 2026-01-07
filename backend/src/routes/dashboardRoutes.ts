import { Router } from 'express';
import { metrics } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/metrics', metrics);

export default router;
