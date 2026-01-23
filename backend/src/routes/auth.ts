import { Router } from 'express';
import { loginUser, logoutUser, getCurrentUser } from '../controllers/authController';
import { jwtAuthMiddleware } from '../middleware/jwtAuth';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', jwtAuthMiddleware, logoutUser);
router.get('/me', jwtAuthMiddleware, getCurrentUser);

export default router;
