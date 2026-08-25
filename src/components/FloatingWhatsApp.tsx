'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/595981879612?text=Hola%20Ysyry%20Inmobiliaria%2C%20quisiera%20recibir%20asesoramiento%20personalizado."
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
