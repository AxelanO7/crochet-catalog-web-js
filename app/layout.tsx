import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Kupang Crochet | Handcrafted Elegance',
  description: 'Ultra-premium handcrafted crochet and resort-wear from Kupang, Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} min-h-screen bg-[#F9F8F6] font-sans text-zinc-950 antialiased selection:bg-zinc-900 selection:text-[#F9F8F6]`}>
        <div className="mx-auto max-w-[1600px] px-6 py-8 md:px-12 md:py-16">
          {/* Subtle hyper-minimalist Top Navigation */}
          <header className="mb-16 md:mb-24 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tighter">K. / C.</div>
            <nav className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">Catalog</nav>
          </header>
          
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
