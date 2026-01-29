export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WeatherData = {
  id: string;
  userId: string;
  location: string;
  temperature: number;
  condition: string;
  forecast: any; // JSON type
  createdAt: Date;
};