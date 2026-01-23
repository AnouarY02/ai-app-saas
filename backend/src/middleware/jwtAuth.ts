import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../services/jwtService';

export function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = auth.slice(7);
  const userProfile = verifyJwt(token);
  if (!userProfile) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  // Attach user profile to request
  (req as any).user = userProfile;
  next();
}
