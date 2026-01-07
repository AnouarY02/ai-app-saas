// JWT utilities for backend and frontend
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export interface JwtUserPayload {
  id: string;
  email: string;
}

export function signJwt(payload: JwtUserPayload, secret: string, options?: SignOptions): string {
  return jwt.sign(payload, secret, { expiresIn: '7d', ...options });
}

export function verifyJwt<T = JwtUserPayload>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T;
}
