export interface User {
  id: string;
  email: string;
  passwordHash?: string; // Only on backend
  name: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string; // ISO string
}
