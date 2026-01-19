import express from 'express';
import { getMe, updateMe } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateUpdateUser } from '../utils/validators';

const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, validateUpdateUser, updateMe);

export default router;
