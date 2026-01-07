import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Accept token from Authorization header (Bearer) or cookie
  let token: string | undefined;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  } else if (req.cookies && req.cookies['token']) {
    token = req.cookies['token'];
  }
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    // Optionally, validate session (for stateful logout)
    const session = await sessionService.findByToken(token);
    if (!session) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }
    const user = await userService.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
