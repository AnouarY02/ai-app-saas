export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory contacts store
export const contacts: Contact[] = [];
