const DEFAULT_WHATSAPP = '595981879612';

export function whatsappUrl(message: string, phone?: string): string {
  const number = phone || DEFAULT_WHATSAPP;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}