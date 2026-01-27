import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { loginRequestSchema } from '../validators/authValidators';
import userService from '../services/userService';
import { generateToken, invalidateToken } from '../services/jwtService';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request', details: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await userService.verifyPassword(user, password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    await userService.updateLastLogin(user.id);
    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // For stateless JWT, logout is handled on client by deleting token.
    // Optionally, implement token blacklist if needed.
    invalidateToken(req.user?.token); // No-op for now
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
