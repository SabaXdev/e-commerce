'use client';

import { useQuery } from '@tanstack/react-query';
import { queryDefaults } from '@/shared/constants/query-defaults';
import { getProducts } from '../api/products.api';
import { productsQueryKeys } from '../constants/products-query-keys';
import type { ProductFilters } from '../types/product.types';

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productsQueryKeys.list(filters),
    queryFn: () => getProducts(filters),
    staleTime: queryDefaults.staleTime.productsList,
  });
}
