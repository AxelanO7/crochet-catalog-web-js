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
    <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-on-surface mb-2">{dict.catalogTitle}</h1>
        <p className="text-on-surface-variant">{dict.catalogSubtitle}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center flex-wrap">
        <Link
          href={`/${lang}/catalog`}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
            !category
              ? 'bg-primary text-on-primary border-primary'
              : 'border-outline-variant text-on-surface-variant hover:border-primary'
          }`}
        >
          {dict.filterAll}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${lang}/catalog?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
              category === cat.slug
                ? 'bg-primary text-on-primary border-primary'
                : 'border-outline-variant text-on-surface-variant hover:border-primary'
            }`}
          >
            {localizedName({ name_id: cat.name_id, name_en: cat.name_en }, lang)}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-center text-on-surface-variant py-20">{dict.emptyCatalog}</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
