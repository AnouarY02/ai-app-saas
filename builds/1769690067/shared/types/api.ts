export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = AuthResponse;

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = AuthResponse;

export type GetUserResponse = ApiResponse<User>;

export type CreateUserRequest = RegisterRequest;

export type UpdateUserRequest = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export type ListTasksResponse = PaginatedResponse<Task>;

export type TaskResponse = ApiResponse<Task>;

export type CreateTaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type PartialUpdateTaskRequest = Partial<CreateTaskRequest>;

export type DeleteTaskRequest = { id: string; };