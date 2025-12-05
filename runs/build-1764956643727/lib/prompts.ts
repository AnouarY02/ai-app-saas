import { getCurrentUser } from './auth';
import { promptsStore } from './store';

export async function getPrompts() {
  const user = await getCurrentUser();
  if (!user) return [];
  return promptsStore.findByUserId(user.id);
}

