import { MessageCircle } from 'lucide-react';
import { buildWaUrl } from '@/lib/wa';

export default function WhatsAppFab() {
  const url = buildWaUrl('Halo Rianne Collective, saya ingin bertanya tentang produk kalian.');
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="active-press group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded bg-on-surface px-3 py-1 text-xs text-surface opacity-0 transition-opacity group-hover:opacity-100">
        Tanya Kami
      </span>
    </a>
  );
}
