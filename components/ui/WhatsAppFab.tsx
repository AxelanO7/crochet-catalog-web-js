import { MessageCircle } from 'lucide-react';
import { buildWaUrl } from '@/lib/wa';

export default function WhatsAppFab() {
  const url = buildWaUrl('Halo Rianne Collective, saya ingin bertanya tentang produk kalian.');
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-secondary text-on-secondary shadow-soft hover:scale-105 transition-transform"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
