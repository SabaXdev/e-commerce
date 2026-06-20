import type { AxiosError, AxiosResponse } from 'axios';
import { parseApiError } from '@/shared/utils/parse-api-error';
import type { ApiErrorResponse } from '../types/api-error.types';

export function onResponseSuccess<T>(response: AxiosResponse<T>): AxiosResponse<T> {
  return response;
}

export function onResponseError(error: AxiosError<ApiErrorResponse>): Promise<never> {
  return Promise.reject(parseApiError(error));
}
