import { Router } from 'express';
import { login, logout, getSession } from '../controllers/authController';
import { getDashboardData } from '../controllers/dashboardController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Auth
router.post('/auth/login', login);
router.post('/auth/logout', requireAuth, logout);
router.get('/auth/session', requireAuth, getSession);

// Dashboard
router.get('/dashboard', requireAuth, getDashboardData);

export default router;
