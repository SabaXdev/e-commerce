import { ProductForm } from '@/features/products';
import { Card } from '@/shared/components/ui/Card';

export default function AdminNewProductPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">New product</h1>
      <Card className="mt-8 max-w-2xl">
        <ProductForm />
      </Card>
    </section>
  );
}
