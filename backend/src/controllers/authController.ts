import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { z } from 'zod';
import { registerRequestSchema, loginRequestSchema, updateProfileRequestSchema } from '../types/validators';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = registerRequestSchema.parse(req.body);
    const result = await authService.register(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = loginRequestSchema.parse(req.body);
    const result = await authService.login(data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // Stateless JWT: just respond success
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const user = await authService.getProfile(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const data = updateProfileRequestSchema.parse(req.body);
    const user = await authService.updateProfile(userId, data);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
