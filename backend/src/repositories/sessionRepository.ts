import { Session } from '../types';

const sessions = new Map<string, Session>();

export const sessionRepository = {
  async create(session: Session): Promise<void> {
    sessions.set(session.token, session);
  },

  async findByToken(token: string): Promise<Session | undefined> {
    return sessions.get(token);
  },

  async deleteByToken(token: string): Promise<void> {
    sessions.delete(token);
  }
};
