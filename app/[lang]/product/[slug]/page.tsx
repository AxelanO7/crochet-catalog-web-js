import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Leaf, ChevronRight } from 'lucide-react';
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
  const categoryName = product.category ? (lang === 'en' ? product.category.name_en : product.category.name_id) : '';

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-16 md:py-20">
      <nav className="mb-8 flex items-center space-x-2 text-sm text-on-surface-variant/60">
        <Link href={`/${lang}`} className="hover:text-primary">
          {lang === 'en' ? 'Home' : 'Beranda'}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${lang}/catalog`} className="hover:text-primary">
          {categoryName || dict.catalogTitle}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-on-surface">{localizedName(product, lang)}</span>
      </nav>

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
        {/* Gallery */}
        <div className="flex flex-col gap-4 md:col-span-7 md:flex-row-reverse">
          <div className="soft-elevation aspect-[4/5] flex-1 overflow-hidden rounded-xl bg-surface-container-low">
            {images[0] && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={images[0].url} alt={localizedName(product, lang)} className="h-full w-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto md:flex-col md:overflow-y-visible">
              {images.slice(1).map((img) => (
                <div
                  key={img.id}
                  className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-transparent hover:opacity-80 md:h-32 md:w-24"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-8 md:col-span-5 md:sticky md:top-28">
          <div>
            <div className="mb-4 flex items-center space-x-3">
              <span className="rounded-full bg-secondary-container px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-on-secondary-container">
                {categoryName}
              </span>
              <span className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-primary">
                {statusLabel}
              </span>
            </div>
            <h1 className="font-display text-3xl leading-tight text-on-surface md:text-[42px]">
              {localizedName(product, lang)}
            </h1>
            <p className="mt-2 font-display text-2xl text-primary">Rp {product.price.toLocaleString('id-ID')}</p>
          </div>

          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 italic">
            <p className="leading-relaxed text-on-surface-variant">{localizedDesc(product, lang)}</p>
            <div className="mt-4 flex items-center text-secondary">
              <Leaf className="mr-2 h-4 w-4" />
              <span className="text-[13px] font-semibold">100% Handmade Cotton Yarn</span>
            </div>
          </div>

          <ProductDetailClient
            product={product}
            lang={lang}
            image={images[0]?.url ?? null}
            dict={dict}
          />

          <p className="text-xs italic text-outline">{dict.disclaimer}</p>
        </div>
      </div>

      {/* Maker's Note */}
      <section className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[40px] bg-surface-container p-10 text-center md:mt-32 md:p-20">
        <h2 className="font-display text-2xl text-on-surface">
          {lang === 'en' ? "Catatan Sang Pembuat" : 'Catatan Sang Pembuat'}
        </h2>
        <div className="mx-auto mb-8 mt-6 h-1 w-16 rounded-full bg-primary" />
        <p className="font-display text-2xl leading-relaxed text-on-surface md:text-3xl">
          {lang === 'en'
            ? '"Every thread is a prayer, and every stitch is a story from the eastern coast of Indonesia that we bring into your everyday life."'
            : '"Setiap helai benang adalah doa, dan setiap rajutan adalah cerita dari pesisir Timur Indonesia yang kami bawa ke dalam keseharian Anda."'}
        </p>
      </section>
    </div>
  );
}
