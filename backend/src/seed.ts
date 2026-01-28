import bcrypt from 'bcrypt';

export const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User'
};

// In-memory storage (or DB if you implement it)
export const users = new Map();

// Hash password and store test user on startup
export async function seedTestUser() {
  const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
  users.set(TEST_USER.email, {
    id: '1',
    email: TEST_USER.email,
    name: TEST_USER.name,
    passwordHash: hashedPassword,
    createdAt: new Date().toISOString()
  });
}