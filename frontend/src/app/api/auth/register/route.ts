import { NextResponse } from 'next/server';
import { registerRequest } from '@/features/auth/api/auth.api';
import { registerSchema } from '@/features/auth/schemas/register.schema';
import { ApiError } from '@/shared/api/types/api-error.types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = registerSchema.parse(body);
    const user = await registerRequest(payload);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'Registration failed';
    const status = error instanceof ApiError ? error.statusCode : 400;

    return NextResponse.json({ message }, { status });
  }
}
