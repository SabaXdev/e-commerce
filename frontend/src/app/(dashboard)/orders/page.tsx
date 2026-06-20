'use client';

import { OrderCard, useMyOrders } from '@/features/orders';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { Spinner } from '@/shared/components/feedback/Spinner';

export default function OrdersPage() {
  const ordersQuery = useMyOrders();

  return (
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">My orders</h1>
      <p className="mt-2 text-zinc-600">Track the status of your recent purchases.</p>

      <div className="mt-8 space-y-4">
        {ordersQuery.isLoading ? <Spinner label="Loading orders..." /> : null}
        {ordersQuery.isError ? <ErrorState message={ordersQuery.error.message} /> : null}
        {ordersQuery.data && !ordersQuery.data.data.length ? (
          <EmptyState title="No orders yet" description="Place your first order from checkout." />
        ) : null}
        {ordersQuery.data?.data.map((orderWithItems) => (
          <OrderCard key={orderWithItems.order.id} orderWithItems={orderWithItems} />
        ))}
      </div>
    </section>
  );
}
