'use client';

import { AddToCartButton } from '@/features/cart';
import { ProductGrid, type ProductFilters } from '@/features/products';
import { useProduct } from '@/features/products';

type ShopProductGridProps = {
  filters?: ProductFilters;
};

function ProductCartAction({ productId }: { productId: string }) {
  const productQuery = useProduct(productId);

  if (!productQuery.data) {
    return null;
  }

  const product = productQuery.data;

  return (
    <AddToCartButton
      productId={product.id}
      name={product.name}
      price={product.price}
      stockQuantity={product.stockQuantity}
    />
  );
}

export function ShopProductGrid({ filters }: ShopProductGridProps) {
  return (
    <ProductGrid
      filters={filters}
      actionSlot={(productId) => <ProductCartAction productId={productId} />}
    />
  );
}
