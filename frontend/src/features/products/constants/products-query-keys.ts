export enum ProductQueryKey {
  List = 'list',
  Detail = 'detail',
}

export enum ProductPagination {
  DefaultPage = 1,
  DefaultLimit = 10,
  MaxLimit = 100,
}

export const productsQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productsQueryKeys.all, ProductQueryKey.List] as const,
  list: (filters: Record<string, unknown>) =>
    [...productsQueryKeys.lists(), filters] as const,
  details: () => [...productsQueryKeys.all, ProductQueryKey.Detail] as const,
  detail: (id: string) => [...productsQueryKeys.details(), id] as const,
};
