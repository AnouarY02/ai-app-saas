import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../types/entities';

// In-memory user store for MVP
type UserStore = Map<string, User>;
const users: UserStore = new Map();

// Seed a demo user for login
defaultUserSeed();

function defaultUserSeed() {
  if (users.size === 0) {
    const id = uuidv4();
    const email = 'demo@ai-app.com';
    const password = 'password123';
    bcrypt.hash(password, 10).then(passwordHash => {
      users.set(id, {
        id,
        email,
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date()
      });
    });
  }
}

export const userService = {
  async findByEmail(email: string): Promise<User | undefined> {
    for (const user of users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  },
  async findById(id: string): Promise<User | undefined> {
    return users.get(id);
  },
  async updateLastLogin(id: string): Promise<void> {
    const user = users.get(id);
    if (user) {
      user.lastLoginAt = new Date();
      user.updatedAt = new Date();
      users.set(id, user);
    }
  }
};
