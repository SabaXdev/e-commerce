'use client';

import { useQuery } from '@tanstack/react-query';
import { queryDefaults } from '@/shared/constants/query-defaults';
import { getOrder } from '../api/orders.api';
import { ordersQueryKeys } from '../constants/orders-query-keys';

export function useOrder(id: string) {
  return useQuery({
    queryKey: ordersQueryKeys.detail(id),
    queryFn: () => getOrder(id),
    staleTime: queryDefaults.staleTime.orders,
    enabled: Boolean(id),
  });
}
