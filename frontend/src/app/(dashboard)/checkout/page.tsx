'use client';

import { useRouter } from 'next/navigation';
import { CartSummary, useCartStore } from '@/features/cart';
import { useCreateOrder } from '@/features/orders';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { AppRoute } from '@/shared/constants/app-routes.enum';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrderMutation = useCreateOrder();

  return (
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">Checkout</h1>
      <p className="mt-2 text-zinc-600">Review your cart and place your order.</p>

      <Card className="mt-8">
        <CartSummary />

        <Button
          className="mt-6"
          disabled={!items.length || createOrderMutation.isPending}
          onClick={async () => {
            await createOrderMutation.mutateAsync({
              items: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            });
            clearCart();
            router.push(AppRoute.Orders);
          }}
        >
          {createOrderMutation.isPending ? 'Placing order...' : 'Place order'}
        </Button>

        {createOrderMutation.error ? (
          <p className="mt-3 text-sm text-red-600">{createOrderMutation.error.message}</p>
        ) : null}
      </Card>
    </section>
  );
}
