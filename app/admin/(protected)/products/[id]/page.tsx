import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Category, Product } from '@/lib/types';
import ProductForm from '../product-form';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: product }, { data: cats }] = await Promise.all([
    supabase.from('products').select('*, product_images(*)').eq('id', id).single(),
    supabase.from('categories').select('*').order('order_index'),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-on-surface mb-6">Edit Produk</h1>
      <ProductForm categories={(cats as Category[]) ?? []} product={product as unknown as Product} />
    </div>
  );
}
