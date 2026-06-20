'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { AdminRoute } from '../constants/admin-routes.enum';

const links = [
  { href: AdminRoute.Home, label: 'Overview' },
  { href: AdminRoute.Products, label: 'Products' },
  { href: AdminRoute.Orders, label: 'Orders' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white p-4">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Admin
      </p>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-lg px-3 py-2 text-sm font-medium transition',
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-700 hover:bg-zinc-100',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
