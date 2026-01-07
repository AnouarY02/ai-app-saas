// Auth utility functions (JWT helpers, etc.)
import jwt from 'jsonwebtoken';
import type { UserPublic } from '../types/entities';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = '7d';

export function signJwt(user: UserPublic): string {
  return jwt.sign({
    id: user.id,
    email: user.email,
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): UserPublic | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPublic;
    return decoded;
  } catch {
    return null;
  }
}
