export type User = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WeatherData = {
  id: string;
  userId: string;
  location: string;
  temperature: number;
  condition: string;
  retrievedAt: Date;
};