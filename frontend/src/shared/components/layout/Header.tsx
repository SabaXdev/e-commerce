import Link from 'next/link';
import { Container } from '@/shared/components/layout/Container';
import { AppRoute } from '@/shared/constants/app-routes.enum';

type HeaderProps = {
  navSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
};

export function Header({ navSlot, actionsSlot }: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href={AppRoute.Home} className="text-lg font-semibold text-zinc-900">
            Shop
          </Link>
          {navSlot}
        </div>
        <div className="flex items-center gap-3">{actionsSlot}</div>
      </Container>
    </header>
  );
}
