import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/features/auth/server';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(user);
}
