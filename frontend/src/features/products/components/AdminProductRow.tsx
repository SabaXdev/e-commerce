'use client';

import Link from 'next/link';
import { Button } from '@/shared/components/ui/Button';
import { useDeleteProduct } from '../hooks/useProductMutations';
import type { Product } from '../types/product.types';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { mapProductToViewModel } from '../services/product.mapper';
import { Badge } from '@/shared/components/ui/Badge';

type AdminProductRowProps = {
  product: Product;
};

export function AdminProductRow({ product }: AdminProductRowProps) {
  const deleteMutation = useDeleteProduct();
  const viewModel = mapProductToViewModel(product);

  return (
    <tr className="border-b border-zinc-100">
      <td className="px-4 py-3 text-sm font-medium text-zinc-900">{product.name}</td>
      <td className="px-4 py-3 text-sm text-zinc-600">{viewModel.formattedPrice}</td>
      <td className="px-4 py-3">
        <Badge variant={viewModel.inStock ? 'success' : 'danger'}>
          {product.stockQuantity}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Link href={`${AppRoute.AdminProducts}/${product.id}/edit`}>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate(product.id)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
