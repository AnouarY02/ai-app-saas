export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory deals store
export const deals: Deal[] = [];
