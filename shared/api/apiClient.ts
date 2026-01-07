// Typed API client for frontend (uses axios)
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  UserPublic,
  Contact,
  ContactCreate,
  ContactUpdate,
  Deal,
  DealCreate,
  DealUpdate,
  PaginatedResult,
  DashboardMetrics,
  LoginRequest,
  AuthResponse,
  SuccessResponse,
  QueryParams,
  PathParams,
} from '../types/entities';

const API_BASE = process.env.BACKEND_URL || '/api';

function getApiInstance(): AxiosInstance {
  return axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });
}

const api = getApiInstance();

export const apiClient = {
  // Auth
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data).then(r => r.data),
  logout: () => api.post<SuccessResponse>('/auth/logout').then(r => r.data),
  me: () => api.get<UserPublic>('/auth/me').then(r => r.data),

  // Contacts
  listContacts: (params?: QueryParams) => api.get<PaginatedResult<Contact>>('/contacts', { params }).then(r => r.data),
  createContact: (data: ContactCreate) => api.post<Contact>('/contacts', data).then(r => r.data),
  getContact: (id: string) => api.get<Contact>(`/contacts/${id}`).then(r => r.data),
  updateContact: (id: string, data: ContactUpdate) => api.put<Contact>(`/contacts/${id}`, data).then(r => r.data),
  deleteContact: (id: string) => api.delete<SuccessResponse>(`/contacts/${id}`).then(r => r.data),

  // Deals
  listDeals: (params?: QueryParams) => api.get<PaginatedResult<Deal>>('/deals', { params }).then(r => r.data),
  createDeal: (data: DealCreate) => api.post<Deal>('/deals', data).then(r => r.data),
  getDeal: (id: string) => api.get<Deal>(`/deals/${id}`).then(r => r.data),
  updateDeal: (id: string, data: DealUpdate) => api.put<Deal>(`/deals/${id}`, data).then(r => r.data),
  deleteDeal: (id: string) => api.delete<SuccessResponse>(`/deals/${id}`).then(r => r.data),

  // Dashboard
  getDashboardMetrics: () => api.get<DashboardMetrics>('/dashboard/metrics').then(r => r.data),
};
