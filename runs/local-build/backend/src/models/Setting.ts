import { v4 as uuidv4 } from 'uuid';
import { Setting } from '../types';

const settings: Setting[] = [];

export const SettingModel = {
  async findByUserId(userId: string): Promise<Setting[]> {
    return settings.filter(s => s.userId === userId);
  },
  async upsert(userId: string, key: string, value: string): Promise<Setting> {
    let setting = settings.find(s => s.userId === userId && s.key === key);
    if (setting) {
      setting.value = value;
      setting.updatedAt = new Date();
    } else {
      setting = {
        id: uuidv4(),
        userId,
        key,
        value,
        updatedAt: new Date()
      };
      settings.push(setting);
    }
    return setting;
  },
  async bulkUpsert(userId: string, kvs: { key: string; value: string }[]): Promise<Setting[]> {
    const updated: Setting[] = [];
    for (const { key, value } of kvs) {
      updated.push(await this.upsert(userId, key, value));
    }
    return updated;
  }
};

