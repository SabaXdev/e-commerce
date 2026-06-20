'use client';

import { useQuery } from '@tanstack/react-query';
import { queryDefaults } from '@/shared/constants/query-defaults';
import { getProduct } from '../api/products.api';
import { productsQueryKeys } from '../constants/products-query-keys';

export function useProduct(id: string) {
  return useQuery({
    queryKey: productsQueryKeys.detail(id),
    queryFn: () => getProduct(id),
    staleTime: queryDefaults.staleTime.productDetail,
    enabled: Boolean(id),
  });
}
