import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory user store (replace with DB in production)
export const users: User[] = [
  {
    id: uuidv4(),
    email: 'demo@crm.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
