'use client';

import { useMyOrders } from '@/features/orders';
import { OrderCard } from '@/features/orders';
import { AdminRoute } from '@/features/admin';
import { Spinner } from '@/shared/components/feedback/Spinner';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { EmptyState } from '@/shared/components/feedback/EmptyState';

export default function AdminOrdersPage() {
  const ordersQuery = useMyOrders({ page: 1, limit: 50 });

  return (
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">Orders</h1>
      <p className="mt-2 text-zinc-600">Review and update order statuses.</p>

      <div className="mt-8 space-y-4">
        {ordersQuery.isLoading ? <Spinner label="Loading orders..." /> : null}
        {ordersQuery.isError ? <ErrorState message={ordersQuery.error.message} /> : null}
        {ordersQuery.data && !ordersQuery.data.data.length ? (
          <EmptyState title="No orders yet" />
        ) : null}
        {ordersQuery.data?.data.map((orderWithItems) => (
          <OrderCard
            key={orderWithItems.order.id}
            orderWithItems={orderWithItems}
            href={`${AdminRoute.Orders}/${orderWithItems.order.id}`}
          />
        ))}
      </div>
    </section>
  );
}
