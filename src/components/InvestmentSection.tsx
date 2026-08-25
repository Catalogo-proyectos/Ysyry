'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';

export const InvestmentSection: React.FC = () => {
  const { openSellerModal } = useAppStore();

  return (
    <section className="section-padding bg-slate-950 text-white" id="inversion">
      <div className="container-custom">
        <div className="section-header text-center">
          <span
            className="tag-badge"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            Macroeconómia & Oportunidad
          </span>
          <h2 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl">
            Paraguay: Un Clima Ideal para Tu Inversión.
          </h2>
          <p className="subtitle-lead text-slate-300">
            Un entorno económico estable, regímenes impositivos competitivos y una acelerada expansión
            urbana convierten a Asunción en el polo de inversión inmobiliaria de mayor crecimiento en la región.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-8 hover:-translate-y-1.5 hover:border-blue-500 transition-all text-left">
            <div className="font-serif text-4xl font-normal text-white mb-2">6.5% - 9%</div>
            <h3 className="text-lg font-medium text-white mb-2">Retorno Anual en USD</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Atractivos rendimientos por alquiler residencial y corporativo en dólares americanos.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-8 hover:-translate-y-1.5 hover:border-blue-500 transition-all text-left">
            <div className="font-serif text-4xl font-normal text-white mb-2">10-10-10</div>
            <h3 className="text-lg font-medium text-white mb-2">Carga Fiscal Reducida</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sistema tributario simple y predecible (IVA, Impuesto a la Renta Corporativa y Personal).
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-8 hover:-translate-y-1.5 hover:border-blue-500 transition-all text-left">
            <div className="font-serif text-4xl font-normal text-white mb-2">+4.2%</div>
            <h3 className="text-lg font-medium text-white mb-2">Crecimiento del PIB</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Constante solidez macroeconómica y baja inflación anual controlada por el BCP.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-8 hover:-translate-y-1.5 hover:border-blue-500 transition-all text-left">
            <div className="font-serif text-4xl font-normal text-white mb-2">Plusvalía</div>
            <h3 className="text-lg font-medium text-white mb-2">Zonas en Expansión</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Alta revalorización de suelos en ejes corporativos de Asunción y ciudades balnearias.
            </p>
          </div>
        </div>

        <div className="text-center mt-14">
          <button onClick={openSellerModal} className="btn-luxury btn-white-luxury">
            Solicitar Informe de Inversión
          </button>
        </div>
      </div>
    </section>
  );
};
