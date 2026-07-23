'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/admin/image-uploader';
import { saveProduct } from '../actions';
import type { Category, Product } from '@/lib/types';

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(
    product?.product_images?.map((i) => i.url) ?? []
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    await saveProduct(product?.id ?? null, {
      slug: String(formData.get('slug')),
      category_id: String(formData.get('category_id')) || null,
      name_id: String(formData.get('name_id')),
      name_en: String(formData.get('name_en')),
      desc_id: String(formData.get('desc_id')),
      desc_en: String(formData.get('desc_en')),
      price: Number(formData.get('price')),
      status: formData.get('status') as 'READY STOCK' | 'PRE-ORDER',
      images,
    });
    setSaving(false);
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div>
        <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Foto Produk</label>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Slug</label>
          <input name="slug" defaultValue={product?.slug} required className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Kategori</label>
          <select name="category_id" defaultValue={product?.category_id ?? ''} className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm">
            <option value="">-</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name_id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Nama (ID)</label>
          <input name="name_id" defaultValue={product?.name_id} required className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Name (EN)</label>
          <input name="name_en" defaultValue={product?.name_en} required className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Deskripsi (ID)</label>
          <textarea name="desc_id" defaultValue={product?.desc_id} rows={3} className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Description (EN)</label>
          <textarea name="desc_en" defaultValue={product?.desc_en} rows={3} className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Harga (Rp)</label>
          <input name="price" type="number" defaultValue={product?.price} required className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wide mb-1 block">Status</label>
          <select name="status" defaultValue={product?.status ?? 'READY STOCK'} className="w-full px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm">
            <option value="READY STOCK">READY STOCK</option>
            <option value="PRE-ORDER">PRE-ORDER</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="self-start px-6 py-3 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary-container disabled:opacity-50"
      >
        {saving ? 'Menyimpan…' : 'Simpan Produk'}
      </button>
    </form>
  );
}
