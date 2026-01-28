import bcrypt from 'bcrypt';

export const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User'
};

export const users = new Map();

const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
users.set(TEST_USER.email, {
  id: '1',
  email: TEST_USER.email,
  name: TEST_USER.name,
  passwordHash: hashedPassword,
  createdAt: new Date().toISOString()
});