import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User } from '../types/entities';

// In-memory user store for MVP/demo
const users: User[] = [
  {
    id: uuidv4(),
    email: 'demo@crm.com',
    passwordHash: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find(u => u.email === email);
}

export async function validatePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find(u => u.id === id);
}
