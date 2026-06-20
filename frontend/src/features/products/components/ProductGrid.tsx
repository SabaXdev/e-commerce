'use client';

import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { Spinner } from '@/shared/components/feedback/Spinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { ProductCard } from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import type { ProductFilters } from '../types/product.types';

type ProductGridProps = {
  filters?: ProductFilters;
  actionSlot?: (productId: string) => React.ReactNode;
};

export function ProductGrid({ filters, actionSlot }: ProductGridProps) {
  const productsQuery = useProducts(filters);

  if (productsQuery.isLoading) {
    return <Spinner label="Loading products..." />;
  }

  if (productsQuery.isError) {
    return <ErrorState message={productsQuery.error.message} />;
  }

  if (!productsQuery.data?.data.length) {
    return <EmptyState title="No products found" description="Check back later for new items." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {productsQuery.data.data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          actionSlot={actionSlot?.(product.id)}
        />
      ))}
    </div>
  );
}
