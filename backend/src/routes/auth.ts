import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateBody } from '../core/validate';
import { registerRequestSchema, loginRequestSchema, logoutRequestSchema } from '../validators/authValidators';
import { authMiddleware } from '../core/authMiddleware';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerRequestSchema), authController.register);
authRouter.post('/login', validateBody(loginRequestSchema), authController.login);
authRouter.post('/logout', authMiddleware, validateBody(logoutRequestSchema), authController.logout);
