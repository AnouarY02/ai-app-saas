// Booking status enum
export type BookingStatus = 'active' | 'cancelled' | 'completed';

export const BookingStatuses = {
  ACTIVE: 'active' as BookingStatus,
  CANCELLED: 'cancelled' as BookingStatus,
  COMPLETED: 'completed' as BookingStatus,
};
