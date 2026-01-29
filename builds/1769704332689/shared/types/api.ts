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

export type GetUserResponse = ApiResponse<User>;

export type CreateUserRequest = RegisterRequest;

export type UpdateUserRequest = Partial<User>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type WeatherDataListResponse = PaginatedResponse<WeatherData>;

export type WeatherDataResponse = ApiResponse<WeatherData>;

export type AuthResponse = {
  token: string;
  user: User;
};

export type SuccessResponse = {
  success: boolean;
};