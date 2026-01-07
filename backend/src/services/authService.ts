import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserPublic, Session } from '../types/entities';
import { users, sessions } from '../data/inMemoryDb';
import { JWT_SECRET, SESSION_EXPIRY } from '../utils/constants';
import { toUserPublic } from '../utils/transform';

const login = async (email: string, password: string): Promise<{ token: string; user: UserPublic }> => {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: SESSION_EXPIRY });
  // Create session
  const session: Session = {
    id: uuidv4(),
    userId: user.id,
    token,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + parseSessionExpiry(SESSION_EXPIRY)).toISOString()
  };
  sessions.push(session);
  return { token, user: toUserPublic(user) };
};

const logout = async (token: string): Promise<void> => {
  const idx = sessions.findIndex(s => s.token === token);
  if (idx !== -1) {
    sessions.splice(idx, 1);
  }
};

function parseSessionExpiry(expiry: string): number {
  // e.g. '1h', '30m', '86400' (seconds)
  if (/^\d+$/.test(expiry)) return parseInt(expiry, 10) * 1000;
  if (expiry.endsWith('h')) return parseInt(expiry, 10) * 60 * 60 * 1000;
  if (expiry.endsWith('m')) return parseInt(expiry, 10) * 60 * 1000;
  return 3600000; // default 1h
}

export default { login, logout };
