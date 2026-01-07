import { Request, Response, NextFunction } from 'express';
import settingsService from '../services/settingsService';
import { updateSettingsRequestSchema } from '../types/validators';
import { logError } from '../utils/logger';

const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const settings = await settingsService.getUserSettings(userId);
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings);
  } catch (err) {
    logError('GetSettings error:', err);
    next(err);
  }
};

const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const parsed = updateSettingsRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid settings payload' });
    }
    const updated = await settingsService.updateUserSettings(userId, parsed.data.preferences);
    res.json(updated);
  } catch (err) {
    logError('UpdateSettings error:', err);
    next(err);
  }
};

export default { getSettings, updateSettings };
