import { supabase } from '@/lib/supabase';
import { ProductCard, AnimatedHeroText } from '@/components/ui/ProductCard';

export const revalidate = 60; // ISR cache

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated Hero using the Client boundary wrapper */}
      <AnimatedHeroText />

      {/* Mobbin-style Bento Grid Component */}
      <section>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 w-full flex items-center justify-center border border-dashed border-[#e5e5e5] rounded-[2rem] bg-zinc-50/50">
            <p className="text-zinc-500 font-medium tracking-wide">
              The catalog is currently empty. More pieces coming soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
