'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { whatsappUrl } from '@/lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = useAppStore((state) => state.whatsappNumber)();
  return (
    <a
      href={whatsappUrl('Hola Ysyry Inmobiliaria, quisiera recibir asesoramiento personalizado.', whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      title="Contactar por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};