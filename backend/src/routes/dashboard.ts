import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { jwtAuthMiddleware } from '../middleware/jwtAuth';

const router = Router();

router.get('/', jwtAuthMiddleware, getDashboardData);

export default router;
