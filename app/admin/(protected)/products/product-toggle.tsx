'use client';

import { toggleProductActive } from '../actions';

export default function ProductToggle({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <button
      onClick={() => toggleProductActive(id, !isActive)}
      className="text-sm text-on-surface-variant hover:underline"
    >
      {isActive ? 'Nonaktifkan' : 'Aktifkan'}
    </button>
  );
}
