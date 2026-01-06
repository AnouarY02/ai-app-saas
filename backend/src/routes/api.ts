import { Router } from 'express';
import { login, logout } from '../controllers/authController';
import { getMe, updateSettings } from '../controllers/userController';
import { createRequest, listRequests, getRequest } from '../controllers/aiController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// Auth
router.post('/auth/login', login);
router.post('/auth/logout', authenticateJWT, logout);

// User
router.get('/user/me', authenticateJWT, getMe);
router.put('/user/settings', authenticateJWT, updateSettings);

// AI Requests
router.post('/ai/requests', authenticateJWT, createRequest);
router.get('/ai/requests', authenticateJWT, listRequests);
router.get('/ai/requests/:id', authenticateJWT, getRequest);

export default router;
