import { Container } from '@/shared/components/layout/Container';
import { ShopHeader } from './ShopHeader';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShopHeader />
      <main className="flex-1 py-8">
        <Container>{children}</Container>
      </main>
    </>
  );
}
