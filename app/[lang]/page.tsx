import { products } from '@/lib/data';
import { getDictionary } from '@/lib/dictionary';
import ProductCard from '@/components/ui/ProductCard';

export function generateStaticParams() {
  return [{ lang: 'id' }, { lang: 'en' }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = getDictionary(lang);

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <section className="text-center max-w-2xl mx-auto mt-8 md:mt-12">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 tracking-tight">{dict.heroTitle}</h1>
        <p className="text-stone-600 text-lg md:text-xl leading-relaxed">
          {dict.heroSubtitle}
        </p>
      </section>

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-500">
          {dict.emptyCatalog}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} lang={lang} priority={index < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
