import { NextResponse } from 'next/server';
import { loginRequest } from '@/features/auth/api/auth.api';
import { buildAuthCookieOptions } from '@/features/auth/server';
import { loginSchema } from '@/features/auth/schemas/login.schema';
import { env } from '@/shared/config/env';
import { ApiError } from '@/shared/api/types/api-error.types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const credentials = loginSchema.parse(body);
    const { accessToken } = await loginRequest(credentials);

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      env.JWT_COOKIE_NAME,
      accessToken,
      buildAuthCookieOptions(env.JWT_COOKIE_MAX_AGE),
    );

    return response;
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Login failed';

    return NextResponse.json({ message }, { status: 401 });
  }
}
