import { User } from '../types';

const users = new Map<string, User>();

export const userRepository = {
  async create(user: User): Promise<void> {
    users.set(user.id, user);
  },

  async findByEmail(email: string): Promise<User | undefined> {
    for (const user of users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  },

  async findById(id: string): Promise<User | undefined> {
    return users.get(id);
  },

  async update(user: User): Promise<void> {
    users.set(user.id, user);
  }
};
