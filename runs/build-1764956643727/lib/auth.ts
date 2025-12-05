import { cookies } from 'next/headers';
import { sessionsStore, usersStore } from './store';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('session')?.value;
  if (!sessionId) return null;
  const session = sessionsStore.find(sessionId);
  if (!session) return null;
  const user = usersStore.findById(session.userId);
  if (!user) return null;
  return user;
}

export async function getSessionUser(req: NextRequest) {
  const cookie = req.headers.get('cookie');
  const cookiesObj = cookie ? parse(cookie) : {};
  const sessionId = cookiesObj.session;
  if (!sessionId) return null;
  const session = sessionsStore.find(sessionId);
  if (!session) return null;
  const user = usersStore.findById(session.userId);
  if (!user) return null;
  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    if (typeof window === 'undefined') {
      // Server-side redirect
      throw new Error('Unauthorized');
    }
  }
}

export async function logout() {
  'use server';
  const cookieStore = cookies();
  cookieStore.set('session', '', { path: '/', expires: new Date(0) });
}

