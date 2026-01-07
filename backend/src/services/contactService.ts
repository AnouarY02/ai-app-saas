import { v4 as uuidv4 } from 'uuid';
import { Contact } from '../types/entities';

const contacts: Contact[] = [];

export async function listContacts(userId: string, page: number, pageSize: number, search: string): Promise<{ contacts: Contact[]; total: number }> {
  let filtered = contacts.filter(c => c.userId === userId);
  if (search) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
  }
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  return { contacts: paged, total };
}

export async function createContact(userId: string, data: { name: string; email: string; phone: string }): Promise<Contact> {
  const now = new Date();
  const contact: Contact = {
    id: uuidv4(),
    userId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    createdAt: now,
    updatedAt: now
  };
  contacts.push(contact);
  return contact;
}

export async function getContact(userId: string, id: string): Promise<Contact | undefined> {
  return contacts.find(c => c.id === id && c.userId === userId);
}

export async function updateContact(userId: string, id: string, data: Partial<{ name: string; email: string; phone: string }>): Promise<Contact | undefined> {
  const contact = contacts.find(c => c.id === id && c.userId === userId);
  if (!contact) return undefined;
  if (data.name !== undefined) contact.name = data.name;
  if (data.email !== undefined) contact.email = data.email;
  if (data.phone !== undefined) contact.phone = data.phone;
  contact.updatedAt = new Date();
  return contact;
}

export async function deleteContact(userId: string, id: string): Promise<boolean> {
  const idx = contacts.findIndex(c => c.id === id && c.userId === userId);
  if (idx === -1) return false;
  contacts.splice(idx, 1);
  return true;
}
