import { Router } from 'express';
import { loginSchema, logoutSchema, updateProfileSchema } from '../validators/schemas';
import { requireAuth } from '../middleware/auth';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';

const router = Router();

// POST /api/login
router.post('/login', (req, res, next) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid login payload', details: parse.error.errors });
  }
  authController.login(req, res, next);
});

// POST /api/logout (auth required)
router.post('/logout', requireAuth, (req, res, next) => {
  const parse = logoutSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid logout payload', details: parse.error.errors });
  }
  authController.logout(req, res, next);
});

// GET /api/profile (auth required)
router.get('/profile', requireAuth, userController.getProfile);

// PUT /api/profile (auth required)
router.put('/profile', requireAuth, (req, res, next) => {
  const parse = updateProfileSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid update payload', details: parse.error.errors });
  }
  userController.updateProfile(req, res, next);
});

// GET /api/session (auth required)
router.get('/session', requireAuth, authController.checkSession);

export default router;
