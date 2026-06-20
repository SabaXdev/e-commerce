'use client';

import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { formatCurrency } from '@/shared/utils/format-currency';
import { useCartStore } from '../store/cart.store';

export function CartButton() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <Link href={AppRoute.Checkout}>
      <Button variant="secondary" size="sm">
        Cart ({totalItems})
      </Button>
    </Link>
  );
}

export function AddToCartButton({
  productId,
  name,
  price,
  stockQuantity,
}: {
  productId: string;
  name: string;
  price: string;
  stockQuantity: number;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const disabled = stockQuantity <= 0;

  return (
    <Button
      size="sm"
      disabled={disabled}
      onClick={() => addItem({ productId, name, price, stockQuantity })}
    >
      {disabled ? 'Out of stock' : 'Add to cart'}
    </Button>
  );
}

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (!items.length) {
    return <p className="text-sm text-zinc-500">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.productId} className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 p-4">
          <div>
            <p className="font-medium text-zinc-900">{item.name}</p>
            <p className="text-sm text-zinc-500">{formatCurrency(item.price)} each</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={item.stockQuantity}
              value={item.quantity}
              onChange={(event) =>
                updateQuantity(item.productId, Number(event.target.value))
              }
              className="w-16 rounded border border-zinc-300 px-2 py-1 text-sm"
            />
            <Button variant="ghost" size="sm" onClick={() => removeItem(item.productId)}>
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between border-t border-zinc-200 pt-4 text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
    </div>
  );
}
