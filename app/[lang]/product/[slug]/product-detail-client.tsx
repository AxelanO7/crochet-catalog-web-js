'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, PenLine } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import type { Product } from '@/lib/types';
import type { getDictionary } from '@/lib/dictionary';

type Dict = ReturnType<typeof getDictionary>;

export default function ProductDetailClient({
  product,
  lang,
  image,
  dict,
}: {
  product: Product;
  lang: string;
  image: string | null;
  dict: Dict;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCartStore((s) => s.add);

  function handleAdd() {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name_id: product.name_id,
        name_en: product.name_en,
        price: product.price,
        image,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-outline bg-surface-container-lowest px-2 py-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
            aria-label="minus"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-lg font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
            aria-label="plus"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="active-press flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-medium text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
        >
          <ShoppingCart className="h-5 w-5" />
          {added ? dict.addedToCart : dict.addToCart}
        </button>
      </div>

      <div className="rounded-xl border-l-4 border-secondary bg-secondary-container/20 p-4">
        <div className="flex items-start gap-3">
          <PenLine className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
          <p className="text-sm text-on-surface-variant">
            <span className="font-semibold text-secondary">{dict.noteHint}</span>
          </p>
        </div>
      </div>

      {added && (
        <a href={`/${lang}/cart`} className="block text-center text-sm text-primary underline">
          → {lang === 'en' ? 'View cart' : 'Lihat keranjang'}
        </a>
      )}
    </div>
  );
}
