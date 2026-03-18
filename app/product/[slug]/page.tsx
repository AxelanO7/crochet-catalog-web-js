import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { MessageCircle, Globe } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', params.slug)
    .single();

  return {
    title: product ? `${product.name} | Kupang Crochet` : 'Product Not Found',
    description: product?.description || 'Exclusive handcrafted resort wear.',
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!product) notFound();

  // Dual WhatsApp Conversion Logic
  const WA_NUMBER = "6280000000000"; // Replace with your actual WA number
  const localMessage = `Halo Admin, saya tertarik dengan produk *${product.name}*. Berapa harganya?`;
  const globalMessage = `Hello, I am interested in the *${product.name}*. Could you please provide the pricing and international shipping options?`;

  const localWaLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(localMessage)}`;
  const globalWaLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(globalMessage)}`;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[80vh] items-start">
      {/* Left Column: Massive Image (Sticky Setup) */}
      <div className="w-full lg:w-1/2 lg:sticky lg:top-12">
        <div className="rounded-[2rem] overflow-hidden bg-zinc-50 border border-[#e5e5e5] aspect-[4/5] lg:h-[85vh] lg:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column: Content & Pricing Logic */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-6 lg:py-16 xl:pr-12">
        <div className="hidden lg:block mb-12">
          <Link href="/" className="text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]">
            &larr; Back to Catalog
          </Link>
        </div>

        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full border border-[#e5e5e5] mb-6">
            <span 
              className={`w-2 h-2 rounded-full ${
                product.status === 'READY STOCK' ? 'bg-emerald-500' : 'bg-amber-500'
              }`} 
            />
            <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">
              {product.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            {product.name}
          </h1>

          <div className="prose prose-zinc prose-lg min-w-full mb-12 text-zinc-500 leading-relaxed font-medium tracking-tight">
            <p>{product.description}</p>
          </div>

          <div className="border-t border-[#e5e5e5] pt-10">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6">
              Inquire & Purchase
            </h3>
            
            <div className="flex flex-col gap-4 mb-8">
              <a 
                href={localWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 w-full bg-zinc-950 text-white px-8 py-[18px] rounded-2xl font-semibold tracking-wide hover:bg-zinc-800 hover:scale-[1.01] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <span>Tanya Harga & Stok</span>
              </a>
              
              <a 
                href={globalWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 w-full bg-white text-zinc-950 px-8 py-[18px] rounded-2xl font-semibold tracking-wide border border-[#e5e5e5] hover:border-zinc-300 hover:bg-zinc-50 hover:scale-[1.01] shadow-sm transition-all duration-300"
              >
                <Globe className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                <span>International Inquiry</span>
              </a>
            </div>
            
            <div className="bg-zinc-100/40 p-6 rounded-2xl border border-[#e5e5e5] space-y-3">
              <p className="text-sm font-medium text-zinc-500 flex items-center gap-3">
                <span className="w-1 h-1 bg-zinc-300 rounded-full shrink-0" />
                Prices are strictly available upon request.
              </p>
              <p className="text-sm font-medium text-zinc-500 flex items-center gap-3">
                <span className="w-1 h-1 bg-zinc-300 rounded-full shrink-0" />
                Worldwide shipping direct from Kupang, Indonesia.
              </p>
              <p className="text-sm font-medium text-zinc-500 flex items-center gap-3">
                <span className="w-1 h-1 bg-zinc-300 rounded-full shrink-0" />
                Pre-order items may require 2-4 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
