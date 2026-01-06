import { Session } from '../models/session';
import { v4 as uuidv4 } from 'uuid';

const SESSION_DURATION_MINUTES = 60 * 24; // 24 hours

class SessionService {
  private sessions: Session[] = [];

  async createSession(userId: string): Promise<Session> {
    const token = uuidv4();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_DURATION_MINUTES * 60 * 1000);
    const session: Session = {
      id: uuidv4(),
      userId,
      token,
      expiresAt,
      createdAt: now
    };
    this.sessions.push(session);
    return session;
  }

  async findByToken(token: string): Promise<Session | undefined> {
    return this.sessions.find(s => s.token === token);
  }

  async invalidateSession(token: string): Promise<void> {
    this.sessions = this.sessions.filter(s => s.token !== token);
  }
}

export const sessionService = new SessionService();
