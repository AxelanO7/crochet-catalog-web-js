'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Info, Heart } from 'lucide-react';
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
    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-16">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left: summary + story */}
        <div className="space-y-12 lg:col-span-7">
          <div>
            <h1 className="font-display text-4xl text-on-surface md:text-5xl">{dict.checkoutTitle}</h1>
            <div className="mb-8 mt-4 h-1 w-24 rounded-full bg-primary" />
            <p className="max-w-lg text-lg text-on-surface-variant">{dict.checkoutSubtitle}</p>
          </div>

          <div className="soft-elevation rounded-xl border border-outline-variant/30 bg-surface-container p-8">
            <h2 className="mb-6 flex items-center gap-3 font-display text-xl text-on-surface">
              <ShoppingBag className="h-5 w-5 text-primary" />
              {dict.orderSummary}
            </h2>
            <div className="space-y-6">
              {items.map((i) => (
                <div key={i.productId} className="flex items-center gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface-dim">
                    {i.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={i.image} alt={localizedName(i)} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-display text-lg leading-tight text-on-surface">{localizedName(i)}</p>
                    <p className="text-sm font-medium text-on-surface-variant">
                      {lang === 'en' ? 'Quantity' : 'Jumlah'}: {i.qty}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">Rp {(i.price * i.qty).toLocaleString('id-ID')}</p>
                </div>
              ))}
              <div className="space-y-2 border-t border-outline-variant/50 pt-6">
                <div className="flex items-end justify-between pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="font-display text-3xl leading-none text-primary">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-xl border border-secondary-container/50 bg-surface-container-lowest p-8 md:flex-row">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
              <Heart className="h-7 w-7" />
            </div>
            <div>
              <h3 className="mb-2 font-display text-lg text-on-surface">The Maker&apos;s Note</h3>
              <p className="leading-relaxed text-on-surface-variant">
                {lang === 'en'
                  ? "Every stitch is a tribute to our island's heritage. By purchasing this, you're supporting the local artisans of Kupang."
                  : 'Setiap rajutan adalah penghormatan bagi warisan pulau kami. Dengan membeli produk ini, kamu turut mendukung pengrajin lokal di Kupang.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:sticky lg:top-32 lg:col-span-5">
          <div className="soft-elevation space-y-6 rounded-xl border-2 border-primary/10 bg-surface-container-high p-8">
            <h2 className="font-display text-xl text-on-surface">{lang === 'en' ? 'Your Details' : 'Pemesanan'}</h2>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                {dict.nameLabel} *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={dict.namePlaceholder}
                className="w-full rounded-lg border border-outline-variant/40 bg-white px-4 py-3 text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                {dict.noteLabel}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={dict.notePlaceholder}
                rows={4}
                className="w-full resize-none rounded-lg border border-outline-variant/40 bg-white px-4 py-3 text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-secondary-container/30 p-4 text-secondary">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium leading-snug">{dict.waReassurance}</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name.trim() || submitting}
              className="active-press flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#20ba59] disabled:opacity-50"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {submitting ? (lang === 'en' ? 'Redirecting…' : 'Sedang Mengalihkan…') : dict.orderViaWa}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
