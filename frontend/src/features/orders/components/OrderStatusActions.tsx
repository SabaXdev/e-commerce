'use client';

import { OrderStatus } from '@/shared/enums';
import { Button } from '@/shared/components/ui/Button';
import { useUpdateOrderStatus } from '../hooks/useOrderMutations';

const adminTransitions: Partial<Record<OrderStatus, OrderStatus[]>> = {
  [OrderStatus.Pending]: [OrderStatus.Confirmed, OrderStatus.Cancelled],
  [OrderStatus.Confirmed]: [OrderStatus.Processing, OrderStatus.Cancelled],
  [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
  [OrderStatus.Shipped]: [OrderStatus.Delivered],
};

type OrderStatusActionsProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

export function OrderStatusActions({ orderId, currentStatus }: OrderStatusActionsProps) {
  const updateStatusMutation = useUpdateOrderStatus(orderId);
  const nextStatuses = adminTransitions[currentStatus] ?? [];

  if (!nextStatuses.length) {
    return <p className="text-sm text-zinc-500">No further status changes available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {nextStatuses.map((status) => (
        <Button
          key={status}
          size="sm"
          variant={status === OrderStatus.Cancelled ? 'danger' : 'secondary'}
          disabled={updateStatusMutation.isPending}
          onClick={() => updateStatusMutation.mutate({ status })}
        >
          Mark as {status}
        </Button>
      ))}
    </div>
  );
}
