import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByEmail, getUserPublic } from '../models/userModel';
import { logWithTimestamp } from '../utils/logger';

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid login payload' });
    }
    const { email, password } = parsed.data;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '7d' }
    );
    logWithTimestamp(`User ${user.email} logged in`);
    res.json({
      token,
      user: getUserPublic(user),
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // Stateless JWT: client should delete token
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(getUserPublic(user));
  } catch (err) {
    next(err);
  }
}
