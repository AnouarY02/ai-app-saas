import { users } from '../data/inMemoryDb';
import { UserPublic } from '../types/entities';
import { toUserPublic } from '../utils/transform';

const getUserPublicById = async (id: string): Promise<UserPublic | null> => {
  const user = users.find(u => u.id === id);
  return user ? toUserPublic(user) : null;
};

export default { getUserPublicById };
