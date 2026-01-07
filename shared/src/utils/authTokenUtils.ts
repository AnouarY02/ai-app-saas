// JWT token utilities (shared signature, not secret)
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export interface AuthTokenPayload {
  userId: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
}

// Note: secret must be provided by backend, not shared here
export function signAuthToken(payload: AuthTokenPayload, secret: string, options?: SignOptions): string {
  return jwt.sign(payload, secret, { ...options, algorithm: 'HS256' });
}

export function verifyAuthToken(token: string, secret: string): AuthTokenPayload {
  return jwt.verify(token, secret) as AuthTokenPayload;
}
