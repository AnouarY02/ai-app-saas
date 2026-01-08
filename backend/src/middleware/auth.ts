import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwtService';
import { userService } from '../services/userService';

export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    const user = await userService.getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' });
    }
    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
