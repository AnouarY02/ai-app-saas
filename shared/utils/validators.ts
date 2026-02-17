export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try { new URL(url); return true; } catch { return false; }
};

export const validateRequired = (value: any, name: string): string | null => {
  if (!value) return `${name} is required`;
  return null;
};
