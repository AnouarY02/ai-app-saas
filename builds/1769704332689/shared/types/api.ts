export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = User;

export type GetUserResponse = User;

export type CreateUserRequest = RegisterRequest;

export type UpdateUserRequest = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export type WeatherDataResponse = WeatherData;

export type WeatherDataListResponse = PaginatedResponse<WeatherData>;

export type CreateWeatherDataRequest = Omit<WeatherData, 'id' | 'createdAt'>;

export type UpdateWeatherDataRequest = Partial<CreateWeatherDataRequest>;

export type DeleteWeatherDataResponse = {};