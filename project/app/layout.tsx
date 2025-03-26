import './globals.css';
import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Nástroje & Agenti | Moderní AI Řešení',
  description: 'Objevte výkonné AI nástroje a agenty pro zlepšení vašeho pracovního postupu',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`dark ${syne.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased font-sans`}>
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-purple-500/5 to-transparent" />
          <div className="relative">
            <Navbar />
            <div className="pt-20">
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}