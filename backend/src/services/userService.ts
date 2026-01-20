import { v4 as uuidv4 } from 'uuid';
import { User, UserProfileUpdate } from '../types/user';
import { users } from '../store/inMemoryDb';

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find(u => u.email === email);
}

export async function createUser({ email, hashed_password, full_name }: { email: string, hashed_password: string, full_name: string }): Promise<User> {
  const now = new Date().toISOString();
  const user: User = {
    id: uuidv4(),
    email,
    hashed_password,
    full_name,
    created_at: now,
    updated_at: now
  };
  users.push(user);
  return user;
}

export async function getUserById(userId: string): Promise<User | undefined> {
  return users.find(u => u.id === userId);
}

export async function updateUserProfile(userId: string, update: UserProfileUpdate): Promise<User | undefined> {
  const user = users.find(u => u.id === userId);
  if (!user) return undefined;
  if (update.full_name) user.full_name = update.full_name;
  user.updated_at = new Date().toISOString();
  return user;
}
