import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../services/userService';

export async function getDashboardData(req: Request, res: Response, next: NextFunction) {
  try {
    const userProfile = req.user;
    if (!userProfile) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Optionally, fetch additional stats here
    res.json({ user: userProfile, stats: {} });
  } catch (err) {
    next(err);
  }
}
