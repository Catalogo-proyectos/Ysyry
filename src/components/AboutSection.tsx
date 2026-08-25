'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="section-padding bg-white" id="nosotros">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18),0_10px_25px_-5px_rgba(15,23,42,0.08)] border border-slate-200/80 aspect-[4/3] lg:aspect-auto lg:h-[540px]">
            <img
              src="/img/logo-ysyry-montana-bn.png"
              alt="Logo Ysyry"
              className="w-full h-full object-contain bg-white p-8 sm:p-12"
            />
          </div>

          <div className="text-left">
            <span className="tag-badge">Nuestra forma de trabajar</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight text-slate-900">
              Información ordenada.<br />
              Decisiones con más claridad.
            </h2>
            <p className="text-slate-600 mb-5 text-base sm:text-lg leading-relaxed">
              Cada propiedad se presenta con su estado real, su documentación disponible y una vía de contacto directa. Mientras el catálogo está en actualización, distinguimos con claridad qué datos son provisorios.
            </p>
            <p className="text-slate-600 mb-8 text-base sm:text-lg leading-relaxed">
              Las proyecciones y simulaciones sirven para mostrar potencial, pero nunca reemplazan las fotografías originales ni se presentan como una obra terminada.
            </p>

            <a
              href="https://wa.me/595981879612?text=Hola%20Ysyry%20Inmobiliaria%2C%20quisiera%20hablar%20con%20un%20asesor."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-primary-luxury"
            >
              Hablar con un asesor <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
