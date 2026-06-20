import { ApiEndpoint } from '@/shared/api/endpoints.enum';
import { apiClient } from '@/shared/api/client';
import type {
  CreateProductPayload,
  PaginatedProducts,
  Product,
  ProductFilters,
  UpdateProductPayload,
} from '../types/product.types';

export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
  const { data } = await apiClient.get<PaginatedProducts>(ApiEndpoint.Products, {
    params: filters,
  });

  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await apiClient.get<Product>(`${ApiEndpoint.Products}/${id}`);

  return data;
}

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const { data } = await apiClient.post<Product>(ApiEndpoint.Products, payload);

  return data;
}

export async function updateProduct(
  id: string,
  payload: UpdateProductPayload,
): Promise<Product> {
  const { data } = await apiClient.patch<Product>(`${ApiEndpoint.Products}/${id}`, payload);

  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await apiClient.delete(`${ApiEndpoint.Products}/${id}`);
}
