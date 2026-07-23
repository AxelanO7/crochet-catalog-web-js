export type Locale = 'id' | 'en';

export interface Category {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  order_index: number;
  is_active: boolean;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  order_index: number;
}

export interface Product {
  id: string;
  slug: string;
  category_id: string | null;
  name_id: string;
  name_en: string;
  desc_id: string;
  desc_en: string;
  price: number;
  status: 'READY STOCK' | 'PRE-ORDER';
  is_active: boolean;
  order_index: number;
  category?: Category | null;
  product_images?: ProductImage[];
}

export function localizedName(item: { name_id: string; name_en: string }, lang: string) {
  return lang === 'en' ? item.name_en : item.name_id;
}

export function localizedDesc(item: { desc_id: string; desc_en: string }, lang: string) {
  return lang === 'en' ? item.desc_en : item.desc_id;
}
