export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = AuthResponse;

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = AuthResponse;

export type GetUserResponse = User;

export type CreateUserRequest = RegisterRequest;

export type UpdateUserRequest = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ListTasksResponse = PaginatedResponse<Task>;

export type TaskResponse = ApiResponse<Task>;

export type CreateTaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type PartialUpdateTaskRequest = Partial<CreateTaskRequest>;

export type DeleteTaskRequest = { id: string; };

export type RefreshTokenRequest = { token: string; };

export type LogoutRequest = { token: string; };