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
};

export type UpdateTaskRequest = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type PartialUpdateTaskRequest = Partial<UpdateTaskRequest>;

export type DeleteTaskRequest = {
  id: string;
};

export type TaskResponse = ApiResponse<Task>;

export type ListTasksResponse = PaginatedResponse<Task>;

export type SuccessResponse = ApiResponse<{}>;