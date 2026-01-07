import { Request, Response, NextFunction } from 'express';

export async function getDashboardData(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    // For MVP, features are static
    const features = [
      'AI-powered analytics',
      'Custom model deployment',
      'Realtime data dashboard'
    ];
    res.status(200).json({ user: { id: user.id, email: user.email }, features });
  } catch (err) {
    next(err);
  }
}
