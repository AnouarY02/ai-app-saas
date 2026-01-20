import { Request, Response } from 'express';
import { listNotificationsByUserId, markNotificationAsRead } from '../services/notificationService';
import { AuthRequest } from '../middleware/auth';

export async function listNotificationsForUser(req: AuthRequest, res: Response) {
  try {
    res.json(listNotificationsByUserId(req.user.id));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list notifications' });
  }
}

export async function markNotificationAsRead(req: AuthRequest, res: Response) {
  try {
    const { notificationId } = req.params;
    const notification = markNotificationAsRead(notificationId, req.user.id);
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
}
