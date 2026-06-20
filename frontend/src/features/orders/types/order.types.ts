import { OrderStatus } from '@/shared/enums';

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: string;
  createdAt: string;
};

export type OrderWithItems = {
  order: Order;
  items: OrderItem[];
};

export type OrderFilters = {
  page?: number;
  limit?: number;
};

export type CreateOrderItemPayload = {
  productId: string;
  quantity: number;
};

export type CreateOrderPayload = {
  items: CreateOrderItemPayload[];
};

export type PaginatedOrders = {
  data: OrderWithItems[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UpdateOrderStatusPayload = {
  status: OrderStatus;
};
