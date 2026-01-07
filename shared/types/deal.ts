// Deal entity types
export interface Deal {
  id: string;
  userId: string;
  title: string;
  value: number;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

export interface DealCreateRequest {
  title: string;
  value: number;
  stage: string;
}

export interface DealUpdateRequest {
  title?: string;
  value?: number;
  stage?: string;
}
