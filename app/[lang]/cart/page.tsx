'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
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
  const name = (i: { name_id: string; name_en: string }) => (lang === 'en' ? i.name_en : i.name_id);

  if (!mounted) return null;

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-12 py-10 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl text-on-surface mb-8 text-center">{dict.cartTitle}</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <p className="text-on-surface-variant">{dict.cartEmpty}</p>
          <Link
            href={`/${lang}/catalog`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-on-primary font-medium hover:bg-primary-container transition-colors"
          >
            {dict.cartEmptyCta}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-soft"
            >
              <div className="h-20 w-20 rounded-md overflow-hidden bg-surface-container flex-shrink-0">
                {item.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.image} alt={name(item)} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base text-on-surface truncate">{name(item)}</h3>
                <p className="text-sm text-primary font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.productId, item.qty - 1)}
                  className="h-8 w-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.productId, item.qty + 1)}
                  className="h-8 w-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={() => remove(item.productId)}
                className="text-outline hover:text-primary transition-colors"
                aria-label={dict.remove}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="mt-6 p-6 bg-surface-container-low rounded-lg flex flex-col gap-4 sticky bottom-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-on-surface-variant">{dict.subtotal}</span>
              <span className="font-display text-xl text-on-surface">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <Link
              href={`/${lang}/checkout`}
              className="w-full text-center px-6 py-4 bg-primary text-on-primary font-medium rounded-full hover:bg-primary-container transition-colors"
            >
              {dict.proceedCheckout}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
