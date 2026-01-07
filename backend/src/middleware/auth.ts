import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '../services/userService';
import { ApiError } from '../utils/errors';

export interface AuthRequest extends Request {
  user?: any;
  token?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or invalid Authorization header'));
  }
  const token = authHeader.substring(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    req.user = (payload as any).user;
    req.token = token;
    next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}
