import { randomUUID } from 'crypto';
import { hashPassword, comparePassword } from './utils';

interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
}

const users: User[] = [];

export function createUser({ name, email, password }: { name: string; email: string; password: string; }): User {
  const user: User = {
    id: randomUUID(),
    name,
    email,
    password: hashPassword(password),
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}

export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function verifyPassword(user: User, password: string): boolean {
  return comparePassword(password, user.password);
}

