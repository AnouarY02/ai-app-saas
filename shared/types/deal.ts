// Deal domain types
export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DealCreate {
  title: string;
  value: number;
  stage: string;
  contactId: string;
}

export interface DealUpdate {
  title?: string;
  value?: number;
  stage?: string;
  contactId?: string;
}
