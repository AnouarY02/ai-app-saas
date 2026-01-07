import { User, Session, AIInteraction } from './types';

export const db = {
  users: new Map<string, User>(),
  sessions: new Map<string, Session>(),
  aiInteractions: new Map<string, AIInteraction>(),
};
