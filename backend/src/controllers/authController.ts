import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import authService from '../services/authService';
import { loginRequestSchema } from '../types/validators';
import { logError } from '../utils/logger';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = loginRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid login payload' });
    }
    const { email, password } = parsed.data;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    logError('Login error:', err);
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.authToken;
    await authService.logout(token);
    res.json({ success: true });
  } catch (err) {
    logError('Logout error:', err);
    next(err);
  }
};

export default { login, logout };
