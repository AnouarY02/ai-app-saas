import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  SessionRequest,
  SessionResponse,
  DashboardRequest,
  DashboardResponse,
  ApiError,
} from '../types';

export class ApiClient {
  constructor(private baseUrl: string = '/api') {}

  async login(data: LoginRequest, config?: AxiosRequestConfig): Promise<LoginResponse> {
    const res = await axios.post<LoginResponse>(`${this.baseUrl}/auth/login`, data, config);
    return res.data;
  }

  async logout(data: LogoutRequest = {}, config?: AxiosRequestConfig): Promise<LogoutResponse> {
    const res = await axios.post<LogoutResponse>(`${this.baseUrl}/auth/logout`, data, config);
    return res.data;
  }

  async getSession(config?: AxiosRequestConfig): Promise<SessionResponse> {
    const res = await axios.get<SessionResponse>(`${this.baseUrl}/auth/session`, config);
    return res.data;
  }

  async getDashboard(config?: AxiosRequestConfig): Promise<DashboardResponse> {
    const res = await axios.get<DashboardResponse>(`${this.baseUrl}/dashboard`, config);
    return res.data;
  }
}

export const apiClient = new ApiClient();
