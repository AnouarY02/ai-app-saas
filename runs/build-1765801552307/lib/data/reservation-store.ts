import { v4 as uuidv4 } from 'uuid';

export type Reservation = {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

const reservations: Reservation[] = [];

export function getAllReservations(userId?: string): Reservation[] {
  return userId ? reservations.filter(r => r.userId === userId) : reservations;
}

export function getReservationById(id: string): Reservation | undefined {
  return reservations.find(r => r.id === id);
}

export function createReservation({ userId, courtId, startTime, endTime }: { userId: string; courtId: string; startTime: string; endTime: string }): Reservation {
  const reservation: Reservation = {
    id: uuidv4(),
    userId,
    courtId,
    startTime,
    endTime,
    status: 'pending',
  };
  reservations.push(reservation);
  return reservation;
}

export function updateReservation(id: string, data: Partial<Omit<Reservation, 'id' | 'userId' | 'courtId'>>): Reservation | undefined {
  const reservation = getReservationById(id);
  if (!reservation) return undefined;
  Object.assign(reservation, data);
  return reservation;
}

export function deleteReservation(id: string): boolean {
  const idx = reservations.findIndex(r => r.id === id);
  if (idx === -1) return false;
  reservations.splice(idx, 1);
  return true;
}

