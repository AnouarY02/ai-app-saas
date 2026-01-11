import { v4 as uuidv4 } from 'uuid';

export type Club = {
  id: string;
  name: string;
  address?: string;
};

export type Member = {
  id: string;
  clubId: string;
  name: string;
  email: string;
  walletBalance: number;
};

export type Court = {
  id: string;
  clubId: string;
  name: string;
};

export type Booking = {
  id: string;
  clubId: string;
  courtId: string;
  memberId: string;
  startTime: string;
  endTime: string;
};

class Store {
  clubs: Club[] = [];
  members: Member[] = [];
  courts: Court[] = [];
  bookings: Booking[] = [];

  // CLUBS
  getClubs() {
    return this.clubs;
  }
  getClub(id: string) {
    return this.clubs.find(c => c.id === id) || null;
  }
  addClub(data: Omit<Club, 'id'>) {
    const club: Club = { id: uuidv4(), ...data };
    this.clubs.push(club);
    return club;
  }
  updateClub(id: string, data: Partial<Omit<Club, 'id'>>) {
    const club = this.getClub(id);
    if (!club) return null;
    Object.assign(club, data);
    return club;
  }
  deleteClub(id: string) {
    this.clubs = this.clubs.filter(c => c.id !== id);
    this.members = this.members.filter(m => m.clubId !== id);
    this.courts = this.courts.filter(c => c.clubId !== id);
    this.bookings = this.bookings.filter(b => b.clubId !== id);
    return true;
  }

  // MEMBERS
  getMembers(clubId: string) {
    return this.members.filter(m => m.clubId === clubId);
  }
  getMember(clubId: string, memberId: string) {
    return this.members.find(m => m.clubId === clubId && m.id === memberId) || null;
  }
  addMember(data: Omit<Member, 'id'>) {
    const member: Member = { id: uuidv4(), ...data };
    this.members.push(member);
    return member;
  }
  updateMember(clubId: string, memberId: string, data: Partial<Omit<Member, 'id' | 'clubId'>>) {
    const member = this.getMember(clubId, memberId);
    if (!member) return null;
    Object.assign(member, data);
    return member;
  }
  deleteMember(clubId: string, memberId: string) {
    this.members = this.members.filter(m => !(m.clubId === clubId && m.id === memberId));
    this.bookings = this.bookings.filter(b => b.memberId !== memberId);
    return true;
  }

  // COURTS
  getCourts(clubId: string) {
    return this.courts.filter(c => c.clubId === clubId);
  }
  getCourt(clubId: string, courtId: string) {
    return this.courts.find(c => c.clubId === clubId && c.id === courtId) || null;
  }
  addCourt(data: Omit<Court, 'id'>) {
    const court: Court = { id: uuidv4(), ...data };
    this.courts.push(court);
    return court;
  }
  updateCourt(clubId: string, courtId: string, data: Partial<Omit<Court, 'id' | 'clubId'>>) {
    const court = this.getCourt(clubId, courtId);
    if (!court) return null;
    Object.assign(court, data);
    return court;
  }
  deleteCourt(clubId: string, courtId: string) {
    this.courts = this.courts.filter(c => !(c.clubId === clubId && c.id === courtId));
    this.bookings = this.bookings.filter(b => b.courtId !== courtId);
    return true;
  }

  // BOOKINGS
  getBookings(clubId: string) {
    return this.bookings.filter(b => b.clubId === clubId);
  }
  getBooking(clubId: string, bookingId: string) {
    return this.bookings.find(b => b.clubId === clubId && b.id === bookingId) || null;
  }
  addBooking(data: Omit<Booking, 'id'>) {
    const booking: Booking = { id: uuidv4(), ...data };
    this.bookings.push(booking);
    return booking;
  }
  updateBooking(clubId: string, bookingId: string, data: Partial<Omit<Booking, 'id' | 'clubId'>>) {
    const booking = this.getBooking(clubId, bookingId);
    if (!booking) return null;
    Object.assign(booking, data);
    return booking;
  }
  deleteBooking(clubId: string, bookingId: string) {
    this.bookings = this.bookings.filter(b => !(b.clubId === clubId && b.id === bookingId));
    return true;
  }
}

let store: Store;
if (!(global as any)._padelStore) {
  (global as any)._padelStore = new Store();
}
store = (global as any)._padelStore;

export default store;

