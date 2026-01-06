// shared/src/api/types.ts
import type { User } from '../types/user';
import type { Session } from '../types/session';
import type { AIRequest, AIRequestStatus } from '../types/aiRequest';
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  UpdateSettingsRequest,
  PaginatedResult,
  AIRequestCreate,
} from '../types/api';
import type { APIError } from '../types/error';

export type {
  User,
  Session,
  AIRequest,
  AIRequestStatus,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  UpdateSettingsRequest,
  PaginatedResult,
  AIRequestCreate,
  APIError,
};
