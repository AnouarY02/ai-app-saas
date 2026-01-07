// In-memory DB for demo. Replace with real DB in production.
import { User, Session, UserSettings } from './types';

export const db = {
  users: [] as User[],
  sessions: [] as Session[],
  userSettings: [] as UserSettings[],
};
