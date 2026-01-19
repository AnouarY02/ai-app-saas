import express from 'express';
import { signup, login, logout } from '../controllers/authController';
import { validateSignup, validateLogin, validateLogout } from '../utils/validators';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', authMiddleware, validateLogout, logout);

export default router;
