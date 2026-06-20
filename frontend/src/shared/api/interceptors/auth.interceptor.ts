import type { InternalAxiosRequestConfig } from 'axios';

export function attachAuthInterceptor(
  config: InternalAxiosRequestConfig,
  accessToken?: string,
): InternalAxiosRequestConfig {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}
