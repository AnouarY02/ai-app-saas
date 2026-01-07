// Contact entity types
export interface Contact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactCreateRequest {
  name: string;
  email: string;
  phone: string;
}

export interface ContactUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
}
