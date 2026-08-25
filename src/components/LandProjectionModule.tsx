'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { landProjectionsData } from '@/data/projections';
import { ProjectionType } from '@/types/property';
import { Info, Sparkles } from 'lucide-react';

export const LandProjectionModule: React.FC = () => {
  const { activeProjection, setActiveProjection } = useAppStore();
  const currentProjection = landProjectionsData[activeProjection] || landProjectionsData.quinta;

  return (
    <section className="section-padding bg-slate-50" id="proyecciones">
      <div className="container-custom">
        <div className="section-header text-left">
          <span className="tag-badge">Visualizá el potencial</span>
          <h2 className="font-serif">El estado actual y una posibilidad futura.</h2>
          <p className="subtitle-lead">
            Las simulaciones acompañan el material real para ayudar a imaginar una mejora o un desarrollo. Siempre se identifican como ilustrativas.
          </p>
        </div>

        <div className="projection-workbench">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex flex-wrap gap-2 p-1.5 bg-white border border-slate-200 rounded-full mb-8 shadow-sm">
                {(['quinta', 'duplex'] as ProjectionType[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveProjection(key)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeProjection === key
                        ? 'bg-slate-900 text-white shadow'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {landProjectionsData[key].label}
                  </button>
                ))}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 transition-all">
                {currentProjection.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                {currentProjection.description}
              </p>

              <div className="grid grid-cols-2 gap-4 py-6 my-6 border-y border-slate-200">
                {currentProjection.specs.map((spec, i) => (
                  <div key={i} className="text-left">
                    <strong className="block text-xs uppercase tracking-wider text-slate-400 mb-1">
                      {spec.label}
                    </strong>
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="projection-disclaimer">
                <Info size={16} />
                <span>El resultado final puede variar según proyecto, materiales, normativa y condiciones del inmueble.</span>
              </div>
            </div>

            <div className="projection-visual">
              <img
                src={currentProjection.img}
                alt={currentProjection.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span><Sparkles size={14} /> Simulación arquitectónica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
