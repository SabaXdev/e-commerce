import { z } from 'zod';
import { OrderStatus } from '@/shared/enums';
import { OrderPagination } from '../constants/orders-query-keys';

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1, 'Add at least one item'),
});

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

export const orderFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(OrderPagination.DefaultPage),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(OrderPagination.MaxLimit)
    .default(OrderPagination.DefaultLimit),
});

export type OrderFiltersValues = z.infer<typeof orderFiltersSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});

export type UpdateOrderStatusFormValues = z.infer<typeof updateOrderStatusSchema>;
