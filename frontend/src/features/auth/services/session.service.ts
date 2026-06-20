import { cookies } from 'next/headers';
import { env } from '@/shared/config/env';
import type { AuthenticatedUser, Session } from '../types/auth.types';

export async function getAccessTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(env.JWT_COOKIE_NAME)?.value;
}

export async function getSession(): Promise<Session | null> {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return null;
  }

  const { verifyAccessToken } = await import('./verify-token.service');
  const payload = await verifyAccessToken(accessToken);

  if (!payload) {
    return null;
  }

  return {
    accessToken,
    user: {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    },
  };
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const accessToken = await getAccessTokenFromCookies();

  if (!accessToken) {
    return null;
  }

  try {
    const { getMeRequest } = await import('../api/auth.api');
    return await getMeRequest(accessToken);
  } catch {
    return null;
  }
}

export function buildAuthCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

export { verifyAccessToken } from './verify-token.service';
