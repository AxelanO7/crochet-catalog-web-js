'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { getDictionary } from '@/lib/dictionary';
import { buildWaUrl } from '@/lib/wa';
import { createClient } from '@/lib/supabase/client';

export default function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const dict = getDictionary(lang);
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const localizedName = (i: { name_id: string; name_en: string }) => (lang === 'en' ? i.name_en : i.name_id);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace(`/${lang}/cart`);
    }
  }, [mounted, items.length, lang, router]);

  async function handleSubmit() {
    if (!name.trim() || items.length === 0) return;
    setSubmitting(true);

    const lines = [
      `Halo ${dict.brand}, saya ingin memesan:`,
      ...items.map((i) => `- ${localizedName(i)} x${i.qty} — Rp ${(i.price * i.qty).toLocaleString('id-ID')}`),
      `Subtotal: Rp ${subtotal.toLocaleString('id-ID')}`,
      `Nama: ${name}`,
      note ? `Catatan: ${note}` : '',
    ].filter(Boolean);

    try {
      const supabase = createClient();
      await supabase.from('orders').insert({
        customer_name: name,
        customer_note: note || null,
        items: items.map((i) => ({
          product_id: i.productId,
          name: localizedName(i),
          qty: i.qty,
          price: i.price,
        })),
        subtotal,
        payment_method: 'whatsapp',
        payment_status: 'not_applicable',
      });
    } catch {
      // order log is best-effort — do not block the WA flow if it fails
    }

    window.open(buildWaUrl(lines.join('\n')), '_blank');
    clear();
    setSubmitting(false);
    router.push(`/${lang}`);
  }

  if (!mounted || items.length === 0) return null;

  return (
    <div className="max-w-[700px] mx-auto px-5 md:px-12 py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-on-surface mb-2">{dict.checkoutTitle}</h1>
        <p className="text-on-surface-variant">{dict.checkoutSubtitle}</p>
      </div>

      <div className="p-6 bg-surface-container-low rounded-lg mb-6">
        <h2 className="font-medium text-on-surface-variant mb-3">{dict.orderSummary}</h2>
        <div className="flex flex-col gap-2 mb-4">
          {items.map((i) => (
            <div key={i.productId} className="flex justify-between text-sm text-on-surface">
              <span>
                {localizedName(i)} x{i.qty}
              </span>
              <span>Rp {(i.price * i.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center border-t border-outline-variant/40 pt-3">
          <span className="font-medium text-on-surface-variant">{dict.subtotal}</span>
          <span className="font-display text-xl text-on-surface">Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-soft">
        <div>
          <label className="text-sm font-medium text-on-surface-variant mb-2 block uppercase tracking-wide">
            {dict.nameLabel}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={dict.namePlaceholder}
            className="w-full px-4 py-3 rounded-md bg-surface border border-outline-variant/50 focus:border-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-on-surface-variant mb-2 block uppercase tracking-wide">
            {dict.noteLabel}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={dict.notePlaceholder}
            rows={3}
            className="w-full px-4 py-3 rounded-md bg-surface border border-outline-variant/50 focus:border-primary outline-none transition-colors resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim() || submitting}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-on-secondary font-medium rounded-full transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          {dict.orderViaWa}
        </button>
        <p className="text-xs text-on-surface-variant text-center">{dict.waReassurance}</p>
      </div>
    </div>
  );
}
