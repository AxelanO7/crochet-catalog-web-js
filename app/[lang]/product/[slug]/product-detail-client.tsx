'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
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
    <div className="flex flex-col gap-4 p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-soft">
      <div>
        <label className="text-sm font-medium text-on-surface-variant mb-2 block">{dict.quantity}</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary hover:bg-primary-container text-on-primary font-medium rounded-full transition-colors"
      >
        <ShoppingBag className="h-4 w-4" />
        {added ? dict.addedToCart : dict.addToCart}
      </button>
      <p className="text-xs text-on-surface-variant text-center">{dict.noteHint}</p>
      {added && (
        <a href={`/${lang}/cart`} className="text-xs text-primary underline text-center">
          → {lang === 'en' ? 'View cart' : 'Lihat keranjang'}
        </a>
      )}
    </div>
  );
}
