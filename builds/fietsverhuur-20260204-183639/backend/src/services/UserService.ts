import { userStore } from '@/models/UserModel';
import { v4 as uuid } from 'uuid';

export const UserService = {
  async findAll(): Promise<User[]> {
    return Array.from(userStore.values());
  },

  async findById(id: string): Promise<User | null> {
    return userStore.get(id) || null;
  },

  async create(input: CreateUserInput): Promise<User> {
    const user: User = {
      id: uuid(),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    userStore.set(user.id, user);
    return user;
  },

  async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const existing = userStore.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input, updatedAt: new Date().toISOString() };
    userStore.set(id, updated);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    return userStore.delete(id);
  },
};