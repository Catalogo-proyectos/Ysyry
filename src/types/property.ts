export type Currency = 'USD' | 'PYG';

export type PropertyCategory =
  | 'casa'
  | 'terreno'
  | 'construccion'
  | 'proyecto'
  | 'oportunidad'
  | 'cabana';

export type PropertyStatus = 'all' | PropertyCategory;
export type PropertyOperation = 'venta' | 'alquiler';

export interface PropertyMedia {
  id: string;
  title: string;
  alt: string;
  src?: string;
  note?: string;
  provisional?: boolean;
}

export type PropertyHighlightIcon = 'building' | 'sofa' | 'kitchen' | 'stairs' | 'patio' | 'balcony';

export interface PropertyHighlight {
  icon: PropertyHighlightIcon;
  label: string;
  title: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  zone: string;
  type: string;
  categories: PropertyCategory[];
  operation: PropertyOperation;
  tagText: string;
  priceUSD?: number;
  isRent?: boolean;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  areaSqM?: number;
  parking?: number;
  whatsappNumber?: string;
  mainImg: string;
  coverLabel: string;
  photos: PropertyMedia[];
  plans: PropertyMedia[];
  documents: PropertyMedia[];
  projections: PropertyMedia[];
  highlights?: PropertyHighlight[];
  description: string;
  features: string[];
  mediaNotice: string;
  progress?: number;
  progressLabel?: string;
  estimatedDelivery?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  department?: string;
  address?: string;
  zoomLevel?: number;
}

export type ProjectionType = 'quinta' | 'casa' | 'duplex';

export interface LandProjection {
  id: ProjectionType;
  label: string;
  title: string;
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  img: string;
}

export interface SearchFilters {
  location: string;
  type: string;
  bedrooms: string;
  status: string;
}
