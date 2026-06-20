export enum OrderQueryKey {
  List = 'list',
  Detail = 'detail',
}

export enum OrderPagination {
  DefaultPage = 1,
  DefaultLimit = 10,
  MaxLimit = 100,
}

export const ordersQueryKeys = {
  all: ['orders'] as const,
  lists: () => [...ordersQueryKeys.all, OrderQueryKey.List] as const,
  list: (filters: Record<string, unknown>) =>
    [...ordersQueryKeys.lists(), filters] as const,
  details: () => [...ordersQueryKeys.all, OrderQueryKey.Detail] as const,
  detail: (id: string) => [...ordersQueryKeys.details(), id] as const,
};
