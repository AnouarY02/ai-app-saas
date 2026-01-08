import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User, UserPublic } from '../types/user';

interface UserRecord extends User {
  passwordHash: string;
}

const users: UserRecord[] = [];

export const userService = {
  async createUser(email: string, password: string): Promise<User> {
    const existing = users.find(u => u.email === email);
    if (existing) {
      const err: any = new Error('Email already registered');
      err.status = 409;
      throw err;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();
    const user: UserRecord = {
      id: uuidv4(),
      email,
      passwordHash,
      createdAt: now,
      updatedAt: now
    };
    users.push(user);
    return user;
  },
  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = users.find(u => u.email === email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.passwordHash);
    return match ? user : null;
  },
  async getUserById(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id);
    return user || null;
  },
  toPublic(user: User): UserPublic {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
};
