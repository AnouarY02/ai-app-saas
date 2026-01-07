import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { findUserByEmail, validatePassword } from '../services/userService';
import { generateJWT } from '../utils/jwt';
import { logWithTimestamp } from '../utils/logger';

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
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
    const valid = await validatePassword(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateJWT(user);
    logWithTimestamp(`User login: ${email}`);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // For stateless JWT, logout is handled client-side (token deletion)
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
