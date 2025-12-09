import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import { User, UserProfile, UpdateProfileRequest } from '../types';

export const userService = {
  toUserProfile(user: User): UserProfile {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    };
  },

  async getUserById(id: string): Promise<User | undefined> {
    return UserModel.findById(id);
  },

  async getUserProfile(id: string): Promise<UserProfile | undefined> {
    const user = await UserModel.findById(id);
    return user ? this.toUserProfile(user) : undefined;
  },

  async updateUserProfile(id: string, updates: UpdateProfileRequest): Promise<UserProfile | undefined> {
    const user = await UserModel.findById(id);
    if (!user) return undefined;
    const updatedFields: Partial<User> = {};
    if (updates.name) updatedFields.name = updates.name;
    if (updates.email) updatedFields.email = updates.email;
    if (updates.password) {
      updatedFields.passwordHash = await bcrypt.hash(updates.password, 10);
    }
    const updated = await UserModel.update(id, updatedFields);
    return updated ? this.toUserProfile(updated) : undefined;
  }
};

