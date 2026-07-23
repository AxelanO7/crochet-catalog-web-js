'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import { useCartStore } from '@/lib/cart-store';
import { useEffect, useState } from 'react';

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();
  const dict = getDictionary(lang);
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const cartCount = mounted ? items.reduce((sum, i) => sum + i.qty, 0) : 0;

  const toggleLanguageHelper = () => {
    if (!pathname) return '/en';
    const newLang = lang === 'id' ? 'en' : 'id';
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${newLang}/`);
    } else if (pathname === `/${lang}`) {
      return `/${newLang}`;
    }
    return pathname;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/40">
      <nav className="mx-auto max-w-[1400px] flex h-16 md:h-20 items-center justify-between px-5 md:px-12">
        <Link href={`/${lang}`} className="font-display text-xl md:text-2xl text-on-surface tracking-tight">
          {dict.brand}
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <Link
            href={`/${lang}/catalog`}
            className="hidden sm:inline text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            {dict.nav.catalog}
          </Link>
          <Link
            href={toggleLanguageHelper()}
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className={lang === 'id' ? 'text-primary font-bold' : ''}>ID</span>
            {' | '}
            <span className={lang === 'en' ? 'text-primary font-bold' : ''}>EN</span>
          </Link>
          <Link href={`/${lang}/cart`} className="relative text-on-surface-variant hover:text-primary transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
