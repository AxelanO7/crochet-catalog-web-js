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
    <Link href={`/product/${product.slug}`} className="group block focus:outline-none focus:ring-2 focus:ring-zinc-900 rounded-2xl h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-full bg-white rounded-2xl border border-[#e5e5e5] hover:border-zinc-300 transition-colors overflow-hidden"
      >
        {/* Edge-to-edge Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50">
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />
        </div>

        {/* Minimalist Card Details */}
        <div className="p-5 flex flex-col flex-grow justify-between gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-zinc-900 text-base leading-snug tracking-tight">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1.5 shrink-0 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] px-2.5 py-1 rounded-full border border-[#e5e5e5]">
              <span 
                className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              />
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
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
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 md:mb-24"
    >
      <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tighter text-zinc-950 max-w-5xl leading-[1.05]">
        Handcrafted in Kupang.
        <br className="hidden md:block" />
        <span className="text-zinc-400">Worn Worldwide.</span>
      </h1>
      <p className="mt-8 text-xl text-zinc-500 max-w-2xl font-medium tracking-tight">
        A premium collection of resort-wear and crochet, meticulously woven with patience, preserving culture in every thread.
      </p>
    </motion.div>
  );
}
