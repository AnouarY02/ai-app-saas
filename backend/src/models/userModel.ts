import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, UserPublic } from '../types/entities';

// In-memory user store for demo
const users: User[] = [
  {
    id: uuidv4(),
    email: 'demo@crm.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find((u) => u.email === email);
}

export async function findUserById(id: string): Promise<User | undefined> {
  return users.find((u) => u.id === id);
}

export function getUserPublic(user: User): UserPublic {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
