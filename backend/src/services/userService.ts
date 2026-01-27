import { User } from '../types/user';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// In-memory user store for MVP
const users: User[] = [
  {
    id: 'd0c9e8b2-1111-4e6b-9b6a-000000000001',
    email: 'user@padelclubpro.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    lastLoginAt: new Date('2024-01-01T10:00:00.000Z').toISOString()
  }
];

async function findByEmail(email: string): Promise<User | undefined> {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

async function findById(id: string): Promise<User | undefined> {
  return users.find(u => u.id === id);
}

async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

async function updateLastLogin(id: string): Promise<void> {
  const user = users.find(u => u.id === id);
  if (user) {
    user.lastLoginAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();
  }
}

export default {
  findByEmail,
  findById,
  verifyPassword,
  updateLastLogin
};
