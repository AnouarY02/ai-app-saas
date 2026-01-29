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

export type UpdateUserRequest = Partial<User>;

export type ListTasksRequest = {
  page: number;
  limit: number;
};

export type ListTasksResponse = PaginatedResponse<Task>;

export type GetTaskRequest = {
  id: string;
};

export type TaskResponse = Task;

export type CreateTaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type PartialUpdateTaskRequest = Partial<CreateTaskRequest>;

export type DeleteTaskRequest = {
  id: string;
};

export type DeleteTaskResponse = {
  success: boolean;
};