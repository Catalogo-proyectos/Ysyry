'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const SellerBanner: React.FC = () => {
  const { openSellerModal } = useAppStore();

  return (
    <section className="section-padding bg-white" id="vender">
      <div className="container-custom">
        <div className="bg-slate-900 text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl border border-white/10">
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 flex flex-col justify-center text-left">
            <span
              className="tag-badge self-start"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              Para propietarios
            </span>
            <h2 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight">
              ¿Pensás vender tu propiedad?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Te acompañamos desde la primera evaluación hasta el cierre de la operación, con una
              estrategia pensada para mostrar el verdadero valor de tu propiedad ante los compradores correctos.
            </p>
            <div className="w-full flex justify-center sm:justify-start">
              <a
                href="https://wa.me/595981879612?text=Hola%20Ysyry%20Inmobiliaria%2C%20tengo%20una%20propiedad%20y%20quisiera%20asesoramiento%20para%20venderla."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury btn-white-luxury w-full sm:w-auto justify-center text-center shadow-lg"
              >
                Quiero vender mi propiedad <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 min-h-[300px] lg:min-h-full relative">
            <img
              src="/img/aurora-cta.jpg"
              alt="Vender propiedad con Ysyry"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
