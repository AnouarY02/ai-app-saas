import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { updateSettingsRequestSchema } from '../validators/userValidators';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const user = await userService.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(userService.sanitizeUser(user));
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const parsed = updateSettingsRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request', details: parsed.error.errors });
    }
    const updated = await userService.updateUser(userId, parsed.data);
    res.status(200).json(userService.sanitizeUser(updated));
  } catch (err) {
    next(err);
  }
}
