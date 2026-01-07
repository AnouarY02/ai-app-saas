import { Router } from 'express';
import { login, signup, me } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/me', authMiddleware, me);

export default router;
