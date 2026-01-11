import { v4 as uuidv4 } from 'uuid';

// --- User Store ---
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  credits: number;
}

class UsersStore {
  private users: User[] = [
    { id: 'admin', name: 'Admin', email: 'admin@padel.com', role: 'admin', credits: 100 },
  ];

  getAll() {
    return this.users;
  }
  getById(id: string) {
    return this.users.find(u => u.id === id);
  }
  getByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
  create(user: Omit<User, 'id'> & { id?: string }) {
    const id = user.id || uuidv4();
    const newUser = { ...user, id } as User;
    this.users.push(newUser);
    return newUser;
  }
}

// --- Court Store ---
interface Court {
  id: string;
  name: string;
}

class CourtsStore {
  private courts: Court[] = [
    { id: 'court-1', name: 'Baan 1' },
    { id: 'court-2', name: 'Baan 2' },
  ];

  getAll() {
    return this.courts;
  }
  getById(id: string) {
    return this.courts.find(c => c.id === id);
  }
  create(data: Omit<Court, 'id'> & { id?: string }) {
    const id = data.id || uuidv4();
    const court = { ...data, id } as Court;
    this.courts.push(court);
    return court;
  }
}

// --- Booking Store ---
interface Booking {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
}

class BookingsStore {
  private bookings: Booking[] = [];

  getAll() {
    return this.bookings;
  }
  getByUser(userId: string) {
    return this.bookings.filter(b => b.userId === userId);
  }
  hasConflict(courtId: string, start: string, end: string) {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    return this.bookings.some(b => {
      if (b.courtId !== courtId) return false;
      const bs = new Date(b.startTime).getTime();
      const be = new Date(b.endTime).getTime();
      return (s < be && e > bs);
    });
  }
  create(data: Omit<Booking, 'id'> & { id?: string }) {
    const id = data.id || uuidv4();
    const booking = { ...data, id } as Booking;
    this.bookings.push(booking);
    return booking;
  }
  delete(id: string) {
    const idx = this.bookings.findIndex(b => b.id === id);
    if (idx >= 0) {
      this.bookings.splice(idx, 1);
      return true;
    }
    return false;
  }
}

// --- Credit Transaction Store ---
interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'booking' | 'refund';
  createdAt: string;
}

class CreditsStore {
  private txs: CreditTransaction[] = [];

  getAll() {
    return this.txs;
  }
  getByUser(userId: string) {
    return this.txs.filter(t => t.userId === userId);
  }
  create(data: Omit<CreditTransaction, 'id' | 'createdAt'> & { id?: string; createdAt?: string }) {
    const id = data.id || uuidv4();
    const createdAt = data.createdAt || new Date().toISOString();
    const tx = { ...data, id, createdAt } as CreditTransaction;
    this.txs.push(tx);
    return tx;
  }
}

export const usersStore = new UsersStore();
export const courtsStore = new CourtsStore();
export const bookingsStore = new BookingsStore();
export const creditsStore = new CreditsStore();

