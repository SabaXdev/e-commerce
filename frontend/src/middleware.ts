import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from '@/features/auth/services/verify-token.service';
import { AuthRoute } from '@/features/auth/constants/auth-routes.enum';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { env } from '@/shared/config/env';
import { UserRole } from '@/shared/enums';

const protectedRoutes = [AppRoute.Orders, AppRoute.Checkout, AppRoute.Account];
const adminRoutes = [AppRoute.AdminHome, AppRoute.AdminProducts, AppRoute.AdminOrders];

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(env.JWT_COOKIE_NAME)?.value;
  const session = accessToken ? await verifyAccessToken(accessToken) : null;

  const isProtected = matchesRoute(pathname, protectedRoutes);
  const isAdmin = matchesRoute(pathname, adminRoutes);
  const isAuthRoute = pathname === AuthRoute.Login || pathname === AuthRoute.Register;

  if ((isProtected || isAdmin) && !session) {
    const loginUrl = new URL(AuthRoute.Login, request.url);
    loginUrl.searchParams.set('redirect', pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (isAdmin && session?.role !== UserRole.Admin) {
    return NextResponse.redirect(new URL(AppRoute.Home, request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(AppRoute.Home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/orders/:path*',
    '/checkout/:path*',
    '/account/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
};
