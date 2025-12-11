import { Session } from '../entities/Session';
import { v4 as uuidv4 } from 'uuid';

// In-memory session store for MVP
const sessions = new Map<string, Session>();

export const sessionRepository = {
  async create(userId: string, token: string, expiresAt: Date): Promise<Session> {
    const session: Session = {
      id: uuidv4(),
      userId,
      token,
      expiresAt,
      createdAt: new Date()
    };
    sessions.set(token, session);
    return session;
  },
  async findByToken(token: string): Promise<Session | undefined> {
    return sessions.get(token);
  },
  async deleteByToken(token: string): Promise<boolean> {
    return sessions.delete(token);
  },
  async deleteAllForUser(userId: string): Promise<void> {
    for (const [token, session] of sessions.entries()) {
      if (session.userId === userId) {
        sessions.delete(token);
      }
    }
  }
};
