export interface ApiStatus {
  ok: boolean;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  status: number;
}
