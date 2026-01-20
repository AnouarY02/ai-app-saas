import { Request, Response, NextFunction } from 'express';
import { findUserByEmail, createUser } from '../services/userService';
import { comparePasswords, hashPassword, signJwt } from '../services/authService';
import { logWithTimestamp } from '../utils/logger';

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.' });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const valid = await comparePasswords(password, user.hashed_password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = signJwt({ userId: user.id, email: user.email });
    logWithTimestamp(`User ${user.email} logged in.`);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Email, password, and full name required.' });
    }
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    const hashed_password = await hashPassword(password);
    const user = await createUser({ email, hashed_password, full_name });
    const token = signJwt({ userId: user.id, email: user.email });
    logWithTimestamp(`User ${user.email} registered.`);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

export async function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    // Stateless JWT: client deletes token
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
