import { v4 as uuidv4 } from 'uuid';
import { Contact, ContactCreate, ContactUpdate, PaginatedResult } from '../types/entities';

let contacts: Contact[] = [];

export async function listContacts({ userId, search = '', page = 1, pageSize = 20 }: { userId: string; search?: string; page?: number; pageSize?: number; }): Promise<PaginatedResult<Contact>> {
  let filtered = contacts.filter((c) => c.userId === userId);
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s));
  }
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  return {
    items: paged,
    total,
    page,
    pageSize,
  };
}

export async function createContact(data: ContactCreate & { userId: string }): Promise<Contact> {
  const now = new Date();
  const contact: Contact = {
    id: uuidv4(),
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  contacts.push(contact);
  return contact;
}

export async function getContactById(id: string, userId: string): Promise<Contact | undefined> {
  return contacts.find((c) => c.id === id && c.userId === userId);
}

export async function updateContact(id: string, userId: string, update: ContactUpdate): Promise<Contact | undefined> {
  const idx = contacts.findIndex((c) => c.id === id && c.userId === userId);
  if (idx === -1) return undefined;
  contacts[idx] = {
    ...contacts[idx],
    ...update,
    updatedAt: new Date(),
  };
  return contacts[idx];
}

export async function deleteContact(id: string, userId: string): Promise<boolean> {
  const idx = contacts.findIndex((c) => c.id === id && c.userId === userId);
  if (idx === -1) return false;
  contacts.splice(idx, 1);
  return true;
}

export async function countContacts(userId: string): Promise<number> {
  return contacts.filter((c) => c.userId === userId).length;
}
