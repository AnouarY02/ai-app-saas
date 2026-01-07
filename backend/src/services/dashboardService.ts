import { User } from '../types/entities';
import { users } from '../data/inMemoryDb';

const getDashboardData = async (userId: string) => {
  // Example: return some dashboard data
  const user = users.find(u => u.id === userId);
  return {
    welcomeMessage: user ? `Welcome, ${user.name}!` : 'Welcome!',
    stats: {
      projects: 3,
      lastLogin: user ? user.updatedAt : new Date().toISOString()
    }
  };
};

export default { getDashboardData };
