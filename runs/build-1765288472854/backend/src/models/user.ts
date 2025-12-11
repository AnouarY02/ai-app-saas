// In-memory User model (replace with DB in production)
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

const users: User[] = [];

export const UserModel = {
  async create(data: { email: string; passwordHash: string; name?: string }): Promise<User> {
    const now = new Date();
    const user: User = {
      id: uuidv4(),
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name || '',
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return users.find((u) => u.email === email);
  },

  async findById(id: string): Promise<User | undefined> {
    return users.find((u) => u.id === id);
  },

  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'>> & { passwordHash?: string }): Promise<User | undefined> {
    const user = users.find((u) => u.id === id);
    if (!user) return undefined;
    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;
    if (data.passwordHash !== undefined) user.passwordHash = data.passwordHash;
    user.updatedAt = new Date();
    return user;
  },
};
