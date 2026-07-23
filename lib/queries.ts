import { createClient } from '@/lib/supabase/server';
import type { Category, Product } from '@/lib/types';

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
  return data ?? [];
}

export type CategoryWithImage = Category & { image: string | null };

export async function getCategoriesWithImage(): Promise<CategoryWithImage[]> {
  const supabase = await createClient();
  const categories = await getCategories();
  const { data: products } = await supabase
    .from('products')
    .select('category_id, order_index, product_images(url, order_index)')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  return categories.map((cat) => {
    const match = (products ?? []).find((p) => p.category_id === cat.id);
    const images = (match?.product_images ?? []) as { url: string; order_index: number }[];
    const image = images.slice().sort((a, b) => a.order_index - b.order_index)[0]?.url ?? null;
    return { ...cat, image };
  });
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from('products')
    .select('*, category:categories(*), product_images(*)')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (categorySlug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  const { data } = await query;
  return (data as unknown as Product[]) ?? [];
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), product_images(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return (data as unknown as Product) ?? null;
}
