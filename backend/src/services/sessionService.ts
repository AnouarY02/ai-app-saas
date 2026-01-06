import { v4 as uuidv4 } from 'uuid';
import { Session } from '../types';
import { sessionRepository } from '../repositories/sessionRepository';

const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const sessionService = {
  async create(userId: string, token: string): Promise<Session> {
    const now = new Date();
    const session: Session = {
      id: uuidv4(),
      userId,
      token,
      expiresAt: new Date(now.getTime() + SESSION_EXPIRES_IN_MS),
      createdAt: now
    };
    await sessionRepository.create(session);
    return session;
  },

  async findByToken(token: string): Promise<Session | undefined> {
    return sessionRepository.findByToken(token);
  },

  async logout(token: string): Promise<void> {
    await sessionRepository.deleteByToken(token);
  }
};
