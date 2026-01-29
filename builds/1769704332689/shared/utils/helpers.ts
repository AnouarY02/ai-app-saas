export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseJSON = <T>(jsonString: string): T | null => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};