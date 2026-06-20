import Link from 'next/link';
import { AppRoute } from '@/shared/constants/app-routes.enum';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h2 className="text-2xl font-semibold text-zinc-900">Page not found</h2>
      <p className="mt-2 text-sm text-zinc-600">The page you requested does not exist.</p>
      <Link href={AppRoute.Home} className="mt-6 inline-block text-sm font-medium text-zinc-900 underline">
        Go home
      </Link>
    </div>
  );
}
