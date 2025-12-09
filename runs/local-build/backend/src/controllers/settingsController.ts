import { Request, Response, NextFunction } from 'express';
import { updateSettingsRequestSchema } from '../validators/updateSettingsRequestSchema';
import { settingsService } from '../services/settingsService';
import { logger } from '../utils/logger';

export const settingsController = {
  async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const settings = await settingsService.getUserSettings(userId);
      res.json({ settings });
    } catch (err) {
      logger.error('GetSettings failed', err);
      next(err);
    }
  },

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const parsed = updateSettingsRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid settings update payload.' });
      }
      const updated = await settingsService.updateUserSettings(userId, parsed.data.settings);
      res.json({ settings: updated });
    } catch (err) {
      logger.error('UpdateSettings failed', err);
      next(err);
    }
  }
};

