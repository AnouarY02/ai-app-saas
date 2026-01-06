import { Request, Response, NextFunction } from 'express';
import { sessionService } from '../services/sessionService';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined = undefined;
  const authHeader = req.headers['authorization'];
  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.body && req.body.token) {
    token = req.body.token;
  } else if (req.query && typeof req.query.token === 'string') {
    token = req.query.token;
  }
  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid session token' });
  }
  const session = await sessionService.findByToken(token);
  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }
  req.session = session;
  req.userId = session.userId;
  req.token = token;
  next();
}
