export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: Employee;
  token: string;
};

export type GetUserResponse = Employee;

export type CreateUserRequest = {
  name: string;
  email: string;
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
