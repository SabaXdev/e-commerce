import { Container } from '@/shared/components/layout/Container';
import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center py-12">
      <Container>
        <RegisterForm />
      </Container>
    </main>
  );
}
