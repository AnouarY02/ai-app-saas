import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { createUserSchema } from '../validators/userValidators';

const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createUserSchema.parse(req.body);
      const existingUser = await userService.findByEmail(input.email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      const passwordHash = await bcrypt.hash(input.password, 10);
      const user = await userService.create({ ...input, passwordHash });
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
      const { passwordHash: _, ...safeUser } = user;
      res.status(201).json({ token, user: safeUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
      const { passwordHash: _, ...safeUser } = user;
      res.status(200).json({ token, user: safeUser });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ message: 'Unauthorized' });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
