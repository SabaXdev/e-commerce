'use client';

import Link from 'next/link';
import { AuthActions, GuestActions, useCurrentUser } from '@/features/auth';
import { CartButton } from '@/features/cart';
import { Header } from '@/shared/components/layout/Header';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { Spinner } from '@/shared/components/feedback/Spinner';

export function ShopHeader() {
  const currentUserQuery = useCurrentUser();

  return (
    <Header
      navSlot={
        <nav className="flex items-center gap-4 text-sm text-zinc-600">
          <Link href={AppRoute.Products} className="hover:text-zinc-900">
            Products
          </Link>
        </nav>
      }
      actionsSlot={
        currentUserQuery.isLoading ? (
          <Spinner label="" />
        ) : currentUserQuery.data ? (
          <>
            <CartButton />
            <AuthActions />
          </>
        ) : (
          <>
            <CartButton />
            <GuestActions />
          </>
        )
      }
    />
  );
}
