export interface User {
  id: string;
  email: string;
  hashed_password: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfileUpdate {
  full_name?: string;
}
