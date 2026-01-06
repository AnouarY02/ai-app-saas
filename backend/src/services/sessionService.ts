import { v4 as uuidv4 } from 'uuid';
import { Session } from '../types';

const sessions: Session[] = [];

export const sessionService = {
  async createSession(userId: string, token: string): Promise<Session> {
    const expiresAt = new Date(Date.now() + (parseInt(process.env.SESSION_EXPIRY_MINUTES || '60', 10) * 60 * 1000));
    const session: Session = {
      id: uuidv4(),
      userId,
      token,
      expiresAt,
      createdAt: new Date()
    };
    sessions.push(session);
    return session;
  },
  async deleteSessionByToken(token: string): Promise<void> {
    const idx = sessions.findIndex(s => s.token === token);
    if (idx !== -1) sessions.splice(idx, 1);
  },
  async findByToken(token: string): Promise<Session | undefined> {
    return sessions.find(s => s.token === token);
  }
};
