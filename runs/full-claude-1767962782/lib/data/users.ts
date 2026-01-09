import { db } from './store';
import { User } from '../types';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return null;
  return db.users.find(u => u.id === userId) || null;
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }): Promise<User> {
  const user: User = { id: uuidv4(), name, email };
  db.users.push(user);
  // Password is not stored in MVP
  return user;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return db.users.find(u => u.email === email);
}

