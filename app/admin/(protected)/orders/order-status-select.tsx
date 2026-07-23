'use client';

import { updateOrderStatus } from '../actions';

const STATUSES = ['new', 'contacted', 'done', 'cancelled'];

export default function OrderStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <select
      defaultValue={status}
      onChange={(e) => updateOrderStatus(id, e.target.value)}
      className="text-xs px-2 py-1 rounded-md border border-outline-variant/50 bg-surface"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
