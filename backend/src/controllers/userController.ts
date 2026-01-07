import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { logger } from '../utils/logger';

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const user = await userService.getProfile(userId);
    res.status(200).json(user);
  } catch (err) {
    logger.error('Get profile error', err);
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const update = req.body;
    const user = await userService.updateProfile(userId, update);
    res.status(200).json(user);
  } catch (err) {
    logger.error('Update profile error', err);
    next(err);
  }
}
