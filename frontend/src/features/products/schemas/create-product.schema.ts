import { z } from 'zod';
import { ProductPagination } from '../constants/products-query-keys';

export const productFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(ProductPagination.DefaultPage),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(ProductPagination.MaxLimit)
    .default(ProductPagination.DefaultLimit),
});

export type ProductFiltersValues = z.infer<typeof productFiltersSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be positive'),
  stockQuantity: z.coerce.number().int().min(0, 'Stock must be zero or greater'),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;
