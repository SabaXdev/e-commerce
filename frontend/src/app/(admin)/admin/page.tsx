import { Card } from '@/shared/components/ui/Card';
import { AdminRoute } from '@/features/admin';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';

export default function AdminHomePage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">Admin dashboard</h1>
      <p className="mt-2 text-zinc-600">Manage products and order fulfillment.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-zinc-900">Products</h2>
          <p className="mt-2 text-sm text-zinc-600">Create, update, and remove catalog items.</p>
          <Link href={AdminRoute.Products} className="mt-4 inline-block">
            <Button size="sm">Manage products</Button>
          </Link>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-zinc-900">Orders</h2>
          <p className="mt-2 text-sm text-zinc-600">Review customer orders and update statuses.</p>
          <Link href={AdminRoute.Orders} className="mt-4 inline-block">
            <Button size="sm">Manage orders</Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}
