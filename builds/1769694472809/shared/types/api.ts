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

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ListTasksResponse = PaginatedResponse<Task>;

export type TaskResponse = Task;

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: string;
};

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type PartialUpdateTaskRequest = Partial<CreateTaskRequest>;

export type DeleteTaskResponse = {
  success: boolean;
};