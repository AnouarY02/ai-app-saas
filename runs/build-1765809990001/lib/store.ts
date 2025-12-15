// In-memory stores (MVP, vervang door DB in productie)

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface Court {
  id: string;
  name: string;
  location: string;
  active: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  courtId: string;
  startTime: Date;
  endTime: Date;
  status: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  status: string;
  createdAt: Date;
}

export const usersStore: User[] = [];
export const courtsStore: Court[] = [];
export const reservationsStore: Reservation[] = [];
export const paymentsStore: Payment[] = [];

