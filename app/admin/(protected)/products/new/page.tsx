import { createClient } from '@/lib/supabase/server';
import type { Category } from '@/lib/types';
import ProductForm from '../product-form';

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('categories').select('*').order('order_index');
  const categories = (data as Category[]) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-on-surface mb-6">Tambah Produk</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
