import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { generateToken } from '../services/jwtService';
import { logError } from '../utils/logger';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await userService.createUser(email, password);
    const token = generateToken(user);
    res.status(201).json({ token, user: userService.toPublic(user) });
  } catch (err) {
    logError('Register error', err);
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token, user: userService.toPublic(user) });
  } catch (err) {
    logError('Login error', err);
    next(err);
  }
}
