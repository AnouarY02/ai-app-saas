import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, UpdateSettingsRequest } from '../types';

// In-memory user store for MVP
const users: User[] = [
  {
    id: uuidv4(),
    email: 'demo@ai-app.com',
    passwordHash: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const userService = {
  async findByEmail(email: string): Promise<User | undefined> {
    return users.find(u => u.email === email);
  },
  async findById(id: string): Promise<User | undefined> {
    return users.find(u => u.id === id);
  },
  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  },
  async updateUser(id: string, data: UpdateSettingsRequest): Promise<User> {
    const user = users.find(u => u.id === id);
    if (!user) throw { status: 404, message: 'User not found' };
    if (data.email) user.email = data.email;
    if (data.password) user.passwordHash = await bcrypt.hash(data.password, 10);
    user.updatedAt = new Date();
    return user;
  },
  sanitizeUser(user: User) {
    const { passwordHash, ...rest } = user;
    return rest;
  }
};
