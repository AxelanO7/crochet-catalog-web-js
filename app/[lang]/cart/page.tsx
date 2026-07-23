'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { use } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { getDictionary } from '@/lib/dictionary';

export default function CartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const dict = getDictionary(lang);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const name = (i: { name_id: string; name_en: string }) => (lang === 'en' ? i.name_en : i.name_id);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-16">
      <h1 className="font-display text-4xl text-on-surface md:text-5xl">{dict.cartTitle}</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <h2 className="font-display text-2xl text-on-surface">{dict.cartEmpty}</h2>
          <Link
            href={`/${lang}/catalog`}
            className="active-press inline-flex items-center gap-3 rounded-full bg-secondary px-10 py-4 font-medium text-on-secondary transition-all hover:opacity-90"
          >
            {dict.cartEmptyCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {items.map((item) => (
              <div
                key={item.productId}
                className="soft-elevation flex flex-col items-center gap-6 rounded-xl bg-surface-container p-6 md:flex-row"
              >
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-surface-dim md:h-40 md:w-40">
                  {item.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.image} alt={name(item)} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex w-full flex-grow flex-col justify-between gap-4 md:flex-row">
                  <div className="space-y-1">
                    <h3 className="font-display text-xl text-on-surface">{name(item)}</h3>
                    <p className="font-display text-lg text-primary">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center rounded-full border border-outline-variant bg-surface px-3 py-1">
                        <button
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary active:scale-90"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-4 font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary active:scale-90"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="text-on-surface-variant transition-colors hover:text-error"
                        aria-label={dict.remove}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-on-surface-variant">
                      {dict.subtotal}: Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:col-span-4">
            <div className="soft-elevation space-y-6 rounded-xl bg-surface-container-high p-8">
              <h2 className="border-b border-outline-variant/30 pb-4 font-display text-xl text-on-surface">
                {dict.orderSummary}
              </h2>
              <div className="flex justify-between text-on-surface-variant">
                <span>
                  {dict.subtotal} ({itemCount} item)
                </span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t border-outline-variant/30 pt-6">
                <div className="mb-8 flex items-end justify-between">
                  <span className="text-lg text-on-surface">Total</span>
                  <span className="font-display text-3xl leading-none text-primary">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <Link
                  href={`/${lang}/checkout`}
                  className="active-press block w-full rounded-full bg-primary py-4 text-center font-medium uppercase tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                >
                  {dict.proceedCheckout}
                </Link>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-on-surface-variant">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{lang === 'en' ? 'Safe & Trusted' : 'Aman & Terpercaya'}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
