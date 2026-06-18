export enum ProductCacheKeyPrefix {
  List = 'products:list',
  ListLock = 'products:list:lock',
}

export const ProductCacheKey = {
  list: (page: number, limit: number): string =>
    `${ProductCacheKeyPrefix.List}:page=${page}:limit=${limit}`,

  listLock: (page: number, limit: number): string =>
    `${ProductCacheKeyPrefix.ListLock}:page=${page}:limit=${limit}`,

  listPattern: (): string => `${ProductCacheKeyPrefix.List}:*`,
} as const;
