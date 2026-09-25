import {
  ApiImageKind,
  ApiProperty,
  ApiPropertyFeature,
  ApiPropertyHighlight,
  ApiPropertyImage,
} from '@/types/api';
import {
  Property,
  PropertyCategory,
  PropertyHighlight,
  PropertyMedia,
  PropertyOperation,
} from '@/types/property';

const typeLabels: Record<ApiProperty['type'], string> = {
  HOUSE: 'Casa',
  APARTMENT: 'Departamento',
  LAND: 'Terreno',
  DUPLEX: 'Dúplex',
  COMMERCIAL: 'Comercial',
  OTHER: 'Otro',
};

function toType(type: string): string {
  return typeLabels[type as ApiProperty['type']] ?? type;
}

const VALID_CATEGORIES: PropertyCategory[] = [
  'casa',
  'terreno',
  'construccion',
  'proyecto',
  'oportunidad',
  'cabana',
];

function toOperation(operation: ApiProperty['operation']): PropertyOperation {
  return operation === 'RENT' ? 'alquiler' : 'venta';
}

function toMedia(items: ApiPropertyImage[], kind: ApiImageKind, provisional = false): PropertyMedia[] {
  return items
    .filter((image) => image.kind === kind)
    .map((image) => ({
      id: image.id,
      title: image.alt || 'Imagen',
      alt: image.alt || 'Imagen',
      src: image.url,
      ...(provisional ? { provisional: true } : {}),
    }));
}

function toHighlights(highlights: ApiPropertyHighlight[] | null | undefined): PropertyHighlight[] {
  if (!highlights) return [];
  return highlights.map((highlight) => ({
    icon: highlight.icon as PropertyHighlight['icon'],
    label: highlight.label,
    title: highlight.title,
  }));
}

function toFeatures(features: ApiPropertyFeature[]): string[] {
  return features.map((feature) => {
    const label = feature.label.trim();
    const value = feature.value.trim();
    return value && value !== label ? `${label}: ${value}` : label;
  });
}

function toNumber(value: string | number | null | undefined): number | undefined {
  if (value === null || value === undefined) return undefined;
  const parsed = typeof value === 'number' ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function mapApiProperty(apiProperty: ApiProperty): Property {
  const photos = toMedia(apiProperty.images, 'PHOTO');
  const firstPhoto = photos[0];
  const coordinates =
    apiProperty.lat !== null && apiProperty.lat !== undefined && apiProperty.lng !== null && apiProperty.lng !== undefined
      ? { lat: apiProperty.lat, lng: apiProperty.lng }
      : undefined;

  const priceUSD =
    toNumber(apiProperty.priceUSD) ??
    (apiProperty.currency === 'USD' ? toNumber(apiProperty.price) : undefined);

  return {
    id: apiProperty.id,
    title: apiProperty.title,
    location: [apiProperty.city, apiProperty.zone].filter(Boolean).join(', ') || apiProperty.address || apiProperty.zone,
    zone: apiProperty.zone,
    type: toType(apiProperty.type),
    categories: apiProperty.categories.filter((category): category is PropertyCategory =>
      (VALID_CATEGORIES as string[]).includes(category),
    ),
    operation: toOperation(apiProperty.operation),
    tagText: apiProperty.tagText ?? '',
    priceUSD,
    isRent: apiProperty.operation === 'RENT',
    bedrooms: apiProperty.bedrooms ?? undefined,
    beds: apiProperty.beds ?? undefined,
    bathrooms: apiProperty.bathrooms ?? undefined,
    areaSqM: toNumber(apiProperty.totalAreaM2) ?? toNumber(apiProperty.coveredAreaM2),
    parking: apiProperty.parking ?? undefined,
    whatsappNumber: apiProperty.whatsappNumber ?? undefined,
    mainImg: firstPhoto?.src ?? '',
    coverLabel: apiProperty.coverLabel ?? '',
    photos,
    plans: toMedia(apiProperty.images, 'PLAN'),
    documents: toMedia(apiProperty.images, 'DOCUMENT'),
    projections: toMedia(apiProperty.images, 'AI_RENDER', true),
    highlights: toHighlights(apiProperty.highlights),
    description: apiProperty.description,
    features: toFeatures(apiProperty.features),
    mediaNotice: apiProperty.mediaNotice ?? '',
    progress: apiProperty.progress ?? undefined,
    progressLabel: apiProperty.progressLabel ?? undefined,
    estimatedDelivery: apiProperty.estimatedDelivery ?? undefined,
    coordinates,
    department: apiProperty.department ?? undefined,
    address: apiProperty.address ?? undefined,
    zoomLevel: apiProperty.zoomLevel ?? undefined,
  };
}