import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/features/cart';
import { createServerApiClient } from '@/shared/api/server-client';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { formatCurrency } from '@/shared/utils/format-currency';
import type { Product } from '@/features/products';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const client = await createServerApiClient();

  let product: Product;

  try {
    const { data } = await client.get<Product>(`/products/${id}`);
    product = data;
  } catch {
    notFound();
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <Link href={AppRoute.Products}>
        <Button variant="ghost" size="sm">
          Back to products
        </Button>
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">{product.name}</h1>
          {product.description ? (
            <p className="mt-4 max-w-2xl text-zinc-600">{product.description}</p>
          ) : null}
        </div>
        <Badge variant={product.stockQuantity > 0 ? 'success' : 'danger'}>
          {product.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
        </Badge>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
        <span className="text-2xl font-semibold text-zinc-900">
          {formatCurrency(product.price)}
        </span>
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={product.price}
          stockQuantity={product.stockQuantity}
        />
      </div>
    </section>
  );
}
