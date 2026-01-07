import { User, UserPublic } from '../types/entities';

export function toUserPublic(user: User): UserPublic {
  const { id, email, name, createdAt, updatedAt } = user;
  return { id, email, name, createdAt, updatedAt };
}
