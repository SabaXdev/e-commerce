import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';
import { AppRoute } from '@/shared/constants/app-routes.enum';

export default function HomePage() {
  return (
    <section className="rounded-2xl bg-white p-10 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Portfolio storefront
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900">
        A scalable e-commerce frontend built with Next.js and feature modules.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Browse products, manage your cart, place orders, and explore the admin panel.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href={AppRoute.Products}>
          <Button size="lg">Browse products</Button>
        </Link>
        <Link href={AppRoute.Login}>
          <Button size="lg" variant="secondary">
            Sign in
          </Button>
        </Link>
      </div>
    </section>
  );
}
