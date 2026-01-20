import express from 'express';
import { getCurrentUser, updateCurrentUser } from '../controllers/userController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/me', requireAuth, getCurrentUser);
router.put('/me', requireAuth, updateCurrentUser);

export default router;
