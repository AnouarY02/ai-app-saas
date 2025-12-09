import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

const users: User[] = [];

export const UserModel = {
  async findByEmail(email: string): Promise<User | undefined> {
    return users.find(u => u.email === email);
  },
  async findById(id: string): Promise<User | undefined> {
    return users.find(u => u.id === id);
  },
  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { passwordHash: string }): Promise<User> {
    const now = new Date();
    const newUser: User = {
      id: uuidv4(),
      ...user,
      createdAt: now,
      updatedAt: now
    };
    users.push(newUser);
    return newUser;
  },
  async update(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | undefined> {
    const user = users.find(u => u.id === id);
    if (!user) return undefined;
    Object.assign(user, updates, { updatedAt: new Date() });
    return user;
  }
};

