// Shared booking types and enums
import { BookingStatus } from './bookingStatus';

export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  startTime: string; // ISO Date
  endTime: string; // ISO Date
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
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
    from: string;
    to: string;
  };
}
