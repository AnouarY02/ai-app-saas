// Contact domain types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactCreate {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface ContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}
