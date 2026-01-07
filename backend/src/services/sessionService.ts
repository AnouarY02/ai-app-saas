import { v4 as uuidv4 } from 'uuid';
import { Session } from '../types/entities';

// In-memory session store for MVP
type SessionStore = Map<string, Session>;
const sessions: SessionStore = new Map();

const SESSION_EXPIRES_HOURS = 2;

export const sessionService = {
  async createSession(userId: string, token: string): Promise<Session> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_EXPIRES_HOURS * 60 * 60 * 1000);
    const session: Session = {
      id: uuidv4(),
      userId,
      token,
      createdAt: now,
      expiresAt
    };
    sessions.set(token, session);
    return session;
  },
  async findByToken(token: string): Promise<Session | undefined> {
    const session = sessions.get(token);
    if (!session) return undefined;
    if (session.expiresAt < new Date()) {
      sessions.delete(token);
      return undefined;
    }
    return session;
  },
  async deleteSessionByToken(token: string): Promise<void> {
    sessions.delete(token);
  }
};
