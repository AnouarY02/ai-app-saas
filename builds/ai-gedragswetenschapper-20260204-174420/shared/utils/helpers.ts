export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};