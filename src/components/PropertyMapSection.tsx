'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import { propertiesData } from '@/data/properties';
import { Property } from '@/types/property';
import { MapLayerType } from './PropertyMap';
import {
  Layers,
  MapPin,
  Navigation,
  Eye,
  Building2
} from 'lucide-react';

const PropertyMap = dynamic(
  () => import('./PropertyMap').then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] md:h-[620px] lg:h-[660px] bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-500 gap-3 border border-slate-200">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs tracking-wider uppercase font-mono text-slate-500 font-medium">
          Cargando vista satelital...
        </span>
      </div>
    )
  }
);

export const PropertyMapSection: React.FC = () => {
  const { openDetailModal } = useAppStore();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeRegion, setActiveRegion] = useState<'all' | 'alto-parana' | 'itapua'>('alto-parana');
  const [mapLayerType, setMapLayerType] = useState<MapLayerType>('hybrid');

  const mappableProperties = useMemo(() => {
    return propertiesData.filter((p) => Boolean(p.coordinates));
  }, []);

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleRegionClick = (region: 'all' | 'alto-parana' | 'itapua') => {
    setActiveRegion(region);
    setSelectedProperty(null);
  };

  return (
    <section id="mapa-satelital" className="section-padding bg-white text-slate-900 relative">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="tag-badge">
              <MapPin size={13} />
              Geo-Localización & Entorno en Paraguay
            </span>
            <h2 className="font-serif text-slate-900 mt-2">
              Vista satelital de propiedades disponibles.
            </h2>
            <p className="subtitle-lead mt-3 text-slate-600">
              Explorá la implantación satelital y conectividad de nuestras propiedades y proyectos activos en <strong>Alto Paraná</strong> e <strong>Itapúa</strong>, con visualización de rutas y entorno geográfico real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80 shadow-xs shrink-0">
            <button
              onClick={() => handleRegionClick('alto-parana')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRegion === 'alto-parana'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Alto Paraná (CDE • Km 11)
            </button>
            <button
              onClick={() => handleRegionClick('itapua')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRegion === 'itapua'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Itapúa (Encarnación • San Juan)
            </button>
            <button
              onClick={() => handleRegionClick('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRegion === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Todo Paraguay
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-950 flex-1 flex flex-col min-h-[500px] md:min-h-[580px]">
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/20 shadow-xl text-white">
                <span className="text-[11px] text-slate-300 font-medium px-2 flex items-center gap-1.5">
                  <Layers size={13} className="text-blue-400" />
                  Capa:
                </span>
                <button
                  onClick={() => setMapLayerType('hybrid')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    mapLayerType === 'hybrid'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Satélite con nombres de calles, rutas y localidades"
                >
                  Satélite Híbrido
                </button>
                <button
                  onClick={() => setMapLayerType('satellite')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    mapLayerType === 'satellite'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Vista satelital pura de alta definición"
                >
                  Satélite HD
                </button>
              </div>

              <div className="w-full flex-1 h-full min-h-[500px] md:min-h-[580px]">
                <PropertyMap
                  properties={mappableProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={handleSelectProperty}
                  onOpenModal={(prop) => openDetailModal(prop)}
                  mapLayerType={mapLayerType}
                  activeRegion={activeRegion}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 flex flex-col h-full shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-blue-600" />
                  <span className="text-sm font-bold tracking-wide text-slate-800 uppercase font-sans">
                    Inmuebles en Mapa
                  </span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-semibold">
                  {mappableProperties.length} activos
                </span>
              </div>

              <div className="space-y-3.5 overflow-y-auto max-h-[500px] lg:max-h-[520px] pr-1 custom-scrollbar">
                {mappableProperties.map((property) => {
                  const isSelected = selectedProperty?.id === property.id;
                  return (
                    <div
                      key={property.id}
                      onClick={() => handleSelectProperty(property)}
                      className={`group relative rounded-xl p-3.5 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                          : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex gap-3.5 items-start">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={property.mainImg}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                          <span className="absolute bottom-1 left-1 text-[9px] font-bold uppercase bg-slate-900/90 text-white px-1.5 py-0.5 rounded">
                            {property.department || 'PY'}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                              {property.tagText}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 truncate font-sans group-hover:text-blue-600 transition-colors">
                            {property.title}
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                            <MapPin size={11} className="text-slate-400 shrink-0" />
                            {property.address || property.location}
                          </p>

                          <div className="mt-2.5 flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectProperty(property);
                              }}
                              className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 py-1 px-2.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                            >
                              <Navigation size={10} /> Ubicar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetailModal(property);
                              }}
                              className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-0.5 py-1 px-2.5 rounded bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors"
                            >
                              <Eye size={10} /> Ver Ficha
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
