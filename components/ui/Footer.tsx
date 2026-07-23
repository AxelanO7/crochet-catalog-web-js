import { getDictionary } from '@/lib/dictionary';

export default function Footer({ lang }: { lang: string }) {
  const dict = getDictionary(lang);
  return (
    <footer className="border-t border-outline-variant/40 bg-surface-container-low mt-16">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-10 flex flex-col items-center gap-2 text-center">
        <span className="font-display text-lg text-on-surface">{dict.brand}</span>
        <p className="text-sm text-on-surface-variant">{dict.footerTagline}</p>
        <p className="text-xs text-outline mt-2">© {new Date().getFullYear()} {dict.brand}</p>
      </div>
    </footer>
  );
}
