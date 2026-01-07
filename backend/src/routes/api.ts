import { Router } from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';
import dashboardController from '../controllers/dashboardController';
import settingsController from '../controllers/settingsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Auth
router.post('/auth/login', authController.login);
router.post('/auth/logout', requireAuth, authController.logout);

// User
router.get('/users/me', requireAuth, userController.getMe);

// Dashboard
router.get('/dashboard', requireAuth, dashboardController.getDashboardData);

// Settings
router.get('/settings', requireAuth, settingsController.getSettings);
router.put('/settings', requireAuth, settingsController.updateSettings);

export default router;
