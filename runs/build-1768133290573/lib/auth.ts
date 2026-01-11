import { cookies } from 'next/headers';
import { findUserById } from './user-store';

const SESSION_COOKIE = 'session_user_id';

export function setSessionCookie(res: any, userId: string) {
  res.cookies.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dagen
  });
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
}

export async function getSessionUser() {
  const userId = cookies().get(SESSION_COOKIE)?.value;
  if (!userId) return null;
  return findUserById(userId) || null;
}

