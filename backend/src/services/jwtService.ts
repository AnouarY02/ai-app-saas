import jwt from 'jsonwebtoken';
import { Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRY = '2h';

export const jwtService = {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  },
  verify(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  },
  extractToken(req: Request): string | null {
    const auth = req.headers['authorization'];
    if (!auth) return null;
    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) return null;
    return token;
  }
};
