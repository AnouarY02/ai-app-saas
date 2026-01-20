import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { updateUser } from '../services/userService';

export async function getMe(req: AuthRequest, res: Response) {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

export async function updateMe(req: AuthRequest, res: Response) {
  try {
    const updated = updateUser(req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}
