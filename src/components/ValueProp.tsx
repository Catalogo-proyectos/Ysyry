'use client';

import React from 'react';
import { Compass, TrendingUp, ShieldCheck } from 'lucide-react';

export const ValueProp: React.FC = () => {
  return (
    <section className="section-padding bg-slate-50 border-y border-slate-200/70">
      <div className="container-custom">
        <div className="section-header text-center">
          <span className="tag-badge">Nuestra Promesa</span>
          <h2 className="font-serif">¿Por qué decidir junto a Ysyry?</h2>
          <p className="subtitle-lead">
            Combinamos visión de mercado, rigor analítico y una atención humana reservada para cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all text-left">
            <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
              <Compass size={28} />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-slate-900">Asesoramiento Integral</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Te acompañamos en todo el proceso de compra, venta o alquiler con total transparencia,
              confidencialidad y profesionalismo adaptado a tus metas.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all text-left">
            <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-slate-900">Oportunidades de Inversión</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Acceso preferencial a desarrollos en pozo, terrenos estratégicos en constante valorización
              y propiedades comerciales con alta rentabilidad en USD.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all text-left">
            <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-slate-900">Seguridad Jurídica & Financiera</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Garantizamos operaciones 100% seguras, respaldadas por escribanos expertos, verificación
              de títulos y asesoría en opciones de crédito inmobiliario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
