export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculatePagination = (total: number, page: number, limit: number) => {
  const pages = Math.ceil(total / limit);
  return { page, limit, total, pages };
};