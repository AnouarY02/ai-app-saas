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

export type GetUserResponse = UserResponse;

export type CreateUserRequest = RegisterRequest;

export type UpdateUserRequest = Partial<User>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};