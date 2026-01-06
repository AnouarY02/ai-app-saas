import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { logger } from '../utils/logger';

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const { name, email, password } = req.body;
    const updated = await userService.updateProfile(userId, { name, email, password });
    logger.info(`User ${userId} updated profile`);
    res.status(200).json({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      createdAt: updated.createdAt
    });
  } catch (err) {
    next(err);
  }
}
