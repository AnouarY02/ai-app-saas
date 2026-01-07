// shared/src/types/aiInteraction.ts

export interface AIInteraction {
  id: string;
  userId: string;
  input: string;
  output: string;
  createdAt: string; // ISO8601
}
