// UserSettings entity type
export interface UserSettings {
  id: string;
  userId: string;
  settings: Record<string, unknown>;
  updatedAt: string;
}
