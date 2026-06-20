import { ApiEndpoint } from '@/shared/api/endpoints.enum';
import { apiClient } from '@/shared/api/client';
import type {
  AuthTokenResponse,
  AuthenticatedUser,
  SafeUser,
} from '../types/auth.types';
import type { LoginFormValues } from '../schemas/login.schema';
import type { RegisterFormValues } from '../schemas/register.schema';

export async function loginRequest(credentials: LoginFormValues): Promise<AuthTokenResponse> {
  const { data } = await apiClient.post<AuthTokenResponse>(
    `${ApiEndpoint.Auth}/login`,
    credentials,
  );

  return data;
}

export async function registerRequest(payload: RegisterFormValues): Promise<SafeUser> {
  const { data } = await apiClient.post<SafeUser>(`${ApiEndpoint.Auth}/register`, payload);

  return data;
}

export async function getMeRequest(accessToken?: string): Promise<AuthenticatedUser> {
  const { createApiClient } = await import('@/shared/api/client');
  const client = createApiClient(accessToken);
  const { data } = await client.get<AuthenticatedUser>(`${ApiEndpoint.Auth}/me`);

  return data;
}
