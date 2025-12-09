import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { loginRequestSchema } from '../validators/loginRequestSchema';
import { logger } from '../utils/logger';

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = loginRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid login payload.' });
      }
      const { email, password } = parsed.data;
      const { token, user } = await authService.login(email, password);
      // Send token as HTTP-only cookie and in response body
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      res.json({ token, user });
    } catch (err) {
      logger.error('Login failed', err);
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No session token found.' });
      }
      await authService.logout(token);
      res.clearCookie('token');
      res.json({ success: true });
    } catch (err) {
      logger.error('Logout failed', err);
      next(err);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const user = await userService.getUserProfile(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      logger.error('GetMe failed', err);
      next(err);
    }
  }
};

