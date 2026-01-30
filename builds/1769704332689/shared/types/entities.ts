export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

export type WeatherData = {
  id: string;
  userId: string;
  location: string;
  temperature: number;
  humidity: number;
  forecast: any;
  createdAt: string;
};