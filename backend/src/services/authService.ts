import { User, UserPublic } from '../models/User';
import { RegisterRequest, LoginRequest, UpdateProfileRequest, AuthResponse } from '../types/api';
import { usersDb } from '../config/database';
import bcrypt from 'bcryptjs';
import { signJwt } from '../utils/jwt';
import { v4 as uuidv4 } from 'uuid';

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const existing = usersDb.find(u => u.email === data.email);
  if (existing) {
    throw { status: 409, message: 'Email already registered' };
  }
  const now = new Date();
  const user: User = {
    id: uuidv4(),
    email: data.email,
    passwordHash: await bcrypt.hash(data.password, 10),
    name: data.name,
    createdAt: now,
    updatedAt: now
  };
  usersDb.push(user);
  const token = signJwt({ id: user.id });
  return { token, user: toUserPublic(user) };
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const user = usersDb.find(u => u.email === data.email);
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const token = signJwt({ id: user.id });
  return { token, user: toUserPublic(user) };
}

export async function getProfile(userId: string): Promise<UserPublic> {
  const user = usersDb.find(u => u.id === userId);
  if (!user) throw { status: 404, message: 'User not found' };
  return toUserPublic(user);
}

export async function updateProfile(userId: string, data: UpdateProfileRequest): Promise<UserPublic> {
  const user = usersDb.find(u => u.id === userId);
  if (!user) throw { status: 404, message: 'User not found' };
  if (data.name !== undefined) user.name = data.name;
  if (data.password) user.passwordHash = await bcrypt.hash(data.password, 10);
  user.updatedAt = new Date();
  return toUserPublic(user);
}

function toUserPublic(user: User): UserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
