import { User, UserProfile } from '../types/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// In-memory user store for demo (replace with DB in production)
const users: User[] = [
  {
    id: uuidv4(),
    email: 'user@example.com',
    hashed_password: bcrypt.hashSync('password123', 10),
    full_name: 'Test User',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find(u => u.email === email);
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find(u => u.id === id);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
