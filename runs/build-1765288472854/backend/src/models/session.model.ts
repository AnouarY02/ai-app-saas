import { v4 as uuidv4 } from 'uuid';
import { Session } from '../types/session';

// In-memory session store for demonstration (replace with DB in production)
const sessions: Session[] = [];

export const SessionModel = {
  async create(session: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    const now = new Date();
    const newSession: Session = {
      id: uuidv4(),
      createdAt: now,
      ...session
    };
    sessions.push(newSession);
    return newSession;
  },

  async findByToken(token: string): Promise<Session | undefined> {
    return sessions.find(s => s.token === token);
  },

  async findByUserId(userId: string): Promise<Session[]> {
    return sessions.filter(s => s.userId === userId);
  },

  async deleteByToken(token: string): Promise<boolean> {
    const idx = sessions.findIndex(s => s.token === token);
    if (idx >= 0) {
      sessions.splice(idx, 1);
      return true;
    }
    return false;
  },

  async isValid(token: string): Promise<boolean> {
    const session = await this.findByToken(token);
    if (!session) return false;
    return session.expiresAt > new Date();
  }
};

