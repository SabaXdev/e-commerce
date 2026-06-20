'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Card } from '@/shared/components/ui/Card';
import { AuthRoute } from '../constants/auth-routes.enum';
import { useRegister } from '../hooks/useLogin';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';

export function RegisterForm() {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold text-zinc-900">Create account</h1>
      <p className="mt-2 text-sm text-zinc-500">Join to start shopping and track orders.</p>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit((values) => registerMutation.mutate(values))}
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />

        {registerMutation.error ? (
          <p className="text-sm text-red-600">{registerMutation.error.message}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-500">
        Already have an account?{' '}
        <Link href={AuthRoute.Login} className="font-medium text-zinc-900 hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
