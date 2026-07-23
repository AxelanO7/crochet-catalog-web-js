import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from './logout-button';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-56 flex-shrink-0 border-r border-outline-variant/40 bg-surface-container-lowest flex flex-col p-5">
        <span className="font-display text-lg text-on-surface mb-8">Rianne Admin</span>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href="/admin/products" className="px-3 py-2 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface">
            Produk
          </Link>
          <Link href="/admin/categories" className="px-3 py-2 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface">
            Kategori
          </Link>
          <Link href="/admin/orders" className="px-3 py-2 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface">
            Pesanan
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-outline-variant/30">
          <p className="text-xs text-outline mb-2 truncate">{user?.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto">{children}</main>
    </div>
  );
}
