export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculatePages = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};