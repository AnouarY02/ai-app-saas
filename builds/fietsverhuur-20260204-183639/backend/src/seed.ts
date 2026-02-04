import bcrypt from 'bcrypt';

export const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};

export const users = new Map();

async function initSeed() {
  const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
  users.set(TEST_USER.email, {
    id: '1',
    email: TEST_USER.email,
    name: TEST_USER.name,
    passwordHash: hashedPassword,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log('✓ Test user seeded:', TEST_USER.email);
}

initSeed();