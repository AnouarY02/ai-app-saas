export interface User {
  id: string;
  email: string;
  hashed_password: string;
  full_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}
