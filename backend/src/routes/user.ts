import { Router } from 'express';
import { userController } from '../controllers/userController';
import { validateBody } from '../core/validate';
import { updateProfileRequestSchema } from '../validators/userValidators';
import { authMiddleware } from '../core/authMiddleware';

export const userRouter = Router();

userRouter.get('/me', authMiddleware, userController.getProfile);
userRouter.put('/me', authMiddleware, validateBody(updateProfileRequestSchema), userController.updateProfile);
