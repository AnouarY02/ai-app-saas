// Pagination helpers
import type { PaginatedResult } from '../types/pagination';

export function paginate<T>(items: T[], page: number = 1, pageSize: number = 20): PaginatedResult<T> {
  const total = items.length;
  const start = (page - 1) * pageSize;
  const pagedItems = items.slice(start, start + pageSize);
  return {
    items: pagedItems,
    total,
    page,
    pageSize
  };
}
