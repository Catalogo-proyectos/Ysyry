'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Bath,
  Bed,
  Car,
  Check,
  Images,
  MapPin,
  Maximize2,
  MessageCircle,
  Ruler,
  Sparkles,
  X
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PropertyMedia } from '@/types/property';
import { propertyHighlightIcons } from '@/components/propertyHighlightIcons';

type MediaTab = 'photos' | 'plans' | 'projections';

const tabLabels: Record<MediaTab, string> = {
  photos: 'Fotos',
  plans: 'Planos',
  projections: 'Proyección'
};

const tabIcons: Record<MediaTab, React.ReactNode> = {
  photos: <Images size={16} />,
  plans: <Ruler size={16} />,
  projections: <Sparkles size={16} />
};

export const PropertyDetailModal: React.FC = () => {
  const {
    selectedProperty,
    isDetailModalOpen,
    closeDetailModal,
    activeGalleryIndex,
    setActiveGalleryIndex,
    formatPrice
  } = useAppStore();
  const [mediaTab, setMediaTab] = useState<MediaTab>('photos');

  useEffect(() => {
    if (isDetailModalOpen) setMediaTab('photos');
  }, [isDetailModalOpen, selectedProperty?.id]);

  const availableTabs = useMemo(() => {
    if (!selectedProperty) return [] as MediaTab[];
    return (['photos', 'plans', 'projections'] as MediaTab[]).filter((tab) => {
      const items = selectedProperty[tab];
      if (tab === 'plans') return items.some((item) => Boolean(item.src));
      return items.length > 0;
    });
  }, [selectedProperty]);

  if (!isDetailModalOpen || !selectedProperty) return null;

  const currentItems = selectedProperty[mediaTab] as PropertyMedia[];
  const currentItem = currentItems[activeGalleryIndex] || currentItems[0];
  const hasSpecs = Boolean(
    selectedProperty.bedrooms ||
      selectedProperty.beds ||
      selectedProperty.bathrooms ||
      selectedProperty.areaSqM ||
      selectedProperty.parking ||
      selectedProperty.highlights?.length
  );
  const isTechnicalTab = mediaTab === 'plans';
  const whatsappPhone = selectedProperty.whatsappNumber || '595981879612';
  const whatsappMessage = encodeURIComponent(
    `Hola, me comunico a través de la web. Estoy interesado/a en "${selectedProperty.title}". ¿Podrían brindarme más información y disponibilidad?`
  );

  const selectTab = (tab: MediaTab) => {
    setMediaTab(tab);
    setActiveGalleryIndex(0);
  };

  return (
    <div className="modal-overlay active" onClick={closeDetailModal}>
      <div className="modal-card property-modal" onClick={(event) => event.stopPropagation()}>
        <button onClick={closeDetailModal} className="modal-close-btn" aria-label="Cerrar ficha">
          <X size={20} />
        </button>

        <div className="modal-body property-modal-body">
          <header className="property-modal-header">
            <div>
              <span className="tag-badge">{selectedProperty.tagText}</span>
              <h2>{selectedProperty.title}</h2>
              <div className="property-modal-location"><MapPin size={15} /><span>{selectedProperty.location}</span></div>
            </div>
            <div className="property-modal-price">
              <span>{selectedProperty.operation === 'venta' ? 'Venta' : 'Alquiler'}</span>
              <strong>{selectedProperty.priceUSD ? formatPrice(selectedProperty.priceUSD, selectedProperty.isRent) : 'Consultar'}</strong>
              <small>Información provisoria</small>
            </div>
          </header>

          <section className="property-media-section" aria-label="Material de la propiedad">
            <div className="property-media-tabs" role="tablist">
              {availableTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => selectTab(tab)}
                  className={mediaTab === tab ? 'active' : ''}
                  role="tab"
                  aria-selected={mediaTab === tab}
                >
                  {tabIcons[tab]} {tabLabels[tab]} <span>{selectedProperty[tab].length}</span>
                </button>
              ))}
            </div>

            <div className={`property-media-stage ${isTechnicalTab ? 'technical' : ''}`}>
              {currentItem?.src ? (
                <img
                  src={currentItem.src}
                  alt={currentItem.alt}
                  className={isTechnicalTab ? 'object-contain' : 'object-cover property-image'}
                />
              ) : (
                <div className="property-media-placeholder">
                  <Ruler size={38} />
                  <strong>{currentItem?.title}</strong>
                  <span>{currentItem?.note}</span>
                </div>
              )}
              {currentItem?.src && (
                <span className="property-media-kind">
                  {mediaTab === 'projections' ? 'Proyección ilustrativa' : currentItem.provisional ? 'Material provisorio' : currentItem.title}
                </span>
              )}
            </div>

            {currentItems.length > 1 && (
              <div className="property-media-thumbnails">
                {currentItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveGalleryIndex(index)}
                    className={activeGalleryIndex === index ? 'active' : ''}
                    aria-label={`Ver ${item.title}`}
                  >
                    {item.src ? <img src={item.src} alt="" /> : <Ruler size={20} />}
                  </button>
                ))}
              </div>
            )}

            <div className="property-media-caption">
              <strong>{currentItem?.title}</strong>
              <span>{currentItem?.note || selectedProperty.mediaNotice}</span>
            </div>
          </section>

          {(hasSpecs || selectedProperty.progressLabel) && (
            <section className="property-facts-panel">
              {hasSpecs && (
                <div className="property-facts-list">
                  {!!selectedProperty.bedrooms && <span><Bed size={18} /><strong>{selectedProperty.bedrooms}</strong> habitaciones</span>}
                  {!!selectedProperty.beds && <span><Bed size={18} /><strong>{selectedProperty.beds}</strong> camas</span>}
                  {!!selectedProperty.bathrooms && <span><Bath size={18} /><strong>{selectedProperty.bathrooms}</strong> baños</span>}
                  {!!selectedProperty.areaSqM && <span><Maximize2 size={18} /><strong>{selectedProperty.areaSqM}</strong> m²</span>}
                  {!!selectedProperty.parking && <span><Car size={18} /><strong>{selectedProperty.parking}</strong> cocheras</span>}
                  {selectedProperty.highlights?.map((highlight) => {
                    const HighlightIcon = propertyHighlightIcons[highlight.icon];
                    return (
                      <span title={highlight.title} key={`${selectedProperty.id}-${highlight.label}`}>
                        <HighlightIcon size={18} />
                        <strong>{highlight.label}</strong>
                      </span>
                    );
                  })}
                </div>
              )}
              {selectedProperty.progressLabel && (
                <div className="property-progress-detail">
                  <div><span>Estado</span><strong>{selectedProperty.progressLabel}</strong></div>
                  <div><span>Entrega estimada</span><strong>{selectedProperty.estimatedDelivery}</strong></div>
                  {selectedProperty.progress !== undefined && (
                    <div className="property-progress-track"><span style={{ width: `${selectedProperty.progress}%` }} /></div>
                  )}
                </div>
              )}
            </section>
          )}

          <section className="property-description-grid">
            <div>
              <h3>Descripción</h3>
              <p>{selectedProperty.description}</p>
            </div>
            <div>
              <h3>Características y Servicios</h3>
              <ul>
                {selectedProperty.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}
              </ul>
            </div>
          </section>

          <footer className="property-modal-footer">
            <p>Consultas directas para reservas grupales, disponibilidad y eventos.</p>
            <a
              href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="property-whatsapp-button"
            >
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};
