import { OrderStatus } from '../../common/enums';

export const ORDERS_REPOSITORY = Symbol('ORDERS_REPOSITORY');

export enum OrderPagination {
  DefaultPage = 1,
  DefaultLimit = 10,
  MaxLimit = 100,
  MinPage = 1,
  MinLimit = 1,
}

export const ORDER_STATUS_TRANSITIONS: Record<
  OrderStatus,
  readonly OrderStatus[]
> = {
  [OrderStatus.Pending]: [OrderStatus.Confirmed, OrderStatus.Cancelled],
  [OrderStatus.Confirmed]: [OrderStatus.Processing, OrderStatus.Cancelled],
  [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
  [OrderStatus.Shipped]: [OrderStatus.Delivered],
  [OrderStatus.Delivered]: [],
  [OrderStatus.Cancelled]: [],
};

export const TERMINAL_ORDER_STATUSES: readonly OrderStatus[] = [
  OrderStatus.Delivered,
  OrderStatus.Cancelled,
];
