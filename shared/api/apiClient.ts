// shared/api/apiClient.ts
// Isomorphic API client for frontend/backend
import type {
  SignupRequest,
  LoginRequest,
  LogoutRequest,
  UpdateUserRequest,
  AuthResponse,
  SuccessResponse,
  User,
  ApiError
} from '../types/api';
import { API_BASE_PATH, AUTH_ENDPOINTS, USER_ENDPOINTS } from '../utils/constants';

export async function apiSignup(payload: SignupRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_PATH}${AUTH_ENDPOINTS.SIGNUP}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await parseApiError(res);
  return res.json();
}

export async function apiLogin(payload: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_PATH}${AUTH_ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await parseApiError(res);
  return res.json();
}

export async function apiLogout(payload: LogoutRequest): Promise<SuccessResponse> {
  const res = await fetch(`${API_BASE_PATH}${AUTH_ENDPOINTS.LOGOUT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await parseApiError(res);
  return res.json();
}

export async function apiGetMe(token: string): Promise<User> {
  const res = await fetch(`${API_BASE_PATH}${USER_ENDPOINTS.ME}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw await parseApiError(res);
  return res.json();
}

export async function apiUpdateMe(token: string, payload: UpdateUserRequest): Promise<User> {
  const res = await fetch(`${API_BASE_PATH}${USER_ENDPOINTS.ME}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await parseApiError(res);
  return res.json();
}

async function parseApiError(res: Response): Promise<ApiError> {
  let err: ApiError;
  try {
    err = await res.json();
  } catch {
    err = { code: 'INTERNAL_ERROR', message: 'Unknown error' };
  }
  return err;
}
