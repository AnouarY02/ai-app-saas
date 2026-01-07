import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { getMe, updateMe } from '../controllers/userController';
import { createInteraction, getHistory } from '../controllers/aiController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', requireAuth, logout);

// User
router.get('/user/me', requireAuth, getMe);
router.put('/user/me', requireAuth, updateMe);

// AI
router.post('/ai/interaction', requireAuth, createInteraction);
router.get('/ai/history', requireAuth, getHistory);

export default router;
