import { cookies } from 'next/headers';
import { getUserFromSession } from './session';

export async function getCurrentUser() {
  const sessionId = cookies().get('session')?.value;
  return getUserFromSession(sessionId);
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Niet ingelogd');
  }
  return user;
}

