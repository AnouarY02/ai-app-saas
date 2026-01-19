import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { signJwt, verifyJwt } from '../services/authService';
import { logger } from '../utils/logger';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;
    const { user, token } = await userService.signup(email, password, name);
    res.status(201).json({ user, token });
  } catch (err) {
    logger.error('Signup error', err);
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    logger.error('Login error', err);
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.body.token || req.headers.authorization?.replace('Bearer ', '');
    await userService.logout(token);
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error('Logout error', err);
    next(err);
  }
}
