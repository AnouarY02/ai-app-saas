import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'dev_secret';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signJwt(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: '7d' });
}

export function verifyJwt(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
