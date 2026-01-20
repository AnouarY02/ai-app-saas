// shared/types/api.ts

export interface SuccessResponse {
  success: true;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
}
