import './globals.css';
import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Analytics } from '@vercel/analytics/react';

const syne = Syne({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Nástroje & Agenti | Moderní AI Řešení',
  description: 'Objevte výkonné AI nástroje a agenty pro zlepšení vašeho pracovního postupu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="dark">
      <body className={`${syne.className} bg-[#121212] text-white antialiased`}>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}