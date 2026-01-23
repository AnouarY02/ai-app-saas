import jwt from 'jsonwebtoken';
import { UserProfile, User } from '../types/user';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'changeme';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
const JWT_EXPIRES_IN = '1h';

export function signJwt(user: UserProfile): string {
  return jwt.sign(user, JWT_SECRET_KEY, {
    algorithm: JWT_ALGORITHM as jwt.Algorithm,
    expiresIn: JWT_EXPIRES_IN
  });
}

export function verifyJwt(token: string): UserProfile | null {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as UserProfile;
  } catch {
    return null;
  }
}

export function getUserProfileFromUser(user: User): UserProfile {
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    is_active: user.is_active
  };
}
