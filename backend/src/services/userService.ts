import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

interface UpdateProfileInput {
  name?: string;
  email?: string;
  password?: string;
}

class UserService {
  private users: User[] = [
    // Demo user
    {
      id: uuidv4(),
      email: 'demo@ai-app.com',
      passwordHash: bcrypt.hashSync('password', 10),
      name: 'Demo User',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw { status: 404, message: 'User not found' };
    if (input.name) user.name = input.name;
    if (input.email) user.email = input.email;
    if (input.password) user.passwordHash = await bcrypt.hash(input.password, 10);
    user.updatedAt = new Date();
    return user;
  }
}

export const userService = new UserService();
