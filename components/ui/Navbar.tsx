"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();

  const toggleLanguageHelper = () => {
    if (!pathname) return "/en";
    const newLang = lang === "id" ? "en" : "id";
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${newLang}/`);
    } else if (pathname === `/${lang}`) {
      return `/${newLang}`;
    }
    return pathname;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200">
      <nav className="mx-auto max-w-[1600px] flex h-16 items-center justify-between px-6 md:px-12">
        <Link
          href={`/${lang}`}
          className="text-xl font-medium text-stone-800 tracking-tight"
        >
          Rianne Crochet
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={toggleLanguageHelper()}
            className="text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors"
          >
            <span className={lang === "id" ? "text-stone-900 font-bold" : ""}>
              ID
            </span>
            {" | "}
            <span className={lang === "en" ? "text-stone-900 font-bold" : ""}>
              EN
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
