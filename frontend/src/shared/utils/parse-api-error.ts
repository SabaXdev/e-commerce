import type { AxiosError } from 'axios';
import { ApiError, type ApiErrorResponse, type ApiValidationError } from '@/shared/api/types/api-error.types';

export function parseApiError(error: AxiosError<ApiErrorResponse>): ApiError {
  const statusCode = error.response?.status ?? 500;
  const data = error.response?.data;
  const message = normalizeMessage(data?.message) ?? error.message ?? 'Request failed';

  return new ApiError(statusCode, message, data?.error);
}

function normalizeMessage(message: ApiErrorResponse['message'] | undefined): string | undefined {
  if (!message) {
    return undefined;
  }

  if (typeof message === 'string') {
    return message;
  }

  if (Array.isArray(message)) {
    if (message.length === 0) {
      return undefined;
    }

    if (typeof message[0] === 'string') {
      return message.join(', ');
    }

    return (message as ApiValidationError[])
      .map((item) => Object.values(item.constraints).join(', '))
      .join('; ');
  }

  return undefined;
}
