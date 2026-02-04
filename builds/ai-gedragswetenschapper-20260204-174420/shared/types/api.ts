export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = AuthResponse;

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type RegisterResponse = UserResponse;

export type GetUserResponse = UserResponse;

export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type UpdateUserRequest = Partial<CreateUserRequest>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};