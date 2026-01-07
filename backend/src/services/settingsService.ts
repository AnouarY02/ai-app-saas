import { userSettings } from '../data/inMemoryDb';
import { UserSettings } from '../types/entities';

const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  return userSettings.find(s => s.userId === userId) || null;
};

const updateUserSettings = async (userId: string, preferences: any): Promise<UserSettings> => {
  let settings = userSettings.find(s => s.userId === userId);
  if (!settings) {
    settings = {
      id: userId,
      userId,
      preferences,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    userSettings.push(settings);
  } else {
    settings.preferences = preferences;
    settings.updatedAt = new Date().toISOString();
  }
  return settings;
};

export default { getUserSettings, updateUserSettings };
