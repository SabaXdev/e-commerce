'use client';

import Link from 'next/link';
import { AdminProductRow, useProducts } from '@/features/products';
import { AdminRoute } from '@/features/admin';
import { Button } from '@/shared/components/ui/Button';
import { Spinner } from '@/shared/components/feedback/Spinner';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export default function AdminProductsPage() {
  const productsQuery = useProducts({ page: 1, limit: 50 });

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">Products</h1>
          <p className="mt-2 text-zinc-600">Manage the storefront catalog.</p>
        </div>
        <Link href={AdminRoute.ProductNew}>
          <Button>Add product</Button>
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        {productsQuery.isLoading ? <Spinner label="Loading products..." /> : null}
        {productsQuery.isError ? <ErrorState message={productsQuery.error.message} /> : null}
        {productsQuery.data ? (
          <table className="min-w-full">
            <thead className="bg-zinc-50 text-left text-sm text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsQuery.data.data.map((product) => (
                <AdminProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  );
}
