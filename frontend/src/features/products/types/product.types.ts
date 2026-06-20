export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stockQuantity: number;
  createdAt: string;
};

export type ProductFilters = {
  page?: number;
  limit?: number;
};

export type CreateProductPayload = {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;

export type PaginatedProducts = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
