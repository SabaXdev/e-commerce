import { QueryClient } from '@tanstack/react-query';
import { queryDefaults } from '@/shared/constants/query-defaults';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: queryDefaults.staleTime.productsList,
        gcTime: queryDefaults.gcTime.default,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
