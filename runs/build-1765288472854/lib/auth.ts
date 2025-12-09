import { cookies } from 'next/headers';
import { getUserById } from './data/users';
import { v4 as uuidv4 } from 'uuid';

const sessionStore = new Map<string, string>(); // sessionId -> userId

export async function createSession(userId: string): Promise<string> {
  const sessionId = uuidv4();
  sessionStore.set(sessionId, userId);
  return sessionId;
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('session')?.value;
  if (!sessionId) return null;
  const userId = sessionStore.get(sessionId);
  if (!userId) return null;
  return getUserById(userId);
}

export async function destroySession(sessionId: string) {
  sessionStore.delete(sessionId);
}

