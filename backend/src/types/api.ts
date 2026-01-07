export type ApiStatus = {
  ok: boolean;
  timestamp: string;
};

export type AppConfig = {
  port: number;
  env: string;
  logLevel?: string;
};
