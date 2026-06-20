import { Container } from '@/shared/components/layout/Container';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-8">
      <Container>
        <p className="text-sm text-zinc-500">Portfolio E-Commerce &copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}
