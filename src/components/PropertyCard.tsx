'use client';

import React from 'react';
import { Property } from '@/types/property';
import { useAppStore } from '@/store/useAppStore';
import { ArrowUpRight, Bath, Bed, Car, Images, MapPin, Maximize2 } from 'lucide-react';
import { propertyHighlightIcons } from '@/components/propertyHighlightIcons';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { formatPrice, openDetailModal } = useAppStore();
  const hasSpecs = Boolean(
    property.bedrooms || property.beds || property.bathrooms || property.areaSqM || property.parking || property.highlights?.length
  );

  return (
    <article className="property-card group">
      <div className="property-thumb-wrap">
        <span className="property-card-tag">{property.tagText}</span>
        <span className="property-media-label">{property.coverLabel}</span>
        <span className="property-photo-count">
          <Images size={13} /> {property.photos.length}
        </span>
        <img
          src={property.mainImg}
          alt={property.title}
          className="property-thumb property-image"
          loading="lazy"
        />
      </div>

      <div className="property-body">
        <div className="property-location">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        <h3 className="property-title">{property.title}</h3>
        <p className="property-kind">
          {property.type} · {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
        </p>

        {hasSpecs ? (
          <div className="property-specs">
            {!!property.bedrooms && (
              <div className="spec-item" title="Dormitorios"><Bed size={15} /><span>{property.bedrooms} hab</span></div>
            )}
            {!!property.beds && (
              <div className="spec-item" title="Camas totales"><Bed size={15} /><span>{property.beds} camas</span></div>
            )}
            {!!property.bathrooms && (
              <div className="spec-item" title="Baños"><Bath size={15} /><span>{property.bathrooms} baños</span></div>
            )}
            {!!property.areaSqM && (
              <div className="spec-item" title="Superficie total"><Maximize2 size={15} /><span>{property.areaSqM} m²</span></div>
            )}
            {!!property.parking && (
              <div className="spec-item" title="Cocheras / Estacionamiento"><Car size={15} /><span>{property.parking} coch</span></div>
            )}
            {property.highlights?.map((highlight) => {
              const HighlightIcon = propertyHighlightIcons[highlight.icon];
              return (
                <div className="spec-item" title={highlight.title} key={`${property.id}-${highlight.label}`}>
                  <HighlightIcon size={15} />
                  <span>{highlight.label}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="property-data-pending">Datos técnicos a confirmar</div>
        )}

        {property.progressLabel && (
          <div className="property-progress-summary">
            <span>{property.progressLabel}</span>
            {property.progress !== undefined && (
              <div className="property-progress-track" aria-label={`Avance ${property.progress}%`}>
                <span style={{ width: `${property.progress}%` }} />
              </div>
            )}
          </div>
        )}

        <div className="property-footer">
          <div className="property-price">
            {property.priceUSD ? formatPrice(property.priceUSD, property.isRent) : 'Consultar'}
            <span>
              {property.priceUSD
                ? (property.isRent ? 'Alquiler' : 'Precio provisorio')
                : (property.operation === 'alquiler' ? 'Tarifas según grupo / estadía' : 'Condiciones a confirmar')}
            </span>
          </div>

          <button
            onClick={() => openDetailModal(property)}
            className="property-detail-button"
          >
            Ver ficha <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};
