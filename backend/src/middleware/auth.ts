import { Request, Response, NextFunction } from 'express';
import { sessionService } from '../services/sessionService';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.slice(7);
    const payload = await sessionService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }
    req.user = { id: payload.userId };
    req.session = { id: payload.sessionId };
    next();
  } catch (err) {
    next(err);
  }
}
