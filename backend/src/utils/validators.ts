import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const logoutRequestSchema = z.object({
  token: z.string().optional()
});

export const updateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
});

export function validateSignup(req: Request, res: Response, next: NextFunction) {
  try {
    signupRequestSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    loginRequestSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
}

export function validateLogout(req: Request, res: Response, next: NextFunction) {
  try {
    logoutRequestSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
}

export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  try {
    updateUserRequestSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
}
