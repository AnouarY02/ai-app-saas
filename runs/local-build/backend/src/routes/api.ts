import { Router } from 'express';
import { authController } from '../controllers/authController';
import { userController } from '../controllers/userController';
import { settingsController } from '../controllers/settingsController';
import { authMiddleware } from '../middleware/authMiddleware';

export const apiRouter = Router();

// Auth
apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/logout', authMiddleware, authController.logout);
apiRouter.get('/auth/me', authMiddleware, authController.getMe);

// User profile
apiRouter.get('/profile', authMiddleware, userController.getProfile);
apiRouter.put('/profile', authMiddleware, userController.updateProfile);

// Settings
apiRouter.get('/settings', authMiddleware, settingsController.getSettings);
apiRouter.put('/settings', authMiddleware, settingsController.updateSettings);

