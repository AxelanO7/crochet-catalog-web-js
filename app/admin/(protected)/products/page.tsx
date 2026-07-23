import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';
import ProductToggle from './product-toggle';

export default async function ProductsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*), product_images(*)')
    .order('order_index');
  const products = (data as unknown as Product[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-on-surface">Kelola Produk</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary-container"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg"
          >
            <div className="h-14 w-14 rounded-md overflow-hidden bg-surface-container flex-shrink-0">
              {p.product_images?.[0] && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.product_images[0].url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-on-surface truncate">{p.name_id}</p>
              <p className="text-xs text-on-surface-variant">
                {p.category?.name_id ?? '-'} · Rp {p.price.toLocaleString('id-ID')} · {p.status}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${p.is_active ? 'bg-secondary-container text-secondary' : 'bg-surface-container text-outline'}`}>
              {p.is_active ? 'Aktif' : 'Nonaktif'}
            </span>
            <Link href={`/admin/products/${p.id}`} className="text-sm text-primary hover:underline">
              Edit
            </Link>
            <ProductToggle id={p.id} isActive={p.is_active} />
          </div>
        ))}
        {products.length === 0 && <p className="text-on-surface-variant text-sm">Belum ada produk.</p>}
      </div>
    </div>
  );
}
