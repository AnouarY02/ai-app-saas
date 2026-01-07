import { Router } from 'express';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import * as settingsController from '../controllers/settingsController';
import {
  registerRequestSchema,
  loginRequestSchema,
  updateProfileRequestSchema,
  updateUserSettingsRequestSchema
} from '../validators/schemas';

const router = Router();

// Auth
router.post('/auth/register', validate(registerRequestSchema), authController.register);
router.post('/auth/login', validate(loginRequestSchema), authController.login);
router.post('/auth/logout', requireAuth, authController.logout);

// User profile
router.get('/users/me', requireAuth, userController.getProfile);
router.put('/users/me', requireAuth, validate(updateProfileRequestSchema), userController.updateProfile);

// User settings
router.get('/users/me/settings', requireAuth, settingsController.getUserSettings);
router.put('/users/me/settings', requireAuth, validate(updateUserSettingsRequestSchema), settingsController.updateUserSettings);

export default router;
