// Entity and DTO types for SaaS CRM

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface UserPublic {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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

export interface DashboardMetrics {
  totalContacts: number;
  totalDeals: number;
  dealsByStage: Record<string, number>;
  totalDealValue: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface SuccessResponse {
  success: true;
  message?: string;
}

export interface QueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  stage?: string;
  contactId?: string;
}

export interface PathParams {
  id: string;
}
