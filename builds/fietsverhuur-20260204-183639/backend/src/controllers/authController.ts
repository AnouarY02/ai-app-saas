import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users, TEST_USER } from '@/seed';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = users.get(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (users.has(email)) return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: Math.random().toString(36),
      email,
      passwordHash,
      name,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.set(email, user);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req: any, res: Response) => {
  try {
    const user = users.get(req.user.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      data: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};