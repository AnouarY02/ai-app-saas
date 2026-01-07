import express from 'express';
import { login, logout, me } from '../controllers/authController';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, me);

export default router;
