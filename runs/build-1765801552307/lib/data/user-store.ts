import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
};

const users: User[] = [];

export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: uuidv4(),
    name,
    email,
    passwordHash,
    role: 'user',
  };
  users.push(user);
  return user;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

