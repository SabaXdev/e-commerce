'use client';

import Link from 'next/link';
import { use } from 'react';
import { OrderCard } from '@/features/orders';
import { useOrder } from '@/features/orders';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { Spinner } from '@/shared/components/feedback/Spinner';
import { Button } from '@/shared/components/ui/Button';
import { AppRoute } from '@/shared/constants/app-routes.enum';

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const orderQuery = useOrder(id);

  if (orderQuery.isLoading) {
    return <Spinner label="Loading order..." />;
  }

  if (orderQuery.isError || !orderQuery.data) {
    return <ErrorState message={orderQuery.error?.message ?? 'Order not found'} />;
  }

  return (
    <section>
      <Link href={AppRoute.Orders}>
        <Button variant="ghost" size="sm">
          Back to orders
        </Button>
      </Link>
      <div className="mt-6">
        <OrderCard orderWithItems={orderQuery.data} />
      </div>
    </section>
  );
}
