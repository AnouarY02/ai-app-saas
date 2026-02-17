import { userStore, User, CreateUserInput, UpdateUserInput } from '../models/UserModel';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  async findAll(): Promise<User[]> {
    return Array.from(userStore.values());
  }

  async findById(id: string): Promise<User | null> {
    return userStore.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of userStore.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const user: User = { id, ...input, createdAt: now, updatedAt: now };
    userStore.set(id, user);
    return user;
  }

  async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const user = userStore.get(id);
    if (!user) return null;
    const updatedUser = { ...user, ...input, updatedAt: new Date().toISOString() };
    userStore.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    return userStore.delete(id);
  }
}
