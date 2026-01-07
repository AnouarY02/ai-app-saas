export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  id: string;
  userId: string;
  title: string;
  value: number;
  stage: string;
  createdAt: Date;
  updatedAt: Date;
}
