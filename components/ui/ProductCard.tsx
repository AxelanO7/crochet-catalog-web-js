import Link from 'next/link';
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

  return (
    <Link href={`/${lang}/product/${product.slug}`} className="group block">
      <div className="bg-surface-container-lowest rounded-lg shadow-soft hover:-translate-y-1 transition-transform overflow-hidden flex flex-col h-full border border-outline-variant/30">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
          {image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image}
              alt={localizedName(product, lang)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-on-surface">
            {statusLabel}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow gap-1">
          <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            {product.category ? (lang === 'en' ? product.category.name_en : product.category.name_id) : ''}
          </p>
          <h3 className="font-display text-lg text-on-surface leading-snug">
            {localizedName(product, lang)}
          </h3>
          <p className="text-sm font-semibold text-primary mt-1">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </Link>
  );
}
