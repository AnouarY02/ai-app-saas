export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const calculateAverageTemperature = (temperatures: number[]): number => {
  const total = temperatures.reduce((acc, temp) => acc + temp, 0);
  return total / temperatures.length;
};