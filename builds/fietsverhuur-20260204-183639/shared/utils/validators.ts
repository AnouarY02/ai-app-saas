export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
};

export const validateMinLength = (value: string, min: number, fieldName: string): string | null => {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return null;
};

export const validateMaxLength = (value: string, max: number, fieldName: string): string | null => {
  if (value.length > max) {
    return `${fieldName} must be at most ${max} characters`;
  }
  return null;
};
