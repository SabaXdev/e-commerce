import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromCookies } from '@/features/auth/server';
import { env } from '@/shared/config/env';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const accessToken = await getAccessTokenFromCookies();
  const targetUrl = `${env.NESTJS_API_URL}/${path.join('/')}${request.nextUrl.search}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.text();

  try {
    const response = await axios.request({
      url: targetUrl,
      method: request.method,
      headers,
      data: body,
      validateStatus: () => true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Proxy request failed' }, { status: 502 });
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}
