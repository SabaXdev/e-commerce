'use client';

import { useCurrentUser } from '@/features/auth';
import { Card } from '@/shared/components/ui/Card';
import { Spinner } from '@/shared/components/feedback/Spinner';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export default function AccountPage() {
  const currentUserQuery = useCurrentUser();

  if (currentUserQuery.isLoading) {
    return <Spinner label="Loading account..." />;
  }

  if (currentUserQuery.isError || !currentUserQuery.data) {
    return <ErrorState message="Unable to load account details." />;
  }

  const user = currentUserQuery.data;

  return (
    <section>
      <h1 className="text-3xl font-semibold text-zinc-900">Account</h1>
      <Card className="mt-8 max-w-lg">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-medium text-zinc-500">Email</dt>
            <dd className="mt-1 text-zinc-900">{user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">User ID</dt>
            <dd className="mt-1 text-zinc-900">{user.userId}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">Role</dt>
            <dd className="mt-1 capitalize text-zinc-900">{user.role}</dd>
          </div>
        </dl>
      </Card>
    </section>
  );
}
