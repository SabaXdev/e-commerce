import axios, { type AxiosInstance } from 'axios';
import { env } from '@/shared/config/env';
import { attachAuthInterceptor } from './interceptors/auth.interceptor';
import { onResponseError, onResponseSuccess } from './interceptors/error.interceptor';

function resolveBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '/api/proxy';
  }

  return env.NESTJS_API_URL;
}

export function createApiClient(accessToken?: string): AxiosInstance {
  const client = axios.create({
    baseURL: resolveBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => attachAuthInterceptor(config, accessToken));
  client.interceptors.response.use(onResponseSuccess, onResponseError);

  return client;
}

export const apiClient = createApiClient();
