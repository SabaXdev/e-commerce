export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiValidationError = {
  property: string;
  constraints: Record<string, string>;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string | string[] | ApiValidationError[];
  error?: string;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorCode?: string;

  constructor(statusCode: number, message: string, errorCode?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
