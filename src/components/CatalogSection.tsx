'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { propertiesData } from '@/data/properties';
import { PropertyCard } from './PropertyCard';
import { CatalogSelect } from './CatalogSelect';
import { PropertyStatus } from '@/types/property';

const categoryTabs: { value: PropertyStatus; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'casa', label: 'Casas' },
  { value: 'terreno', label: 'Terrenos' },
  { value: 'cabana', label: 'Cabañas' },
  { value: 'construccion', label: 'En construcción' },
  { value: 'proyecto', label: 'Proyectos' },
  { value: 'oportunidad', label: 'Oportunidades' }
];

export const CatalogSection: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    searchFilters,
    setSearchFilters,
    resetSearchFilters,
    getFilteredProperties
  } = useAppStore();

  const filteredProperties = getFilteredProperties();
  const locations = Array.from(new Set(propertiesData.map((property) => property.zone))).sort();
  const types = Array.from(new Set(propertiesData.map((property) => property.type))).sort();
  const hasSearchFilters = Boolean(searchFilters.location || searchFilters.type || searchFilters.status);

  return (
    <section className="section-padding bg-white" id="propiedades">
      <div className="container-custom">
        <div className="section-header text-left catalog-heading">
          <div>
            <span className="tag-badge">Catálogo actualizado</span>
            <h2 className="font-serif">Propiedades disponibles.</h2>
            <p className="subtitle-lead">
              Información provisoria organizada para consultar cada inmueble con claridad mientras se completa el relevamiento definitivo.
            </p>
          </div>
          <div className="catalog-update-note">
            Algunas propiedades se encuentran en proceso de actualización fotográfica y documental.
          </div>
        </div>

        <div className="catalog-search-bar catalog-search-bar--compact">
          <div className="filter-group">
            <CatalogSelect
              label="Ubicación"
              value={searchFilters.location}
              onChange={(value) => setSearchFilters({ location: value })}
              options={[
                { value: '', label: 'Todas las zonas' },
                ...locations.map((location) => ({ value: location, label: location }))
              ]}
            />
          </div>

          <div className="filter-group">
            <CatalogSelect
              label="Tipo de inmueble"
              value={searchFilters.type}
              onChange={(value) => setSearchFilters({ type: value })}
              options={[
                { value: '', label: 'Todos los tipos' },
                ...types.map((type) => ({ value: type, label: type }))
              ]}
            />
          </div>

          <div className="filter-group">
            <CatalogSelect
              label="Operación"
              value={searchFilters.status}
              onChange={(value) => setSearchFilters({ status: value })}
              options={[
                { value: '', label: 'Venta o alquiler' },
                { value: 'venta', label: 'Venta' },
                { value: 'alquiler', label: 'Alquiler' }
              ]}
            />
          </div>

          {hasSearchFilters && (
            <button onClick={resetSearchFilters} className="catalog-reset-button" title="Limpiar filtros" aria-label="Limpiar filtros">
              <RotateCcw size={18} />
            </button>
          )}
        </div>

        <div className="catalog-filter-tabs" aria-label="Categorías de propiedades">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`tab-btn ${activeFilter === tab.value ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredProperties.length > 0 ? (
          <div className="properties-grid" id="propertiesGrid">
            {filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <p>No hay propiedades publicadas con esos criterios.</p>
            <button onClick={() => { setActiveFilter('all'); resetSearchFilters(); }} className="btn-luxury btn-primary-luxury btn-sm-luxury">
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
