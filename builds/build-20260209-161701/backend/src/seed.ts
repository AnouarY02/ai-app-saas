import bcrypt from 'bcrypt';
import { userStore } from '@/models/UserModel';

async function seed() {
  const passwordHash = await bcrypt.hash('password123', 10);
  userStore.set('test-user-id', {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    passwordHash,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  console.log('Seed data added');
}

seed();
