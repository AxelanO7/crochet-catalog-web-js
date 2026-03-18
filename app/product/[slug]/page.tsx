import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MessageCircle, Globe } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  return {
    title: product ? `${product.name} | Kupang Crochet` : 'Product Not Found',
    description: product?.description || 'Exclusive handcrafted resort wear.',
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) notFound();

  // Dual WhatsApp Conversion Logic
  const WA_NUMBER = "6280000000000"; // Replace with your actual WA number
  const localMessage = `Halo Admin, saya tertarik dengan produk *${product.name}*. Berapa harganya?`;
  const globalMessage = `Hello, I am interested in the *${product.name}*. Could you please provide the pricing and international shipping options?`;

  const localWaLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(localMessage)}`;
  const globalWaLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(globalMessage)}`;

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16">
        <div className="mb-8 lg:mb-12">
          <Link href="/" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors tracking-wide">
            &larr; Back to Catalog
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Column: Image */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8">
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm aspect-[3/4] lg:h-[80vh] lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-4 lg:py-10">
            <div className="max-w-xl lg:pr-8">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-sm mb-6">
                <span 
                  className={`w-2 h-2 rounded-full ${
                    product.status === 'READY STOCK' ? 'bg-emerald-600' : 'bg-orange-400'
                  }`} 
                />
                <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">
                  {product.status}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-stone-800 mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="prose prose-stone prose-lg min-w-full mb-12 text-stone-600 leading-relaxed font-normal">
                <p>{product.description}</p>
              </div>

              <div className="border-t border-stone-200 pt-10">
                <h3 className="text-sm font-semibold text-stone-800 mb-6">
                  Inquire & Purchase
                </h3>
                
                <div className="flex flex-col gap-4 mb-8">
                  <a 
                    href={localWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-3 w-full bg-orange-600 text-white px-8 py-[18px] rounded-xl font-medium tracking-wide hover:bg-orange-700 hover:shadow-md transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 opacity-90" />
                    <span>Tanya Harga & Stok</span>
                  </a>
                  
                  <a 
                    href={globalWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-3 w-full bg-white text-stone-800 px-8 py-[18px] rounded-xl font-medium tracking-wide border-2 border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all duration-300"
                  >
                    <Globe className="w-5 h-5 text-stone-500 group-hover:text-stone-700 transition-colors" />
                    <span>International Inquiry</span>
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                  <p className="text-sm font-medium text-stone-600 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full shrink-0" />
                    Prices are strictly available upon request.
                  </p>
                  <p className="text-sm font-medium text-stone-600 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full shrink-0" />
                    Worldwide shipping direct from Kupang, Indonesia.
                  </p>
                  <p className="text-sm font-medium text-stone-600 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full shrink-0" />
                    Pre-order items may require 2-4 weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
