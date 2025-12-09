import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { SessionModel } from '../models/Session';
import { userService } from './userService';
import { User, UserProfile } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '7d';

export const authService = {
  async login(email: string, password: string): Promise<{ token: string; user: UserProfile }> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    await SessionModel.create({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    return { token, user: userService.toUserProfile(user) };
  },

  async logout(token: string): Promise<void> {
    await SessionModel.deleteByToken(token);
  }
};

