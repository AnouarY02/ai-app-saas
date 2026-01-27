import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { RegisterRequest, LoginRequest, RefreshRequest, LogoutRequest } from '../types/authTypes';
import { User } from '../types/userTypes';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createUser = async (data: RegisterRequest): Promise<User> => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user: User = {
    id: uuidv4(),
    username: data.username,
    email: data.email,
    passwordHash,
    role: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  // Save user to database (mocked)
  return user;
};

export const authenticateUser = async (data: LoginRequest): Promise<{ token: string }> => {
  // Fetch user from database (mocked)
  const user: User = { id: '1', username: 'test', email: 'test@example.com', passwordHash: '$2b$10$...', role: 'User', createdAt: new Date(), updatedAt: new Date() };
  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isPasswordValid) throw new Error('Invalid credentials');
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
};

export const refreshUserToken = async (data: RefreshRequest): Promise<{ token: string }> => {
  // Validate and refresh token (mocked)
  const token = jwt.sign({ userId: data.userId, role: 'User' }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
};

export const invalidateUserSession = async (data: LogoutRequest): Promise<void> => {
  // Invalidate session (mocked)
};