// Pagination and query types
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  [key: string]: any;
}

export interface PathParams {
  id: string;
}
