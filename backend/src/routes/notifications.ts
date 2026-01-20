import express from 'express';
import { listNotificationsForUser, markNotificationAsRead } from '../controllers/notificationController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, listNotificationsForUser);
router.post('/:notificationId/read', requireAuth, markNotificationAsRead);

export default router;
