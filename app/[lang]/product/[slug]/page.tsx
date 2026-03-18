import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { getDictionary } from '@/lib/dictionary';

export function generateStaticParams() {
  const locales = ['id', 'en'];
  const params: { lang: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const product of products) {
      params.push({ lang: locale, slug: product.slug });
    }
  }

  return params;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const dict = getDictionary(lang);
  
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const isId = lang === 'id';
  const productName = isId ? product.name.id : product.name.en;
  const productDesc = isId ? product.description.id : product.description.en;
  const productCat = isId ? product.category.id : product.category.en;

  const waNumber = '6281234567890';
  const msgLocal = `Halo Admin Xedric Crochet, saya tertarik dengan produk *${product.name.id}*. Berapa harganya?`;
  const msgGlobal = `Hello Xedric Crochet Admin, I am interested in the *${product.name.en}*. Could you please provide the pricing and shipping options?`;

  const waLinkLocal = `https://wa.me/${waNumber}?text=${encodeURIComponent(msgLocal)}`;
  const waLinkGlobal = `https://wa.me/${waNumber}?text=${encodeURIComponent(msgGlobal)}`;

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-16">
      <Link
        href={`/${lang}`}
        className="inline-block mb-8 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium"
      >
        {dict.backToCatalog}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start border-stone-100">
        {/* Left side massive image */}
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAFAFA] border border-stone-100 shadow-sm">
          <Image
            src={product.image_url}
            alt={productName}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right side content */}
        <div className="flex flex-col gap-6 md:sticky md:top-28">
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-widest mb-3">
              {productCat}
            </p>
            <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 leading-tight mb-4">
              {productName}
            </h1>
            <div className="inline-block bg-stone-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-stone-800">
              {product.status}
            </div>
          </div>

          <p className="text-lg text-stone-600 leading-relaxed mt-2 mb-4">
            {productDesc}
          </p>

          <div className="flex flex-col gap-4 mt-4 p-8 bg-white border border-stone-100 rounded-2xl shadow-sm">
            <h3 className="text-stone-900 font-semibold text-lg mb-2">{dict.inquireTitle}</h3>
            
            {isId ? (
              <a
                href={waLinkLocal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors"
              >
                {dict.btnLocal}
              </a>
            ) : (
              <a
                href={waLinkGlobal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 border-2 border-stone-200 text-stone-800 hover:bg-stone-50 font-medium rounded-xl transition-colors"
              >
                {dict.btnGlobal}
              </a>
            )}
          </div>

          <p className="text-xs text-stone-400 mt-6 italic">
            {dict.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
