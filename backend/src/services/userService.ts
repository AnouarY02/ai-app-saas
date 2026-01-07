import { db } from '../models/db';
import { User, UserProfile, UserPublic } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/errors';
import { sessionService } from './sessionService';

function toUserPublic(user: User): UserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

function toUserProfile(user: User): UserProfile {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

export const userService = {
  async register(email: string, password: string, name?: string) {
    if (db.users.find(u => u.email === email)) {
      throw new ApiError(409, 'Email already registered');
    }
    const id = uuidv4();
    const now = new Date();
    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = {
      id,
      email,
      passwordHash,
      name,
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(user);
    const token = sessionService.createSession(user);
    return { user: toUserPublic(user), token };
  },

  async login(email: string, password: string) {
    const user = db.users.find(u => u.email === email);
    if (!user) throw new ApiError(401, 'Invalid email or password');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new ApiError(401, 'Invalid email or password');
    const token = sessionService.createSession(user);
    return { user: toUserPublic(user), token };
  },

  async getProfile(userId: string) {
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new ApiError(404, 'User not found');
    return toUserProfile(user);
  },

  async updateProfile(userId: string, update: { name?: string; email?: string; password?: string }) {
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new ApiError(404, 'User not found');
    if (update.email && update.email !== user.email) {
      if (db.users.find(u => u.email === update.email)) {
        throw new ApiError(409, 'Email already in use');
      }
      user.email = update.email;
    }
    if (update.name) user.name = update.name;
    if (update.password) {
      user.passwordHash = await bcrypt.hash(update.password, 10);
    }
    user.updatedAt = new Date();
    return toUserProfile(user);
  },
};
