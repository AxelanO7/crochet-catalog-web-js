import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { localizedName } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';

interface ProductCardProps {
  product: Product;
  lang: string;
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  const dict = getDictionary(lang);
  const image = product.product_images?.[0]?.url;
  const statusLabel = product.status === 'READY STOCK' ? dict.readyStock : dict.preOrder;
  const badgeClass =
    product.status === 'READY STOCK'
      ? 'bg-secondary-container text-on-secondary-container'
      : 'bg-tertiary-container text-on-primary';

  return (
    <Link href={`/${lang}/product/${product.slug}`} className="group block">
      <div className="soft-elevation relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-surface-container transition-transform duration-500 hover:-translate-y-2">
        {image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={localizedName(product, lang)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute left-4 top-4">
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
            {statusLabel}
          </span>
        </div>
        <button
          type="button"
          className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-surface/90 p-3 text-primary opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-label={dict.addToCart}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
      <h3 className="font-display text-[20px] leading-snug text-on-surface">{localizedName(product, lang)}</h3>
      <p className="text-on-surface-variant">Rp {product.price.toLocaleString('id-ID')}</p>
    </Link>
  );
}
