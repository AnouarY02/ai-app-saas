// JWT utilities (backend, but can be used for decoding in frontend)
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export function signJwt(payload: object, secret: string, options?: SignOptions): string {
  return jwt.sign(payload, secret, options);
}

export function verifyJwt<T = any>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T;
}

export function decodeJwt<T = any>(token: string): T | null {
  try {
    return jwt.decode(token) as T;
  } catch {
    return null;
  }
}
