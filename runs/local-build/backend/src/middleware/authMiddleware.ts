import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '../services/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }
    if (!token) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await userService.getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid session.' });
    }
    req.user = { id: user.id, email: user.email, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

