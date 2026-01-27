import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { id, email, createdAt, lastLoginAt } = user;
    res.json({ id, email, createdAt, lastLoginAt });
  } catch (err) {
    next(err);
  }
}
