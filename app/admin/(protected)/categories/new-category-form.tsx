'use client';

import { useRef } from 'react';
import { createCategory } from '../actions';

export default function NewCategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createCategory(formData);
        formRef.current?.reset();
      }}
      className="grid grid-cols-2 gap-3"
    >
      <input name="slug" placeholder="slug (contoh: tas)" required className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm col-span-2" />
      <input name="name_id" placeholder="Nama (ID)" required className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
      <input name="name_en" placeholder="Name (EN)" required className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
      <input name="order_index" type="number" defaultValue={0} placeholder="Urutan" className="px-3 py-2 rounded-md border border-outline-variant/50 bg-surface text-sm" />
      <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-medium hover:bg-primary-container">
        Tambah
      </button>
    </form>
  );
}
