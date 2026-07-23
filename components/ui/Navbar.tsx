'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Languages, Menu } from 'lucide-react';
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

  const isCatalog = pathname?.includes('/catalog') || pathname?.includes('/product');

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-16">
        <Link href={`/${lang}`} className="font-display text-[28px] md:text-[36px] leading-none text-primary tracking-tight">
          {dict.brand}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={`/${lang}/catalog`}
            className={
              isCatalog
                ? 'border-b-2 border-primary pb-1 font-bold text-primary'
                : 'text-on-surface-variant transition-colors hover:text-primary'
            }
          >
            {dict.nav.catalog}
          </Link>
          <Link href={`/${lang}#story`} className="text-on-surface-variant transition-colors hover:text-primary">
            Story
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Search className="hidden h-5 w-5 text-primary sm:block" />
          <Link
            href={toggleLanguageHelper()}
            className="flex items-center gap-0.5 text-on-surface-variant hover:text-primary"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span className="text-[10px] font-semibold uppercase">{lang}</span>
          </Link>
          <Link href={`/${lang}/cart`} className="relative text-primary transition-colors hover:opacity-80">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                {cartCount}
              </span>
            )}
          </Link>
          <Menu className="h-5 w-5 text-primary md:hidden" />
        </div>
      </nav>
    </header>
  );
}
