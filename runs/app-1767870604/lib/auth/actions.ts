import { cookies } from 'next/headers';
import { findUserByEmail, createUser } from '../data/user';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function login({ email, password }: { email: string; password: string }) {
  const user = findUserByEmail(email);
  if (!user) {
    return { success: false, error: 'Gebruiker niet gevonden' };
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: 'Ongeldig wachtwoord' };
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  cookies().set('session', token, { httpOnly: true, path: '/' });
  return { success: true };
}

export async function register({ name, email, password }: { name: string; email: string; password: string }) {
  if (findUserByEmail(email)) {
    return { success: false, error: 'E-mail al in gebruik' };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  createUser({
    id: uuidv4(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  });
  return await login({ email, password });
}

export async function logout() {
  cookies().delete('session');
}

