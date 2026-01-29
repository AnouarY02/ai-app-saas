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

export type CreateUserRequest = {
  email: string;
  password: string;
  role: string;
};

export type UpdateUserRequest = Partial<CreateUserRequest>;

export type ListTasksResponse = PaginatedResponse<Task>;

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type TaskResponse = Task;

export type SuccessResponse = {
  success: boolean;
};