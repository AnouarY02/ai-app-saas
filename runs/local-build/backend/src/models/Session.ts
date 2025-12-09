import { v4 as uuidv4 } from 'uuid';
import { Session } from '../types';

const sessions: Session[] = [];

export const SessionModel = {
  async create(session: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    const now = new Date();
    const newSession: Session = {
      id: uuidv4(),
      ...session,
      createdAt: now
    };
    sessions.push(newSession);
    return newSession;
  },
  async findByToken(token: string): Promise<Session | undefined> {
    return sessions.find(s => s.token === token && s.expiresAt > new Date());
  },
  async deleteByToken(token: string): Promise<void> {
    const idx = sessions.findIndex(s => s.token === token);
    if (idx !== -1) sessions.splice(idx, 1);
  },
  async deleteByUserId(userId: string): Promise<void> {
    for (let i = sessions.length - 1; i >= 0; i--) {
      if (sessions[i].userId === userId) sessions.splice(i, 1);
    }
  }
};

