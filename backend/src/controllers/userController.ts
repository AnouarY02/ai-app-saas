import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { UpdateProfileRequest } from '../types';
import { logger } from '../shared/logger';

export const userController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const user = await userService.getProfile(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const update: UpdateProfileRequest = req.body;
      const user = await userService.updateProfile(userId, update);
      logger.info(`User updated profile: ${userId}`);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
};
