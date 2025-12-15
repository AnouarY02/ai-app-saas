import { v4 as uuidv4 } from 'uuid';
import { getUserById } from './data/user-store';

const sessions = new Map<string, string>(); // sessionId -> userId

export function createSession(userId: string): string {
  const sessionId = uuidv4();
  sessions.set(sessionId, userId);
  return sessionId;
}

export function getUserIdFromSession(sessionId: string | undefined): string | null {
  if (!sessionId) return null;
  return sessions.get(sessionId) || null;
}

export function destroySession(sessionId: string) {
  sessions.delete(sessionId);
}

export function getUserFromSession(sessionId: string | undefined) {
  const userId = getUserIdFromSession(sessionId);
  if (!userId) return null;
  return getUserById(userId);
}

