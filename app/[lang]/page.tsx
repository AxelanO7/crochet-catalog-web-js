import Link from 'next/link';
import { Leaf, Users, ShieldCheck } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';
import { getCategoriesWithImage, getFeaturedProducts } from '@/lib/queries';
import ProductCard from '@/components/ui/ProductCard';
import { localizedName } from '@/lib/types';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const [categories, featured] = await Promise.all([getCategoriesWithImage(), getFeaturedProducts(6)]);
  const storyImage = featured[0]?.product_images?.[0]?.url;

  return (
    <div className="flex flex-col">
      {/* Hero — full-bleed background */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden md:min-h-[700px]">
        <div className="absolute inset-0 z-0">
          {storyImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={storyImage} alt="" className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-24 md:px-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl leading-tight text-on-surface md:text-6xl">{dict.heroTitle}</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-surface-variant">{dict.heroSubtitle}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${lang}/catalog`}
                className="active-press soft-elevation rounded-lg bg-primary px-8 py-4 text-center font-medium text-on-primary transition-all hover:bg-primary-container"
              >
                {dict.heroCta}
              </Link>
              <Link
                href={`/${lang}#story`}
                className="active-press rounded-lg border border-secondary px-8 py-4 text-center font-medium text-secondary transition-all hover:bg-surface-container"
              >
                {lang === 'en' ? 'Learn Our Story' : 'Pelajari Kisah Kami'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase — photo tiles */}
      {categories.length > 0 && (
        <section className="bg-surface-container-low py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-16">
            <div className="mb-16 text-center">
              <h2 className="font-display text-3xl text-on-surface">{dict.categoryTitle}</h2>
              <div className="mx-auto mt-4 h-1 w-12 bg-tertiary" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${lang}/catalog?category=${cat.slug}`}
                  className="soft-elevation group relative aspect-[3/4] overflow-hidden rounded-xl"
                >
                  {cat.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cat.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="font-display text-2xl">{localizedName({ name_id: cat.name_id, name_en: cat.name_en }, lang)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="py-24" id="catalog">
        <div className="mx-auto max-w-[1280px] px-5 md:px-16">
          <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div className="max-w-md">
              <h2 className="font-display text-3xl text-on-surface">{dict.featuredTitle}</h2>
              <p className="mt-2 text-on-surface-variant">
                {lang === 'en'
                  ? 'The best picks from our Kupang artisans, made in limited quantities to keep them special.'
                  : 'Pilihan terbaik dari perajin kami di Kupang, dibuat terbatas untuk menjaga keunikan.'}
              </p>
            </div>
            <Link href={`/${lang}/catalog`} className="font-medium text-primary transition-all hover:gap-2">
              {lang === 'en' ? 'View All Products →' : 'Lihat Semua Produk →'}
            </Link>
          </div>
          {featured.length === 0 ? (
            <p className="py-16 text-center text-on-surface-variant">{dict.emptyCatalog}</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Maker's Note — 2 column story */}
      <section className="bg-surface-container-highest py-24" id="story">
        <div className="mx-auto max-w-[1280px] overflow-hidden px-5 md:px-16">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="relative">
              <div className="soft-elevation aspect-square overflow-hidden rounded-2xl bg-surface-container">
                {featured[1]?.product_images?.[0]?.url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={featured[1].product_images[0].url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-4xl italic text-on-surface md:text-5xl">The Maker&apos;s Note</h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">{dict.storyBody}</p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center font-medium text-secondary">
                  <Leaf className="mr-3 h-5 w-5 text-primary" />
                  {lang === 'en' ? '100% Sustainable Cotton' : '100% Kapas Berkelanjutan'}
                </li>
                <li className="flex items-center font-medium text-secondary">
                  <Users className="mr-3 h-5 w-5 text-primary" />
                  {lang === 'en' ? 'Community Empowerment' : 'Memberdayakan Komunitas'}
                </li>
                <li className="flex items-center font-medium text-secondary">
                  <ShieldCheck className="mr-3 h-5 w-5 text-primary" />
                  {lang === 'en' ? 'Authentic NTT Craftsmanship' : 'Kerajinan Asli NTT'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
