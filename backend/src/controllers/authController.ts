import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { logger } from '../utils/logger';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);
    res.status(200).json({ token, user });
  } catch (err) {
    logger.warn(`Login failed for email: ${req.body.email}`);
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const token = req.token;
    await AuthService.logout(userId, token);
    res.status(200).json({ success: true });
  } catch (err) {
    logger.warn(`Logout failed for user: ${req.user?.id}`);
    next(err);
  }
};
