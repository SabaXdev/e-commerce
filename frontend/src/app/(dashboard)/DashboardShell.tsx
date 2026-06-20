'use client';

import Link from 'next/link';
import { AuthActions } from '@/features/auth';
import { Header } from '@/shared/components/layout/Header';
import { Container } from '@/shared/components/layout/Container';
import { AppRoute } from '@/shared/constants/app-routes.enum';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        navSlot={
          <nav className="flex items-center gap-4 text-sm text-zinc-600">
            <Link href={AppRoute.Orders}>Orders</Link>
            <Link href={AppRoute.Checkout}>Checkout</Link>
            <Link href={AppRoute.Account}>Account</Link>
          </nav>
        }
        actionsSlot={<AuthActions />}
      />
      <main className="flex-1 py-8">
        <Container>{children}</Container>
      </main>
    </>
  );
}
