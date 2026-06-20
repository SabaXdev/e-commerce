import { cookies } from 'next/headers';
import { env } from '@/shared/config/env';
import { createApiClient } from './client';

export async function createServerApiClient() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(env.JWT_COOKIE_NAME)?.value;

  return createApiClient(accessToken);
}
