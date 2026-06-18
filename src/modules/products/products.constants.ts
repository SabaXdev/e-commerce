import { Product } from './entities/product.entity';

export enum ProductPagination {
  DefaultPage = 1,
  DefaultLimit = 10,
  MaxLimit = 100,
  MinPage = 1,
  MinLimit = 1,
}

export type PaginatedProducts = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
