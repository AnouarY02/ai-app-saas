import express from 'express';
import { getMe } from '../controllers/userController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/me', requireAuth, getMe);

export default router;
