import { cookies } from 'next/headers';
import { usersStore } from './store';

export async function getCurrentUser() {
  // Mocked: haal user uit cookie/localStorage (voor SSR)
  // In productie: JWT/session
  // Hier: altijd admin als fallback
  const user = usersStore.getById('admin');
  return user;
}

