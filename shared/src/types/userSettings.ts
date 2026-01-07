// UserSettings entity
export interface UserSettings {
  id: string;
  userId: string;
  preferences: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
