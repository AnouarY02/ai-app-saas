import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { usersDb } from '../config/database';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  const token = auth.slice(7);
  try {
    const payload = verifyJwt(token);
    const user = usersDb.find(u => u.id === payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    (req as any).user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
