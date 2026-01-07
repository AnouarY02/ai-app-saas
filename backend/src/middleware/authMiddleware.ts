import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById, getUserPublic } from '../models/userModel';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({ error: 'Missing auth token' });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'changeme') as any;
    const user = await findUserById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }
    // Attach user to request
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
