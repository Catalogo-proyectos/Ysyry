'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Map, ArrowRight } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const { setSearchFilters, setActiveFilter } = useAppStore();

  const locations = [
    {
      name: 'Santa Teresa',
      count: '12 Propiedades Disponibles',
      img: '/img/aurora-hero.jpg',
      zone: 'Santa Teresa'
    },
    {
      name: 'Villa Morra',
      count: '8 Propiedades Disponibles',
      img: '/img/meridian-hero.jpg',
      zone: 'Villa Morra'
    },
    {
      name: 'San Bernardino',
      count: '5 Casas de Veraneo',
      img: '/img/horizonte-hero.jpg',
      zone: 'San Bernardino'
    },
    {
      name: 'Minga Guazú',
      count: '15 Lotes & Terrenos',
      img: '/img/aurora-env.jpg',
      zone: 'Minga Guazú'
    }
  ];

  const handleLocationClick = (zone: string) => {
    setActiveFilter('all');
    setSearchFilters({ location: zone });
    const el = document.getElementById('propiedades');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="section-header text-left">
          <span className="tag-badge">Explorar por Zona</span>
          <h2 className="font-serif">Encontrá tu próximo lugar.</h2>
          <p className="subtitle-lead">
            Ubicaciones emblemáticas seleccionadas por conectividad, estilo de vida y alta rentabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <div
              key={i}
              onClick={() => handleLocationClick(loc.zone)}
              className="relative h-[360px] sm:h-[400px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer flex items-end p-8 text-white group"
            >
              <img
                src={loc.img}
                alt={loc.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="relative z-10 text-left">
                <h3 className="text-2xl font-serif mb-1 group-hover:text-blue-300 transition-colors">
                  {loc.name}
                </h3>
                <span className="text-xs text-slate-300 font-light flex items-center gap-1">
                  {loc.count} <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 mb-2">
              Ver Propiedades Cerca de Tu Ubicación Actual
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Explorá el mapa interactivo de Asunción y Gran Asunción filtrado por distancia y radio de interés.
            </p>
          </div>
          <button
            onClick={() => alert('Cargando mapa interactivo geolocalizado de Asunción y Gran Asunción...')}
            className="btn-luxury btn-primary-luxury shrink-0"
          >
            <Map size={18} /> Abrir Mapa Interactivo
          </button>
        </div>
      </div>
    </section>
  );
};
