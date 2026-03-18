'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    status: string;
    image_url: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const isReady = product.status === 'READY STOCK';

  return (
    <Link href={`/product/${product.slug}`} className="group block focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-2xl h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        {/* Edge-to-edge Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-50">
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Minimalist Card Details */}
        <div className="p-4 md:p-5 flex flex-col flex-grow justify-between gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-stone-800 text-sm md:text-base leading-snug tracking-tight">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1.5 w-fit bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100">
              <span 
                className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-emerald-600' : 'bg-orange-400'}`} 
              />
              <span className="text-[10px] font-semibold text-stone-600 uppercase tracking-widest">
                {product.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Exported Client Component strictly for animating the text in the server-rendered homepage
export function AnimatedHeroText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-800 max-w-3xl leading-[1.1]">
        Handcrafted Crochet <br className="hidden sm:block" /> from Kupang
      </h1>
      <p className="mt-6 text-lg md:text-xl text-stone-500 max-w-2xl font-normal leading-relaxed">
        A premium collection of resort-wear and crochet, meticulously woven with patience to add a touch of warmth to your everyday wardrobe.
      </p>
    </motion.div>
  );
}
