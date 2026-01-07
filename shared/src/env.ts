// Shared environment variable types and helpers

export interface SharedEnv {
  PORT_FRONTEND: string;
  PORT_BACKEND: string;
  NODE_ENV?: 'development' | 'production' | 'test';
  VITE_API_BASE_URL?: string;
}

export function getEnvVar(name: keyof SharedEnv, fallback?: string): string {
  const val = process.env[name as string] || fallback;
  if (!val) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return val;
}
