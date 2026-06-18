import { OrderStatus } from '../../common/enums';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

export type CreateOrderItemPayload = {
  productId: string;
  quantity: number;
  unitPrice: string;
};

export type CreateOrderPayload = {
  userId: string;
  status: OrderStatus;
  totalPrice: string;
  items: CreateOrderItemPayload[];
};

export type OrderWithItems = {
  order: Order;
  items: OrderItem[];
};

export type PaginatedOrders = {
  data: OrderWithItems[];
  total: number;
  page: number;
  limit: number;
};

export interface OrdersRepository {
  create(payload: CreateOrderPayload): Promise<OrderWithItems>;
  findById(id: string): Promise<OrderWithItems | null>;
  findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedOrders>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}
