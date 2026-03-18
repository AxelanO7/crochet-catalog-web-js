import { products } from '@/lib/data';
import { ProductCard, AnimatedHeroText } from '@/components/ui/ProductCard';

export const revalidate = 60; // ISR cache

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-stone-800">
      {/* Animated Hero using the Client boundary wrapper */}
      <AnimatedHeroText />

      {/* Catalog Grid Component */}
      <section className="px-4 md:px-8 pb-24 max-w-7xl mx-auto w-full">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 w-full flex items-center justify-center border border-dashed border-stone-200 rounded-[2rem] bg-white shadow-sm">
            <p className="text-stone-500 font-medium tracking-wide">
              The catalog is currently empty. More pieces coming soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
