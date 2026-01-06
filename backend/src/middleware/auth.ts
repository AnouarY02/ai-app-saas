import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../services/jwtService';
import { userService } from '../services/userService';

export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = jwtService.extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }
  try {
    const payload = jwtService.verify(token);
    const user = await userService.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
