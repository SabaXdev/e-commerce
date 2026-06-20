import { notFound } from 'next/navigation';
import { ProductForm } from '@/features/products';
import { createServerApiClient } from '@/shared/api/server-client';
import { Card } from '@/shared/components/ui/Card';
import type { Product } from '@/features/products';

type AdminEditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditProductPage({ params }: AdminEditProductPageProps) {
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
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">Edit product</h1>
      <Card className="mt-8 max-w-2xl">
        <ProductForm product={product} />
      </Card>
    </section>
  );
}
