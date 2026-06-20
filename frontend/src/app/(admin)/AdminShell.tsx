'use client';

import Link from 'next/link';
import { AuthActions } from '@/features/auth';
import { AdminSidebar } from '@/features/admin';
import { Header } from '@/shared/components/layout/Header';
import { Container } from '@/shared/components/layout/Container';
import { AppRoute } from '@/shared/constants/app-routes.enum';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        navSlot={
          <Link href={AppRoute.Home} className="text-sm text-zinc-600 hover:text-zinc-900">
            Back to shop
          </Link>
        }
        actionsSlot={<AuthActions />}
      />
      <main className="flex-1 py-8">
        <Container className="flex flex-col gap-6 lg:flex-row">
          <AdminSidebar />
          <div className="flex-1">{children}</div>
        </Container>
      </main>
    </>
  );
}
