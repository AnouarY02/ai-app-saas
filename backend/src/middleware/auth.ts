import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sessions } from '../data/inMemoryDb';
import { JWT_SECRET } from '../utils/constants';
import { users } from '../data/inMemoryDb';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = '';
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({ error: 'Missing auth token' });
    }
    // Check session exists
    const session = sessions.find(s => s.token === token);
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    // Verify JWT
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = users.find(u => u.id === payload.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    (req as any).user = user;
    (req as any).authToken = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
