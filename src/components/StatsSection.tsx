'use client';

import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    { number: '+150', label: 'Propiedades Comercializadas' },
    { number: '+10', label: 'Años de Experiencia en el Mercado' },
    { number: '98%', label: 'Clientes Satisfechos' },
    { number: '+500', label: 'Personas & Familias Acompañadas' }
  ];

  return (
    <section className="section-padding bg-slate-50 border-y border-slate-200/80" id="estadisticas">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 md:p-8">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-none mb-3">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-slate-600 font-medium max-w-xs mx-auto">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
