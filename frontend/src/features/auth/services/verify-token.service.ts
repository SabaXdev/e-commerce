import { jwtVerify } from 'jose';
import { env } from '@/shared/config/env';
import { UserRole } from '@/shared/enums';
import type { JwtPayload } from '../types/auth.types';

export async function verifyAccessToken(token: string): Promise<JwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return {
      sub: String(payload.sub),
      email: String(payload.email),
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}
