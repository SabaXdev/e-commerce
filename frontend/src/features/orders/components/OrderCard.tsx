import Link from 'next/link';
import { Badge } from '@/shared/components/ui/Badge';
import { Card } from '@/shared/components/ui/Card';
import { OrderStatus } from '@/shared/enums';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { formatCurrency } from '@/shared/utils/format-currency';
import { formatDate } from '@/shared/utils/format-date';
import type { OrderWithItems } from '../types/order.types';

const statusVariantMap: Record<
  OrderStatus,
  'default' | 'success' | 'warning' | 'danger'
> = {
  [OrderStatus.Pending]: 'warning',
  [OrderStatus.Confirmed]: 'default',
  [OrderStatus.Processing]: 'default',
  [OrderStatus.Shipped]: 'success',
  [OrderStatus.Delivered]: 'success',
  [OrderStatus.Cancelled]: 'danger',
};

type OrderCardProps = {
  orderWithItems: OrderWithItems;
  href?: string;
};

export function OrderCard({ orderWithItems, href }: OrderCardProps) {
  const { order, items } = orderWithItems;
  const detailHref = href ?? `${AppRoute.Orders}/${order.id}`;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href={detailHref} className="text-lg font-semibold text-zinc-900 hover:underline">
            Order #{order.id.slice(0, 8)}
          </Link>
          <p className="mt-1 text-sm text-zinc-500">{formatDate(order.createdAt)}</p>
        </div>
        <Badge variant={statusVariantMap[order.status]}>{order.status}</Badge>
      </div>

      <div className="mt-4 space-y-2 text-sm text-zinc-600">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.quantity} x {item.productId.slice(0, 8)}
            </span>
            <span>{formatCurrency(item.unitPrice)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4 text-sm font-semibold text-zinc-900">
        <span>Total</span>
        <span>{formatCurrency(order.totalPrice)}</span>
      </div>
    </Card>
  );
}
