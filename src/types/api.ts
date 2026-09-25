export type ApiPropertyType = string;
export type ApiOperationType = 'SALE' | 'RENT';
export type ApiImageKind = 'PHOTO' | 'PLAN' | 'DOCUMENT' | 'AI_RENDER';
export type ApiProjectionStyle = 'QUINTA' | 'CASA' | 'DUPLEX';
export type ApiInquiryKind = 'GENERAL' | 'TASATION' | 'PUBLISH';

export interface ApiPropertyFeature {
  id: string;
  propertyId: string;
  label: string;
  value: string;
  sortOrder: number;
}

export interface ApiPropertyImage {
  id: string;
  propertyId: string;
  url: string;
  objectKey: string;
  alt?: string | null;
  kind: ApiImageKind;
  sortOrder: number;
  aiStyle?: ApiProjectionStyle | null;
}

export interface ApiPropertyHighlight {
  icon: string;
  label: string;
  title: string;
}

export interface ApiProperty {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ApiPropertyType;
  operation: ApiOperationType;
  status: string;
  price: string | number;
  currency: string;
  priceUSD?: string | number | null;
  zone: string;
  address?: string | null;
  city?: string | null;
  department?: string | null;
  locationUrl?: string | null;
  categories: string[];
  tagText?: string | null;
  coverLabel?: string | null;
  mediaNotice?: string | null;
  whatsappNumber?: string | null;
  highlights?: ApiPropertyHighlight[] | null;
  lat?: number | null;
  lng?: number | null;
  zoomLevel?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  rooms?: number | null;
  beds?: number | null;
  parking?: number | null;
  coveredAreaM2?: string | number | null;
  totalAreaM2?: string | number | null;
  progress?: number | null;
  progressLabel?: string | null;
  estimatedDelivery?: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  images: ApiPropertyImage[];
  features: ApiPropertyFeature[];
}

export interface ApiPropertyList {
  items: ApiProperty[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiStatItem {
  number: string;
  label: string;
}

export interface ApiSettings {
  id: string;
  businessName: string;
  about?: string | null;
  valueProposal?: string | null;
  whatsappNumber?: string | null;
  address?: string | null;
  openingHours?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  exchangeRate: number;
  exchangeRateSource?: 'api' | 'manual';
  stats?: ApiStatItem[] | null;
  updatedAt: string;
}

export interface ApiExchangeRate {
  rate: number;
  source: 'api' | 'manual';
  updatedAt: string;
}

export interface ApiCreateInquiry {
  name: string;
  email?: string;
  phone?: string;
  message: string;
  propertyId?: string;
  kind?: ApiInquiryKind;
  location?: string;
  propertyType?: string;
}