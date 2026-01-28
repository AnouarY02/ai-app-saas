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

export type RefreshRequest = {
  refreshToken: string;
};

export type LogoutRequest = {};

export type ListTasksRequest = {
  page: number;
  limit: number;
};

export type GetTaskRequest = {
  id: string;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type PartialUpdateTaskRequest = Partial<CreateTaskRequest>;

export type DeleteTaskRequest = {
  id: string;
};

export type AuthResponse = {
  token: string;
  refreshToken: string;
  user: User;
};

export type TaskResponse = {
  task: Task;
};

export type ListTasksResponse = PaginatedResponse<Task>;

export type SuccessResponse = {
  success: boolean;
  message: string;
};