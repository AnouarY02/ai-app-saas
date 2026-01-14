// Minimal API client for frontend/backend shared use
import type { AuthResponse, LoginRequest, SignupRequest, UserPublic, Court, Booking, CreateCourtRequest, UpdateCourtRequest, CreateBookingRequest, UpdateBookingRequest, BookingQuery, DeleteResponse } from '../types';

export class ApiClient {
  constructor(private baseUrl: string, private getToken?: () => string | undefined) {}

  private async request<T>(
    path: string,
    options: RequestInit = {},
    auth = true
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
    if (auth && this.getToken) {
      const token = this.getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new ApiError(res.status, error.message || res.statusText);
    }
    return res.json();
  }

  // Auth
  login(data: LoginRequest): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }, false);
  }
  signup(data: SignupRequest): Promise<AuthResponse> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }, false);
  }
  getSession(): Promise<UserPublic> {
    return this.request('/auth/session');
  }

  // Users
  getMe(): Promise<UserPublic> {
    return this.request('/users/me');
  }
  listUsers(): Promise<UserPublic[]> {
    return this.request('/users');
  }
  updateUser(id: string, data: Partial<{ name: string; role: string }>): Promise<UserPublic> {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
  deleteUser(id: string): Promise<DeleteResponse> {
    return this.request(`/users/${id}`, { method: 'DELETE' });
  }

  // Courts
  listCourts(): Promise<Court[]> {
    return this.request('/courts');
  }
  createCourt(data: CreateCourtRequest): Promise<Court> {
    return this.request('/courts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  updateCourt(id: string, data: UpdateCourtRequest): Promise<Court> {
    return this.request(`/courts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
  deleteCourt(id: string): Promise<DeleteResponse> {
    return this.request(`/courts/${id}`, { method: 'DELETE' });
  }

  // Bookings
  listBookings(query?: BookingQuery): Promise<Booking[]> {
    const params = query ? `?${new URLSearchParams(JSON.parse(JSON.stringify(query)))}` : '';
    return this.request(`/bookings${params}`);
  }
  createBooking(data: CreateBookingRequest): Promise<Booking> {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  updateBooking(id: string, data: UpdateBookingRequest): Promise<Booking> {
    return this.request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
  cancelBooking(id: string): Promise<DeleteResponse> {
    return this.request(`/bookings/${id}`, { method: 'DELETE' });
  }
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
