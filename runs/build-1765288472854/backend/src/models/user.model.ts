import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';

// In-memory user store for demonstration (replace with DB in production)
const users: User[] = [];

export const UserModel = {
  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const newUser: User = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      ...user
    };
    users.push(newUser);
    return newUser;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return users.find(u => u.email === email);
  },

  async findById(id: string): Promise<User | undefined> {
    return users.find(u => u.id === id);
  },

  async update(id: string, updates: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | undefined> {
    const user = await this.findById(id);
    if (!user) return undefined;
    Object.assign(user, updates);
    user.updatedAt = new Date();
    return user;
  }
};

