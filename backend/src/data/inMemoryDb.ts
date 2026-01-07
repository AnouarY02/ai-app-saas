import { User, Session, UserSettings } from '../types/entities';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const users: User[] = [
  {
    id: uuidv4(),
    email: 'user@example.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    name: 'Example User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const sessions: Session[] = [];

export const userSettings: UserSettings[] = [
  {
    id: users[0].id,
    userId: users[0].id,
    preferences: { theme: 'light', notifications: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
