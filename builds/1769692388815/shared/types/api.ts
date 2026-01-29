export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = User;

export type GetUserResponse = User;

export type CreateUserRequest = RegisterRequest;

export type UpdateUserRequest = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ListUsersResponse = PaginatedResponse<User>;

export type ListTasksResponse = PaginatedResponse<Task>;

export type TaskResponse = Task;

export type AuthTokenResponse = {
  token: string;
};

export type LogoutResponse = {
  success: boolean;
};