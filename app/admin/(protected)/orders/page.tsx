import { createClient } from '@/lib/supabase/server';
import OrderStatusSelect from './order-status-select';

interface OrderItem { name: string; qty: number; price: number }
interface OrderRow {
  id: string;
  customer_name: string;
  customer_note: string | null;
  items: OrderItem[];
  subtotal: number;
  status: string;
  created_at: string;
}

export default async function OrdersAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  const orders = (data as OrderRow[]) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-on-surface mb-6">Log Pesanan</h1>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order.id} className="p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-on-surface">{order.customer_name}</p>
                <p className="text-xs text-on-surface-variant">
                  {new Date(order.created_at).toLocaleString('id-ID')}
                </p>
              </div>
              <OrderStatusSelect id={order.id} status={order.status} />
            </div>
            <ul className="text-sm text-on-surface-variant mb-2">
              {order.items?.map((item, i) => (
                <li key={i}>
                  {item.name} x{item.qty} — Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-on-surface">Subtotal: Rp {order.subtotal.toLocaleString('id-ID')}</p>
            {order.customer_note && (
              <p className="text-xs text-on-surface-variant mt-1 italic">Catatan: {order.customer_note}</p>
            )}
          </div>
        ))}
        {orders.length === 0 && <p className="text-on-surface-variant text-sm">Belum ada pesanan masuk.</p>}
      </div>
    </div>
  );
}
