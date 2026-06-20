'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, updateOrderStatus } from '../api/orders.api';
import { ordersQueryKeys } from '../constants/orders-query-keys';
import type { CreateOrderPayload, UpdateOrderStatusPayload } from '../types/order.types';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ordersQueryKeys.lists() });
    },
  });
}

export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderStatusPayload) =>
      updateOrderStatus(orderId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ordersQueryKeys.all });
    },
  });
}
