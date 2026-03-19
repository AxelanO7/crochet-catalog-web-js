import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  lang: string;
  priority?: boolean;
}

export default function ProductCard({ product, lang, priority }: ProductCardProps) {
  const isId = lang === 'id';
  
  return (
    <Link href={`/${lang}/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full border border-stone-100">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
          {/* <Image
            src={product.image_url}
            alt={isId ? product.name.id : product.name.en}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
          <img
            src={product.image_url}
            alt={isId ? product.name.id : product.name.en}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-800">
            {product.status}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">
            {isId ? product.category.id : product.category.en}
          </p>
          <h3 className="text-lg font-semibold text-stone-800 leading-snug">
            {isId ? product.name.id : product.name.en}
          </h3>
        </div>
      </div>
    </Link>
  );
}
