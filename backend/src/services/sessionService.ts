import { db } from '../models/db';
import { Session, User } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const SESSION_EXPIRY_HOURS = 24;

export const sessionService = {
  createSession(user: User): string {
    const token = jwt.sign({ user: { id: user.id, email: user.email, name: user.name } }, JWT_SECRET, {
      expiresIn: `${SESSION_EXPIRY_HOURS}h`,
    });
    const session: Session = {
      id: uuidv4(),
      userId: user.id,
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000),
    };
    db.sessions.push(session);
    return token;
  },

  logout(userId: string, token: string) {
    const idx = db.sessions.findIndex(s => s.userId === userId && s.token === token);
    if (idx >= 0) {
      db.sessions.splice(idx, 1);
    }
    return Promise.resolve();
  },
};
