import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { findUserById } from '../data/user';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function getUserFromSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = findUserById(payload.userId);
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email };
  } catch {
    return null;
  }
}

