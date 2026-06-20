'use client';

import { useQuery } from '@tanstack/react-query';
import { queryDefaults } from '@/shared/constants/query-defaults';
import { getOrders } from '../api/orders.api';
import { ordersQueryKeys } from '../constants/orders-query-keys';
import type { OrderFilters } from '../types/order.types';

export function useOrders(filters: OrderFilters = {}) {
  return useQuery({
    queryKey: ordersQueryKeys.list(filters),
    queryFn: () => getOrders(filters),
    staleTime: queryDefaults.staleTime.orders,
  });
}

export function useMyOrders(filters: OrderFilters = {}) {
  return useOrders(filters);
}
