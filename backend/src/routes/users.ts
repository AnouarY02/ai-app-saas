import express from 'express';
import { getMe, updateMe } from '../controllers/userController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/me', requireAuth, getMe);
router.patch('/me', requireAuth, updateMe);

export default router;
