import { Request, Response, NextFunction } from 'express';
import { getUserById, updateUserProfile } from '../services/userService';
import { logWithTimestamp } from '../utils/logger';

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { full_name } = req.body;
    if (!full_name) {
      return res.status(400).json({ error: 'Full name required.' });
    }
    const updated = await updateUserProfile(userId, { full_name });
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    logWithTimestamp(`User ${userId} updated profile.`);
    res.json({
      id: updated.id,
      email: updated.email,
      full_name: updated.full_name,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    });
  } catch (err) {
    next(err);
  }
}
