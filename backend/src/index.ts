import app from './app';
import { seedTestUser } from './seed';

const PORT = process.env.PORT || 4000;

// Seed the test user
seedTestUser();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});