import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { getCategories, getFeaturedProducts } from '@/lib/queries';
import ProductCard from '@/components/ui/ProductCard';
import { localizedName } from '@/lib/types';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedProducts(4)]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-container-low">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-16 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
            <h1 className="font-display text-4xl md:text-6xl leading-tight text-on-surface">
              {dict.heroTitle}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
              {dict.heroSubtitle}
            </p>
            <Link
              href={`/${lang}/catalog`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-on-primary font-medium hover:bg-primary-container transition-colors"
            >
              {dict.heroCta}
            </Link>
          </div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
              alt="Rianne Collective handmade crochet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-[1400px] mx-auto w-full px-5 md:px-12 py-14 md:py-20">
          <h2 className="font-display text-2xl md:text-3xl text-on-surface mb-8 text-center md:text-left">
            {dict.categoryTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${lang}/catalog?category=${cat.slug}`}
                className="rounded-lg bg-surface-container-lowest border border-outline-variant/30 shadow-soft p-6 text-center hover:-translate-y-1 transition-transform"
              >
                <span className="font-display text-lg text-on-surface">
                  {localizedName({ name_id: cat.name_id, name_en: cat.name_en }, lang)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="max-w-[1400px] mx-auto w-full px-5 md:px-12 py-14 md:py-20">
        <h2 className="font-display text-2xl md:text-3xl text-on-surface mb-8 text-center md:text-left">
          {dict.featuredTitle}
        </h2>
        {featured.length === 0 ? (
          <p className="text-center text-on-surface-variant py-16">{dict.emptyCatalog}</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        )}
      </section>

      {/* Story */}
      <section className="bg-surface-container-low">
        <div className="max-w-[900px] mx-auto px-5 md:px-12 py-16 md:py-24 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-on-surface mb-6">{dict.storyTitle}</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">{dict.storyBody}</p>
        </div>
      </section>
    </div>
  );
}
