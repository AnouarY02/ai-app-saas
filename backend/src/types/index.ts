export type Role = 'user' | 'admin';
export type BookingStatus = 'active' | 'cancelled' | 'completed';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Court {
  id: string;
  name: string;
  location?: string;
  surfaceType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface DeleteResponse {
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  role?: Role;
}

export interface CreateCourtRequest {
  name: string;
  location?: string;
  surfaceType?: string;
}

export interface UpdateCourtRequest {
  name?: string;
  location?: string;
  surfaceType?: string;
  isActive?: boolean;
}

export interface CreateBookingRequest {
  courtId: string;
  startTime: string;
  endTime: string;
}

export interface UpdateBookingRequest {
  startTime?: string;
  endTime?: string;
  status?: BookingStatus;
}

export interface BookingQuery {
  userId?: string;
  courtId?: string;
  status?: BookingStatus;
  dateRange?: {
    from?: string;
    to?: string;
  };
}
