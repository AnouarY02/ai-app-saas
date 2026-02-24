import { v4 as uuidv4 } from "uuid";

export const userStore = new Map<string, User>();

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "medewerker";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
  role?: "admin" | "medewerker";
  active?: boolean;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: "admin" | "medewerker";
  active?: boolean;
}
