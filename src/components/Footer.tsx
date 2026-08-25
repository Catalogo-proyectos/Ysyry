'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer bg-slate-100 text-slate-900 pt-20 pb-10 border-t border-slate-200" id="contacto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <a href="#" className="flex items-center gap-3 text-slate-900 mb-6">
              <div className="brand-logo-mark">
                <img
                  src="/img/logo-ysyry-montana-bn.svg"
                  alt="Ysyry Inmobiliaria"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="brand-logo-text">Ysyry<span>INMOBILIARIA</span></div>
            </a>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mb-6">
              Catálogo provisorio de propiedades, terrenos y proyectos. La información comercial, documental y de contacto se actualizará antes de la publicación definitiva.
            </p>
            <a
              href="https://wa.me/595981879612?text=Hola%20Ysyry%20Inmobiliaria%2C%20quisiera%20consultar%20sobre%20las%20propiedades."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950 font-medium"
            >
              <MessageCircle size={17} className="text-green-500" /> WhatsApp de demostración
            </a>
          </div>

          <div className="flex flex-col md:items-center">
            <div className="text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6">Navegación</h4>
              <div className="flex flex-col space-y-3.5 text-sm text-slate-600">
                <a href="#propiedades" className="hover:text-slate-950 transition-colors">Propiedades</a>
                <a href="#mapa-satelital" className="hover:text-slate-950 transition-colors">Mapa Satelital</a>
                <a href="#proyecciones" className="hover:text-slate-950 transition-colors">Proyecciones</a>
                <a href="#nosotros" className="hover:text-slate-950 transition-colors">Cómo trabajamos</a>
                <a href="#vender" className="hover:text-slate-950 transition-colors">Vender una propiedad</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; 2026 Ysyry Inmobiliaria.</span>
          <span>Versión de catálogo provisorio</span>
        </div>
      </div>
    </footer>
  );
};
