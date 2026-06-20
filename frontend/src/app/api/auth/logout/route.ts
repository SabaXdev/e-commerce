import { NextResponse } from 'next/server';
import { env } from '@/shared/config/env';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(env.JWT_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
