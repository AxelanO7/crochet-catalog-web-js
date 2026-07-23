'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  await supabase.from('categories').insert({
    slug: String(formData.get('slug')),
    name_id: String(formData.get('name_id')),
    name_en: String(formData.get('name_en')),
    order_index: Number(formData.get('order_index') || 0),
  });
  revalidatePath('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from('categories')
    .update({
      slug: String(formData.get('slug')),
      name_id: String(formData.get('name_id')),
      name_en: String(formData.get('name_en')),
      order_index: Number(formData.get('order_index') || 0),
    })
    .eq('id', id);
  revalidatePath('/admin/categories');
}

export async function toggleCategoryActive(id: string, isActive: boolean) {
  const supabase = await createClient();
  await supabase.from('categories').update({ is_active: isActive }).eq('id', id);
  revalidatePath('/admin/categories');
}

export async function saveProduct(
  productId: string | null,
  data: {
    slug: string;
    category_id: string | null;
    name_id: string;
    name_en: string;
    desc_id: string;
    desc_en: string;
    price: number;
    status: 'READY STOCK' | 'PRE-ORDER';
    images: string[];
  }
) {
  const supabase = await createClient();
  const { images, ...productData } = data;

  let id = productId;
  if (id) {
    await supabase.from('products').update(productData).eq('id', id);
    await supabase.from('product_images').delete().eq('product_id', id);
  } else {
    const { data: inserted, error } = await supabase
      .from('products')
      .insert(productData)
      .select('id')
      .single();
    if (error || !inserted) throw new Error(error?.message || 'Failed to create product');
    id = inserted.id;
  }

  if (images.length > 0) {
    await supabase.from('product_images').insert(
      images.map((url, order_index) => ({ product_id: id, url, order_index }))
    );
  }

  revalidatePath('/admin/products');
  revalidatePath('/[lang]', 'layout');
}

export async function toggleProductActive(id: string, isActive: boolean) {
  const supabase = await createClient();
  await supabase.from('products').update({ is_active: isActive }).eq('id', id);
  revalidatePath('/admin/products');
  revalidatePath('/[lang]', 'layout');
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from('orders').update({ status }).eq('id', id);
  revalidatePath('/admin/orders');
}
