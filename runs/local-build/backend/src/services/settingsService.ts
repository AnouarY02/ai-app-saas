import { SettingModel } from '../models/Setting';

export const settingsService = {
  async getUserSettings(userId: string): Promise<{ key: string; value: string }[]> {
    const settings = await SettingModel.findByUserId(userId);
    return settings.map(s => ({ key: s.key, value: s.value }));
  },
  async updateUserSettings(userId: string, settings: { key: string; value: string }[]): Promise<{ key: string; value: string }[]> {
    await SettingModel.bulkUpsert(userId, settings);
    return this.getUserSettings(userId);
  }
};

