import { Container } from '@/shared/components/layout/Container';
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center py-12">
      <Container>
        <LoginForm />
      </Container>
    </main>
  );
}
