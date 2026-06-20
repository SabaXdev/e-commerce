import type { Metadata } from 'next';
import { Footer } from '@/shared/components/layout/Footer';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio E-Commerce',
  description: 'Production-ready e-commerce storefront',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
