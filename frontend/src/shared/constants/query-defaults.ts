export const queryDefaults = {
  staleTime: {
    productsList: 60_000,
    productDetail: 300_000,
    currentUser: 300_000,
    orders: 0,
  },
  gcTime: {
    default: 300_000,
    currentUser: 1_800_000,
  },
} as const;
