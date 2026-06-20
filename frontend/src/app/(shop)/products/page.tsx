import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { productsQueryKeys } from '@/features/products';
import { createServerApiClient } from '@/shared/api/server-client';
import { createQueryClient } from '@/shared/lib/query-client';
import type { PaginatedProducts } from '@/features/products';
import { ShopProductGrid } from './ShopProductGrid';

export default async function ProductsPage() {
  const queryClient = createQueryClient();
  const filters = { page: 1, limit: 10 };

  await queryClient.prefetchQuery({
    queryKey: productsQueryKeys.list(filters),
    queryFn: async () => {
      const client = await createServerApiClient();
      const { data } = await client.get<PaginatedProducts>('/products', {
        params: filters,
      });

      return data;
    },
  });

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-zinc-900">Products</h1>
        <p className="mt-2 text-zinc-600">Explore our catalog and add items to your cart.</p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShopProductGrid filters={filters} />
      </HydrationBoundary>
    </section>
  );
}
