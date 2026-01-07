import { User } from '../models/user';

export function getUserPublic(user: User) {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
