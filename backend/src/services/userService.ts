import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  teams?: string[];
}

const users: User[] = [];

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}

export function addUser(user: User): User {
  users.push(user);
  return user;
}

export function updateUser(id: string, data: Partial<User>): User | undefined {
  const user = getUserById(id);
  if (!user) return undefined;
  Object.assign(user, data);
  return user;
}
