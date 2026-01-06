import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sessionService } from '../services/sessionService';
import { UnauthorizedError } from './errorTypes';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] || '';
  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(new UnauthorizedError('Missing auth token'));
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const session = await sessionService.findByToken(token);
    if (!session || new Date(session.expiresAt) < new Date()) {
      return next(new UnauthorizedError('Session expired or invalid'));
    }
    req.user = { id: payload.id, email: payload.email };
    req.token = token;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid auth token'));
  }
}
