export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '6281231111909';

export function buildWaUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
