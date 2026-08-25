'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const EditorialSplit: React.FC = () => {
  const { setSearchFilters } = useAppStore();

  return (
    <section className="section-padding bg-slate-50" id="comprar-alquilar">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div className="relative min-h-[460px] md:min-h-[520px] rounded-2xl overflow-hidden flex items-end p-8 md:p-12 text-white shadow-lg group">
            <img
              src="/img/aurora-living.jpg"
              alt="Comprar Inmuebles"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="relative z-10 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 block">
                Inversión & Hogar
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug mb-6">
                Encontrá una propiedad que acompañe tus próximos pasos.
              </h3>
              <a
                href="#propiedades"
                onClick={() => setSearchFilters({ status: 'venta' })}
                className="btn-luxury btn-white-luxury btn-sm-luxury"
              >
                Ver propiedades en venta <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[460px] md:min-h-[520px] rounded-2xl overflow-hidden flex items-end p-8 md:p-12 text-white shadow-lg group">
            <img
              src="/img/horizonte-living.jpg"
              alt="Alquilar Inmuebles"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="relative z-10 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 block">
                Flexibilidad & Estilo
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug mb-6">
                Espacios pensados para comenzar una nueva etapa.
              </h3>
              <a
                href="#propiedades"
                onClick={() => setSearchFilters({ status: 'alquiler' })}
                className="btn-luxury btn-white-luxury btn-sm-luxury"
              >
                Ver propiedades en alquiler <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
