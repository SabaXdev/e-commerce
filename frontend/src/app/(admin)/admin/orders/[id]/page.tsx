'use client';

import Link from 'next/link';
import { use } from 'react';
import { OrderStatusActions, useOrder } from '@/features/orders';
import { AdminRoute } from '@/features/admin';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { Spinner } from '@/shared/components/feedback/Spinner';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { formatCurrency } from '@/shared/utils/format-currency';
import { formatDate } from '@/shared/utils/format-date';

type AdminOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const { id } = use(params);
  const orderQuery = useOrder(id);

  if (orderQuery.isLoading) {
    return <Spinner label="Loading order..." />;
  }

  if (orderQuery.isError || !orderQuery.data) {
    return <ErrorState message={orderQuery.error?.message ?? 'Order not found'} />;
  }

  const { order, items } = orderQuery.data;

  return (
    <section>
      <Link href={AdminRoute.Orders}>
        <Button variant="ghost" size="sm">
          Back to orders
        </Button>
      </Link>

      <Card className="mt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">{formatDate(order.createdAt)}</p>
          </div>
          <Badge>{order.status}</Badge>
        </div>

        <div className="mt-6 space-y-2 text-sm text-zinc-600">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.quantity} x {item.productId.slice(0, 8)}
              </span>
              <span>{formatCurrency(item.unitPrice)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-zinc-100 pt-4">
          <OrderStatusActions orderId={order.id} currentStatus={order.status} />
        </div>
      </Card>
    </section>
  );
}
