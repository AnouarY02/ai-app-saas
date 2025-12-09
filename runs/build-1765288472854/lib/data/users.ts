import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

let users: User[] = [
  {
    id: uuidv4(),
    name: 'Admin',
    email: 'admin@aitask.nl',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export async function getUsers(): Promise<User[]> {
  return users;
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find(u => u.id === id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find(u => u.email === email);
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }): Promise<User> {
  const user: User = {
    id: uuidv4(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'member',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | undefined> {
  const user = users.find(u => u.id === id);
  if (!user) return undefined;
  Object.assign(user, data);
  return user;
}

export async function deleteUser(id: string): Promise<boolean> {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

