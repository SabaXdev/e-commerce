'use client';

import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { UserRole } from '@/shared/enums';
import { useLogout, useCurrentUser } from '../hooks/useLogin';

export function AuthActions() {
  const logoutMutation = useLogout();
  const currentUserQuery = useCurrentUser();
  const isAdmin = currentUserQuery.data?.role === UserRole.Admin;

  return (
    <div className="flex items-center gap-2">
      {isAdmin ? (
        <Link href={AppRoute.AdminHome}>
          <Button variant="ghost" size="sm">
            Admin
          </Button>
        </Link>
      ) : null}
      <Link href={AppRoute.Orders}>
        <Button variant="ghost" size="sm">
          Orders
        </Button>
      </Link>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
      >
        Sign out
      </Button>
    </div>
  );
}

export function GuestActions() {
  return (
    <div className="flex items-center gap-2">
      <Link href={AppRoute.Login}>
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
      </Link>
      <Link href={AppRoute.Register}>
        <Button size="sm">Register</Button>
      </Link>
    </div>
  );
}
