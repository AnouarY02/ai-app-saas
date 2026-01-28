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

export type RefreshRequest = {
  refreshToken: string;
};

export type LogoutRequest = {
  token: string;
};

export type LogoutResponse = {
  success: boolean;
};

export type ListTasksRequest = {
  page: number;
  limit: number;
};

export type ListTasksResponse = PaginatedResponse<Task>;

export type GetTaskRequest = {
  id: string;
};

export type TaskResponse = ApiResponse<Task>;

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

export type UpdateTaskRequest = {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
};

export type PartialUpdateTaskRequest = Partial<UpdateTaskRequest>;

export type DeleteTaskRequest = {
  id: string;
};

export type DeleteTaskResponse = {
  success: boolean;
};