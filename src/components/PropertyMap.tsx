'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '@/types/property';

export type MapLayerType = 'hybrid' | 'satellite';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  onOpenModal: (property: Property) => void;
  mapLayerType: MapLayerType;
  activeRegion: 'all' | 'alto-parana' | 'itapua';
  onCenterChange?: (coords: { lat: number; lng: number; zoom: number }) => void;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  onOpenModal,
  mapLayerType,
  activeRegion,
  onCenterChange
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const regionBounds: Record<string, { center: [number, number]; zoom: number }> = {
    all: {
      center: [-26.45, -55.3],
      zoom: 8
    },
    'alto-parana': {
      center: [-25.5015, -54.6980],
      zoom: 13
    },
    itapua: {
      center: [-27.315, -55.91],
      zoom: 13
    }
  };

  const getTileConfig = (type: MapLayerType) => {
    switch (type) {
      case 'hybrid':
        return {
          url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
          maxZoom: 20,
          attribution: '&copy; Google Maps / CNES / Airbus / Maxar'
        };
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          maxZoom: 19,
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        };
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initial = regionBounds['alto-parana'];

    const map = L.map(mapContainerRef.current, {
      center: initial.center,
      zoom: initial.zoom,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true
    });

    const tileConfig = getTileConfig(mapLayerType);
    const tileLayer = L.tileLayer(tileConfig.url, {
      maxZoom: tileConfig.maxZoom,
      attribution: tileConfig.attribution,
      subdomains: ['a', 'b', 'c', 'd']
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    const updateCenter = () => {
      const c = map.getCenter();
      onCenterChange?.({
        lat: Number(c.lat.toFixed(4)),
        lng: Number(c.lng.toFixed(4)),
        zoom: map.getZoom()
      });
    };

    map.on('moveend', updateCenter);
    map.on('zoomend', updateCenter);

    updateCenter();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const tileConfig = getTileConfig(mapLayerType);
    const newTileLayer = L.tileLayer(tileConfig.url, {
      maxZoom: tileConfig.maxZoom,
      attribution: tileConfig.attribution,
      subdomains: ['a', 'b', 'c', 'd']
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTileLayer;
  }, [mapLayerType]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    properties.forEach((property) => {
      if (!property.coordinates) return;

      const isSelected = selectedProperty?.id === property.id;
      const shortTitle = property.zone || property.title.split('-')[0].trim();

      const customIcon = L.divIcon({
        className: 'ysyry-custom-pin',
        iconSize: [44, 60],
        iconAnchor: [22, 56],
        popupAnchor: [0, -56],
        html: `
          <div class="ysyry-pin-wrapper ${isSelected ? 'active' : ''}">
            ${isSelected ? '<div class="ysyry-pin-pulse"></div>' : ''}
            <div class="ysyry-pin-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div class="ysyry-pin-tip"></div>
            <div class="ysyry-pin-title-badge">${shortTitle}</div>
          </div>
        `
      });

      const marker = L.marker([property.coordinates.lat, property.coordinates.lng], {
        icon: customIcon
      }).addTo(map);

      const popupHtml = `
        <div style="padding: 14px; font-family: var(--font-sans, sans-serif);">
          <div style="position: relative; height: 130px; border-radius: 10px; overflow: hidden; margin-bottom: 12px;">
            <img src="${property.mainImg}" alt="${property.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.85), transparent 60%);"></div>
            <span style="position: absolute; top: 8px; left: 8px; font-size: 10px; font-weight: 700; text-transform: uppercase; background: #2563eb; color: #fff; padding: 2px 8px; border-radius: 9999px; letter-spacing: 0.05em;">
              ${property.tagText}
            </span>
          </div>

          <h4 style="font-family: var(--font-serif, serif); font-size: 17px; font-weight: 600; color: #ffffff; margin-bottom: 4px; line-height: 1.25;">
            ${property.title}
          </h4>
          <p style="font-size: 12px; color: #94a3b8; margin-bottom: 12px; display: flex; align-items: center; gap: 4px;">
            📍 ${property.location}
          </p>

          <div style="display: flex; gap: 8px;">
            <button id="btn-view-${property.id}" style="flex: 1; padding: 7px 12px; background: #2563eb; color: #ffffff; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: background 0.2s;">
              Ver ficha completa
            </button>
            <a href="https://wa.me/${property.whatsappNumber || '595981879612'}?text=Hola!%20Me%20interesa%20la%20propiedad%20${encodeURIComponent(property.title)}" target="_blank" rel="noopener noreferrer" style="padding: 7px 10px; background: #15803d; color: #ffffff; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; text-decoration: none; display: flex; align-items: center; justify-content: center;">
              WhatsApp
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 300,
        className: 'ysyry-custom-popup'
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-${property.id}`);
        if (btn) {
          btn.onclick = () => {
            onOpenModal(property);
          };
        }
      });

      marker.on('click', () => {
        onSelectProperty(property);
      });

      markersRef.current[property.id] = marker;
    });
  }, [properties, selectedProperty]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedProperty && selectedProperty.coordinates) {
      map.flyTo(
        [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng],
        selectedProperty.zoomLevel || 15,
        { duration: 1.4 }
      );
      const marker = markersRef.current[selectedProperty.id];
      if (marker) {
        marker.openPopup();
      }
    } else if (activeRegion) {
      const config = regionBounds[activeRegion] || regionBounds.all;
      map.flyTo(config.center, config.zoom, { duration: 1.4 });
    }
  }, [selectedProperty, activeRegion]);

  return (
    <div className="relative w-full h-full min-h-[520px] md:min-h-[620px] lg:min-h-[660px]">
      <div ref={mapContainerRef} className="ysyry-leaflet-container" />
    </div>
  );
};
