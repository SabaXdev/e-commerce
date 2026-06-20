'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryDefaults } from '@/shared/constants/query-defaults';
import { AppRoute } from '@/shared/constants/app-routes.enum';
import { AuthApiRoute } from '../constants/auth-routes.enum';
import { authQueryKeys } from '../constants/auth-query-keys';
import type { AuthenticatedUser } from '../types/auth.types';
import type { LoginFormValues } from '../schemas/login.schema';
import type { RegisterFormValues } from '../schemas/register.schema';

async function fetchCurrentUser(): Promise<AuthenticatedUser> {
  const response = await fetch('/api/auth/me');

  if (!response.ok) {
    throw new Error('Unauthorized');
  }

  return response.json() as Promise<AuthenticatedUser>;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: fetchCurrentUser,
    staleTime: queryDefaults.staleTime.currentUser,
    gcTime: queryDefaults.gcTime.currentUser,
    retry: false,
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const response = await fetch(AuthApiRoute.Login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message?: string };
        throw new Error(errorBody.message ?? 'Login failed');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
      router.push(AppRoute.Orders);
      router.refresh();
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterFormValues) => {
      const response = await fetch(AuthApiRoute.Register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message?: string };
        throw new Error(errorBody.message ?? 'Registration failed');
      }
    },
    onSuccess: () => {
      router.push(AppRoute.Login);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await fetch(AuthApiRoute.Logout, { method: 'POST' });
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
      router.push(AppRoute.Login);
      router.refresh();
    },
  });
}
