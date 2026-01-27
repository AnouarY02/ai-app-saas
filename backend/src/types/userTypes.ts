export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListUsersRequest {
  page?: number;
  limit?: number;
}

export interface UpdateUserRequest {
  id: string;
  username: string;
  email: string;
}

export interface PartialUpdateUserRequest {
  id: string;
  username?: string;
  email?: string;
}

export interface UserResponse {
  user: User;
}

export interface ListUsersResponse {
  users: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}