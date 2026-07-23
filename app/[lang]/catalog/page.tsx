import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { getCategories, getProducts } from '@/lib/queries';
import ProductCard from '@/components/ui/ProductCard';
import { localizedName } from '@/lib/types';

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  const { category } = await searchParams;
  const dict = getDictionary(lang);
  const [categories, products] = await Promise.all([getCategories(), getProducts(category)]);

  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-16 text-center md:px-16 md:text-left">
        <h1 className="font-display text-4xl text-on-surface md:text-5xl">{dict.catalogTitle}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant">{dict.catalogSubtitle}</p>
      </section>

      <section className="sticky top-[68px] z-40 mb-8 bg-surface/95 py-4 backdrop-blur-sm md:top-[84px]">
        <div className="mx-auto flex max-w-[1280px] gap-4 overflow-x-auto whitespace-nowrap px-5 md:px-16">
          <Link
            href={`/${lang}/catalog`}
            className={`active-press rounded-full px-8 py-3 text-sm font-semibold transition-all ${
              !category ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant/30'
            }`}
          >
            {dict.filterAll}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${lang}/catalog?category=${cat.slug}`}
              className={`active-press rounded-full px-8 py-3 text-sm font-semibold transition-all ${
                category === cat.slug
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant/30'
              }`}
            >
              {localizedName({ name_id: cat.name_id, name_en: cat.name_en }, lang)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-16">
        {products.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="font-display text-2xl text-on-surface">{dict.emptyCatalog}</h2>
            <Link
              href={`/${lang}/catalog`}
              className="active-press mt-8 inline-block rounded-full bg-primary px-10 py-4 font-medium text-on-primary shadow-lg shadow-primary/20 transition-transform hover:scale-105"
            >
              {dict.filterAll}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-surface-container-low px-5 py-24 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl italic text-on-surface md:text-4xl">
            {lang === 'en'
              ? '"Every knot is a prayer, every color a story from the land of Kupang."'
              : '"Setiap simpul adalah doa, setiap warna adalah cerita dari tanah Kupang."'}
          </h2>
          <p className="mt-10 leading-loose text-on-surface-variant">{dict.storyBody}</p>
        </div>
      </section>
    </div>
  );
}
