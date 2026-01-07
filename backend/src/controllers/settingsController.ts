import { Request, Response, NextFunction } from 'express';
import { settingsService } from '../services/settingsService';
import { logger } from '../utils/logger';

export async function getUserSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const settings = await settingsService.getUserSettings(userId);
    res.status(200).json(settings);
  } catch (err) {
    logger.error('Get user settings error', err);
    next(err);
  }
}

export async function updateUserSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { settings } = req.body;
    const updated = await settingsService.updateUserSettings(userId, settings);
    res.status(200).json(updated);
  } catch (err) {
    logger.error('Update user settings error', err);
    next(err);
  }
}
