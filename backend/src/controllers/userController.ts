import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { logger } from '../utils/logger';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await userService.getById(userId);
    res.json(user);
  } catch (err) {
    logger.error('getMe error', err);
    next(err);
  }
}

export async function updateMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updated = await userService.update(userId, req.body);
    res.json(updated);
  } catch (err) {
    logger.error('updateMe error', err);
    next(err);
  }
}
