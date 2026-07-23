import { Globe, Mail } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';

export default function Footer({ lang }: { lang: string }) {
  const dict = getDictionary(lang);
  return (
    <footer className="mt-20 w-full rounded-t-xl bg-surface-container">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 py-12 md:grid-cols-3 md:px-16">
        <div className="space-y-4">
          <div className="font-display text-xl text-on-surface">{dict.brand}</div>
          <p className="max-w-xs text-sm text-on-surface-variant">{dict.footerTagline}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {lang === 'en' ? 'Explore' : 'Jelajahi'}
          </p>
          <a href={`/${lang}/catalog`} className="text-sm text-on-surface-variant transition-all hover:text-primary hover:underline">
            {dict.nav.catalog}
          </a>
          <a href={`/${lang}/cart`} className="text-sm text-on-surface-variant transition-all hover:text-primary hover:underline">
            {dict.nav.cart}
          </a>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary transition-all hover:bg-primary hover:text-on-primary">
              <Globe className="h-4 w-4" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary transition-all hover:bg-primary hover:text-on-primary">
              <Mail className="h-4 w-4" />
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} {dict.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
