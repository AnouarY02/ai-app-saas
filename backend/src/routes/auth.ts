import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser);
router.post('/logout', requireAuth, logoutUser);

export default router;
