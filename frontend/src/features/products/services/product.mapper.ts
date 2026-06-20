import { formatCurrency } from '@/shared/utils/format-currency';
import type { Product } from '../types/product.types';

export type ProductViewModel = Product & {
  formattedPrice: string;
  inStock: boolean;
};

export function mapProductToViewModel(product: Product): ProductViewModel {
  return {
    ...product,
    formattedPrice: formatCurrency(product.price),
    inStock: product.stockQuantity > 0,
  };
}
