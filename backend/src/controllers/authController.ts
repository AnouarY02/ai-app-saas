import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';
import { hashPassword, verifyPassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { logger } from '../utils/logger';
import { registerRequestSchema, loginRequestSchema, logoutRequestSchema } from '../validators/authValidators';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = registerRequestSchema.parse(req.body);
    const existing = await userService.findByEmail(data.email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await hashPassword(data.password);
    const user = await userService.create({
      email: data.email,
      passwordHash,
      name: data.name
    });
    const session = await sessionService.create(user.id);
    const token = signToken({ sessionId: session.id, userId: user.id });
    logger.info(`User registered: ${user.email}`);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = loginRequestSchema.parse(req.body);
    const user = await userService.findByEmail(data.email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const session = await sessionService.create(user.id);
    const token = signToken({ sessionId: session.id, userId: user.id });
    logger.info(`User logged in: ${user.email}`);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = logoutRequestSchema.parse(req.body);
    const payload = await sessionService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid session token' });
    }
    await sessionService.deleteById(payload.sessionId);
    logger.info(`User logged out: ${payload.userId}`);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}
