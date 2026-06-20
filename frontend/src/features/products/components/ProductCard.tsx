import Link from 'next/link';
import { Badge } from '@/shared/components/ui/Badge';
import { Card } from '@/shared/components/ui/Card';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { mapProductToViewModel } from '../services/product.mapper';
import type { Product } from '../types/product.types';

type ProductCardProps = {
  product: Product;
  actionSlot?: React.ReactNode;
};

export function ProductCard({ product, actionSlot }: ProductCardProps) {
  const viewModel = mapProductToViewModel(product);

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <Link href={`${AppRoute.Products}/${product.id}`} className="text-lg font-semibold text-zinc-900 hover:underline">
          {product.name}
        </Link>
        <Badge variant={viewModel.inStock ? 'success' : 'danger'}>
          {viewModel.inStock ? 'In stock' : 'Out of stock'}
        </Badge>
      </div>

      {product.description ? (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{product.description}</p>
      ) : null}

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-lg font-semibold text-zinc-900">{viewModel.formattedPrice}</span>
        {actionSlot}
      </div>
    </Card>
  );
}
