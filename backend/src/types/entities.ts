export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactCreate {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface ContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DealCreate {
  title: string;
  value: number;
  stage: string;
  contactId: string;
}

export interface DealUpdate {
  title?: string;
  value?: number;
  stage?: string;
  contactId?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
