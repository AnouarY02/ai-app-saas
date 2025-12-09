import { Request, Response, NextFunction } from 'express';
import { updateProfileRequestSchema } from '../validators/updateProfileRequestSchema';
import { userService } from '../services/userService';
import { logger } from '../utils/logger';

export const userController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
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
      logger.error('GetProfile failed', err);
      next(err);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const parsed = updateProfileRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid profile update payload.' });
      }
      const updated = await userService.updateUserProfile(userId, parsed.data);
      res.json(updated);
    } catch (err) {
      logger.error('UpdateProfile failed', err);
      next(err);
    }
  }
};

