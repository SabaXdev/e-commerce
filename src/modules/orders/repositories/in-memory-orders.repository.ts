import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderStatus } from '../../../common/enums';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import {
  CreateOrderPayload,
  OrderWithItems,
  OrdersRepository,
  PaginatedOrders,
} from '../orders.repository';

@Injectable()
export class InMemoryOrdersRepository implements OrdersRepository {
  private readonly orders = new Map<string, Order>();
  private readonly itemsByOrderId = new Map<string, OrderItem[]>();

  async create(payload: CreateOrderPayload): Promise<OrderWithItems> {
    const orderId = randomUUID();
    const createdAt = new Date();

    const order: Order = {
      id: orderId,
      userId: payload.userId,
      status: payload.status,
      totalPrice: payload.totalPrice,
      items: [],
      createdAt,
    };

    const items: OrderItem[] = payload.items.map((item) => ({
      id: randomUUID(),
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      order,
      createdAt,
    }));

    order.items = items;

    this.orders.set(orderId, order);
    this.itemsByOrderId.set(orderId, items);

    return { order, items };
  }

  async findById(id: string): Promise<OrderWithItems | null> {
    const order = this.orders.get(id);

    if (!order) {
      return null;
    }

    const items = this.itemsByOrderId.get(id) ?? [];

    return { order, items };
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedOrders> {
    const userOrders = [...this.orders.values()]
      .filter((order) => order.userId === userId)
      .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());

    const total = userOrders.length;
    const offset = (page - 1) * limit;
    const paginatedOrders = userOrders.slice(offset, offset + limit);

    const data: OrderWithItems[] = paginatedOrders.map((order) => ({
      order,
      items: this.itemsByOrderId.get(order.id) ?? [],
    }));

    return { data, total, page, limit };
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    const order = this.orders.get(id);

    if (!order) {
      return null;
    }

    order.status = status;

    return order;
  }
}
