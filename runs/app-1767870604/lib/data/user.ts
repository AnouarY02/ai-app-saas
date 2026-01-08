import store from './store';
import { User } from '../types';

export function findUserByEmail(email: string): User | undefined {
  return store.users.find(u => u.email === email);
}

export function findUserById(id: string): User | undefined {
  return store.users.find(u => u.id === id);
}

export function createUser(user: User): void {
  store.users.push(user);
}

