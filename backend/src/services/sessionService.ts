import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/inMemoryDb';
import { Session } from '../models/types';
import { verifyToken as verifyJwt, signToken as signJwt } from '../utils/jwt';

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const sessionService = {
  async create(userId: string): Promise<Session> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);
    const session: Session = {
      id: uuidv4(),
      userId,
      token: '', // Will be set after JWT sign
      createdAt: now,
      expiresAt,
    };
    db.sessions.set(session.id, session);
    return session;
  },

  async deleteById(sessionId: string): Promise<void> {
    db.sessions.delete(sessionId);
  },

  async verifyToken(token: string): Promise<{ sessionId: string; userId: string } | null> {
    try {
      const payload = verifyJwt(token);
      if (!payload.sessionId || !payload.userId) return null;
      const session = db.sessions.get(payload.sessionId);
      if (!session || session.userId !== payload.userId) return null;
      if (session.expiresAt < new Date()) {
        db.sessions.delete(payload.sessionId);
        return null;
      }
      return { sessionId: payload.sessionId, userId: payload.userId };
    } catch {
      return null;
    }
  },
};
