import { Request, Response, NextFunction } from 'express';
import { updateUserRequestSchema } from '../validators/userValidators';
import { userService } from '../services/userService';
import { hashPassword } from '../utils/hash';
import { logger } from '../utils/logger';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const data = updateUserRequestSchema.parse(req.body);
    let update: any = {};
    if (data.name) update.name = data.name;
    if (data.email) update.email = data.email;
    if (data.password) update.passwordHash = await hashPassword(data.password);
    const user = await userService.update(userId, update);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    logger.info(`User updated: ${user.id}`);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
