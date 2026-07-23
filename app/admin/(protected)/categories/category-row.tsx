'use client';

import { useState } from 'react';
import type { Category } from '@/lib/types';
import { updateCategory, toggleCategoryActive } from '../actions';

export default function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateCategory(category.id, formData);
          setEditing(false);
        }}
        className="grid grid-cols-2 gap-3 p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg"
      >
        <input name="slug" defaultValue={category.slug} className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm col-span-2" />
        <input name="name_id" defaultValue={category.name_id} className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        <input name="name_en" defaultValue={category.name_en} className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        <input name="order_index" type="number" defaultValue={category.order_index} className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
        <div className="flex gap-2 col-span-2">
          <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-medium">
            Simpan
          </button>
          <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 text-sm text-on-surface-variant">
            Batal
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg">
      <div>
        <p className="font-medium text-on-surface">{category.name_id} / {category.name_en}</p>
        <p className="text-xs text-on-surface-variant">{category.slug}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs px-2 py-1 rounded-full ${category.is_active ? 'bg-secondary-container text-secondary' : 'bg-surface-container text-outline'}`}>
          {category.is_active ? 'Aktif' : 'Nonaktif'}
        </span>
        <button onClick={() => setEditing(true)} className="text-sm text-primary hover:underline">
          Edit
        </button>
        <button
          onClick={() => toggleCategoryActive(category.id, !category.is_active)}
          className="text-sm text-on-surface-variant hover:underline"
        >
          {category.is_active ? 'Nonaktifkan' : 'Aktifkan'}
        </button>
      </div>
    </div>
  );
}
