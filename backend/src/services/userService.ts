import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/inMemoryDb';
import { User } from '../models/types';

export const userService = {
  async create(data: { email: string; passwordHash: string; name: string }): Promise<User> {
    const now = new Date();
    const user: User = {
      id: uuidv4(),
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
      createdAt: now,
      updatedAt: now,
    };
    db.users.set(user.id, user);
    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    for (const user of db.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  },

  async findById(id: string): Promise<User | undefined> {
    return db.users.get(id);
  },

  async update(id: string, update: Partial<User>): Promise<User | undefined> {
    const user = db.users.get(id);
    if (!user) return undefined;
    const updated: User = { ...user, ...update, updatedAt: new Date() };
    db.users.set(id, updated);
    return updated;
  },
};
