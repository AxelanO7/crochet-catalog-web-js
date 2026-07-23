import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { getProductBySlug } from '@/lib/queries';
import { localizedName, localizedDesc } from '@/lib/types';
import ProductDetailClient from './product-detail-client';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images = product.product_images?.length
    ? [...product.product_images].sort((a, b) => a.order_index - b.order_index)
    : [];
  const statusLabel = product.status === 'READY STOCK' ? dict.readyStock : dict.preOrder;

  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-12 pt-6 pb-16 md:pb-24">
      <Link
        href={`/${lang}/catalog`}
        className="inline-block mb-6 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
      >
        {dict.backToCatalog}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30 shadow-soft">
            {images[0] && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={images[0].url} alt={localizedName(product, lang)} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border border-outline-variant/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest mb-3">
              {product.category ? (lang === 'en' ? product.category.name_en : product.category.name_id) : ''}
            </p>
            <h1 className="font-display text-3xl lg:text-4xl text-on-surface leading-tight mb-3">
              {localizedName(product, lang)}
            </h1>
            <div className="flex items-center gap-3">
              <span className="inline-block bg-secondary-container text-secondary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                {statusLabel}
              </span>
              <span className="text-xl font-semibold text-primary">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <p className="text-base text-on-surface-variant leading-relaxed">
            {localizedDesc(product, lang)}
          </p>

          <ProductDetailClient
            product={product}
            lang={lang}
            image={images[0]?.url ?? null}
            dict={dict}
          />

          <p className="text-xs text-outline italic">{dict.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
