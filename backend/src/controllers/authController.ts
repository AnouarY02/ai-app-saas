import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../services/userService';
import { v4 as uuidv4 } from 'uuid';

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_secret';

export async function login(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }
    let user = getUserByEmail(email);
    if (!user) {
      user = {
        id: uuidv4(),
        name,
        email,
        avatarUrl: '',
        role: 'member',
        teams: []
      };
      // Add user to store
      require('../services/userService').addUser(user);
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, SESSION_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function logout(req: Request, res: Response) {
  // For stateless JWT, logout is handled on client (token removal)
  res.json({ success: true });
}
