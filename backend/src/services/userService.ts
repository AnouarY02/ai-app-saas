import { db } from '../db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { signJwt } from './authService';
import { User, UpdateUserRequest } from '../types';

export const userService = {
  async signup(email: string, password: string, name?: string) {
    const existing = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    if (existing) {
      const error = new Error('Email already in use');
      (error as any).status = 409;
      throw error;
    }
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    const now = new Date();
    const user = await db.one(
      'INSERT INTO users (id, email, password_hash, name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $5) RETURNING id, email, name, created_at, updated_at',
      [id, email, hash, name || '', now, now]
    );
    const token = signJwt({ id: user.id, email: user.email });
    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    if (!user) {
      const error = new Error('Invalid credentials');
      (error as any).status = 401;
      throw error;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      const error = new Error('Invalid credentials');
      (error as any).status = 401;
      throw error;
    }
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    const token = signJwt({ id: user.id, email: user.email });
    return { user: safeUser, token };
  },

  async logout(token: string) {
    // Stateless JWT: nothing to do unless using a blacklist
    return;
  },

  async getById(id: string) {
    const user = await db.oneOrNone('SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1', [id]);
    if (!user) {
      const error = new Error('User not found');
      (error as any).status = 404;
      throw error;
    }
    return user;
  },

  async update(id: string, data: UpdateUserRequest) {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
    if (!user) {
      const error = new Error('User not found');
      (error as any).status = 404;
      throw error;
    }
    let newEmail = user.email;
    let newName = user.name;
    let newPasswordHash = user.password_hash;
    if (data.email && data.email !== user.email) {
      const exists = await db.oneOrNone('SELECT 1 FROM users WHERE email = $1', [data.email]);
      if (exists) {
        const error = new Error('Email already in use');
        (error as any).status = 409;
        throw error;
      }
      newEmail = data.email;
    }
    if (data.name) newName = data.name;
    if (data.password) newPasswordHash = await bcrypt.hash(data.password, 10);
    const updated = await db.one(
      'UPDATE users SET email = $1, name = $2, password_hash = $3, updated_at = $4 WHERE id = $5 RETURNING id, email, name, created_at, updated_at',
      [newEmail, newName, newPasswordHash, new Date(), id]
    );
    return updated;
  }
};
