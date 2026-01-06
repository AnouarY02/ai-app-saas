import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';
import { jwtService } from '../services/jwtService';
import { logger } from '../utils/logger';
import { loginRequestSchema } from '../validators/authValidators';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid login request', details: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await userService.verifyPassword(user, password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwtService.sign({ userId: user.id });
    await sessionService.createSession(user.id, token);
    logger.info(`User ${user.email} logged in`);
    res.status(200).json({ token, user: userService.sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = jwtService.extractToken(req);
    if (token) {
      await sessionService.deleteSessionByToken(token);
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}
