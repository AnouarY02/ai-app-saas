import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserPublic } from '../services/userService';

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginRequestSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    res.json({ token, user: getUserPublic(user) });
  } catch (err) {
    next(err);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = signupRequestSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name }
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    res.status(201).json({ token, user: getUserPublic(user) });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(getUserPublic(user));
  } catch (err) {
    next(err);
  }
}
