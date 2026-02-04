export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  name: string;
}

export interface UpdateUserInput {
  email?: string;
  passwordHash?: string;
  name?: string;
}

export const userStore = new Map<string, User>();