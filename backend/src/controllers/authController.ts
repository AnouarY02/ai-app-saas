import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';
import { logger } from '../utils/logger';
import { ApiError } from '../utils/errors';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;
    const { user, token } = await userService.register(email, password, name);
    res.status(201).json({ token, user });
  } catch (err) {
    logger.error('Register error', err);
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({ token, user });
  } catch (err) {
    logger.error('Login error', err);
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const token = req.token;
    await sessionService.logout(userId, token);
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error('Logout error', err);
    next(err);
  }
}
