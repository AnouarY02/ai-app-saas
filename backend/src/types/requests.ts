export interface LoginRequest {
  email: string;
  password: string;
}

export interface ContactCreateRequest {
  name: string;
  email: string;
  phone: string;
}

export interface ContactUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface DealCreateRequest {
  title: string;
  value: number;
  stage: string;
}

export interface DealUpdateRequest {
  title?: string;
  value?: number;
  stage?: string;
}
