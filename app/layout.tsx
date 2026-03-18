import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Xedric Crochet - Handcrafted in Indonesia',
  description: 'Handcrafted elegance from Xedric Crochet, Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} min-h-screen bg-[#FAFAFA] text-stone-800 font-sans antialiased selection:bg-stone-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
