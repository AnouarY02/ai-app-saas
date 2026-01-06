import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  UpdateProfileRequest,
  AuthResponse,
  SuccessResponse,
  UserProfile,
} from '../types';

export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.axios = axios.create({ baseURL });
    if (token) {
      this.setToken(token);
    }
  }

  setToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearToken() {
    delete this.axios.defaults.headers.common['Authorization'];
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await this.axios.post<AuthResponse>('/api/auth/login', data);
    return res.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await this.axios.post<AuthResponse>('/api/auth/register', data);
    return res.data;
  }

  async logout(data: LogoutRequest): Promise<SuccessResponse> {
    const res = await this.axios.post<SuccessResponse>('/api/auth/logout', data);
    return res.data;
  }

  async getProfile(): Promise<UserProfile> {
    const res = await this.axios.get<UserProfile>('/api/users/me');
    return res.data;
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const res = await this.axios.put<UserProfile>('/api/users/me', data);
    return res.data;
  }
}
