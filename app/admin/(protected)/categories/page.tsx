import { createClient } from '@/lib/supabase/server';
import type { Category } from '@/lib/types';
import CategoryRow from './category-row';
import NewCategoryForm from './new-category-form';

export default async function CategoriesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('categories').select('*').order('order_index');
  const categories = (data as Category[]) ?? [];

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-on-surface mb-6">Kelola Kategori</h1>

      <div className="flex flex-col gap-3 mb-8">
        {categories.map((cat) => (
          <CategoryRow key={cat.id} category={cat} />
        ))}
        {categories.length === 0 && (
          <p className="text-on-surface-variant text-sm">Belum ada kategori.</p>
        )}
      </div>

      <div className="p-5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg">
        <h2 className="font-medium text-on-surface mb-3">Tambah Kategori</h2>
        <NewCategoryForm />
      </div>
    </div>
  );
}
