import { db } from '../models/db';
import { UserSettings } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../utils/errors';

export const settingsService = {
  async getUserSettings(userId: string) {
    let settings = db.userSettings.find(s => s.userId === userId);
    if (!settings) {
      settings = {
        id: uuidv4(),
        userId,
        settings: {},
        updatedAt: new Date(),
      };
      db.userSettings.push(settings);
    }
    return { settings: settings.settings };
  },

  async updateUserSettings(userId: string, newSettings: Record<string, any>) {
    let settings = db.userSettings.find(s => s.userId === userId);
    if (!settings) {
      settings = {
        id: uuidv4(),
        userId,
        settings: newSettings,
        updatedAt: new Date(),
      };
      db.userSettings.push(settings);
    } else {
      settings.settings = newSettings;
      settings.updatedAt = new Date();
    }
    return { settings: settings.settings };
  },
};
