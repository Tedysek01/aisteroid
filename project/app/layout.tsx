import './globals.css';
import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

const syne = Syne({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Tools & Agents | Next-Gen AI Solutions',
  description: 'Discover powerful AI tools and agents to enhance your workflow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.className} bg-[#121212] text-white antialiased`}>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}