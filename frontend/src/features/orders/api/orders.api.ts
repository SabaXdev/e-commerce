import { ApiEndpoint } from '@/shared/api/endpoints.enum';
import { apiClient } from '@/shared/api/client';
import type {
  CreateOrderPayload,
  OrderFilters,
  OrderWithItems,
  PaginatedOrders,
  UpdateOrderStatusPayload,
} from '../types/order.types';

export async function createOrder(payload: CreateOrderPayload): Promise<OrderWithItems> {
  const { data } = await apiClient.post<OrderWithItems>(ApiEndpoint.Orders, payload);

  return data;
}

export async function getOrders(filters: OrderFilters = {}): Promise<PaginatedOrders> {
  const { data } = await apiClient.get<PaginatedOrders>(ApiEndpoint.Orders, {
    params: filters,
  });

  return data;
}

export async function getOrder(id: string): Promise<OrderWithItems> {
  const { data } = await apiClient.get<OrderWithItems>(`${ApiEndpoint.Orders}/${id}`);

  return data;
}

export async function updateOrderStatus(
  id: string,
  payload: UpdateOrderStatusPayload,
): Promise<OrderWithItems> {
  const { data } = await apiClient.patch<OrderWithItems>(
    `${ApiEndpoint.Orders}/${id}/status`,
    payload,
  );

  return data;
}
