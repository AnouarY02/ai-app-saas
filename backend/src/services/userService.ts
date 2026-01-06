import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, AuthResponse, UpdateProfileRequest } from '../types';
import { userRepository } from '../repositories/userRepository';
import { sessionService } from './sessionService';
import { BadRequestError, UnauthorizedError, ConflictError } from '../core/errorTypes';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '7d';

export const userService = {
  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new ConflictError('Email already registered');
    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();
    const user: User = {
      id: uuidv4(),
      email,
      passwordHash,
      name: name || '',
      createdAt: now,
      updatedAt: now
    };
    await userRepository.create(user);
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    await sessionService.create(user.id, token);
    return { user: { ...user, passwordHash: undefined }, token };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError('Invalid credentials');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedError('Invalid credentials');
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    await sessionService.create(user.id, token);
    return { user: { ...user, passwordHash: undefined }, token };
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new UnauthorizedError('User not found');
    const { id, email, name, createdAt } = user;
    return { id, email, name, createdAt };
  },

  async updateProfile(userId: string, update: UpdateProfileRequest) {
    const user = await userRepository.findById(userId);
    if (!user) throw new UnauthorizedError('User not found');
    if (update.email && update.email !== user.email) {
      const existing = await userRepository.findByEmail(update.email);
      if (existing) throw new ConflictError('Email already in use');
      user.email = update.email;
    }
    if (update.name) user.name = update.name;
    if (update.password) user.passwordHash = await bcrypt.hash(update.password, 10);
    user.updatedAt = new Date();
    await userRepository.update(user);
    const { id, email, name, createdAt } = user;
    return { id, email, name, createdAt };
  }
};
