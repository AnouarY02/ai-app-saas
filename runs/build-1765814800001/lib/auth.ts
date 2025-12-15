import { users } from './store';
import { User } from './types';
import { randomUUID } from 'crypto';

export async function authenticate(email: string, password: string): Promise<User | null> {
  // For demo: password is always 'password'
  const user = users.find(u => u.email === email);
  if (user && password === 'password') return user;
  return null;
}

export async function registerUser(name: string, email: string, password: string): Promise<User | null> {
  if (users.find(u => u.email === email)) return null;
  const user: User = {
    id: randomUUID(),
    name,
    email,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return user;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find(u => u.email === email);
}

