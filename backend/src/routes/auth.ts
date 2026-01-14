import { Router } from 'express';
import { login, signup, session } from '../controllers/authController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/session', requireAuth, session);

export default router;
