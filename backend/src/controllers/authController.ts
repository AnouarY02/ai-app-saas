import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';
import { logger } from '../utils/logger';
import { loginRequestSchema } from '../validators/authValidators';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = '2h';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request', details: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    const user = await userService.findByEmail(email);
    if (!user) {
      logger.warn(`Login failed: user not found for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      logger.warn(`Login failed: invalid password for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Issue JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    // Optionally, create a session (for stateful session support)
    await sessionService.createSession(user.id, token);
    await userService.updateLastLogin(user.id);
    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.token;
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    await sessionService.deleteSessionByToken(token);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function getSession(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const session = await sessionService.findByToken(token);
    if (!session) {
      return res.status(401).json({ error: 'Session not found' });
    }
    res.status(200).json({ user: { id: user.id, email: user.email }, expiresAt: session.expiresAt });
  } catch (err) {
    next(err);
  }
}
