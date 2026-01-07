import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import { logError } from '../utils/logger';

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await userService.getUserPublicById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    logError('GetMe error:', err);
    next(err);
  }
};

export default { getMe };
