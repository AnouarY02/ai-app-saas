import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../seed';

export const registerUser = async (req: Request, res: Response) => {
  // Registration logic
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
};

export const refreshToken = (req: Request, res: Response) => {
  // Refresh token logic
};

export const logoutUser = (req: Request, res: Response) => {
  // Logout logic
};