// shared/src/types/aiRequest.ts

export type AIRequestStatus = 'pending' | 'completed' | 'failed';

export interface AIRequest {
  id: string;
  userId: string;
  input: string;
  output: string;
  status: AIRequestStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
