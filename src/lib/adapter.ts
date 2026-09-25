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

function parseGoogleMapsUrl(url: string | null | undefined): { lat: number; lng: number; zoom: number } | undefined {
  if (!url) return undefined;
  const atMatch = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?))?/);
  if (atMatch) {
    return { lat: Number(atMatch[1]), lng: Number(atMatch[2]), zoom: atMatch[3] ? Number(atMatch[3]) : 14 };
  }
  const searchMatch = url.match(/\/search\/([^?]+)/);
  if (searchMatch) {
    const coords = searchMatch[1].match(/(-?\d+(?:\.\d+)?)[,+]+\s*(-?\d+(?:\.\d+)?)/);
    if (coords) return { lat: Number(coords[1]), lng: Number(coords[2]), zoom: 14 };
  }
  try {
    const parsed = new URL(url);
    const target = parsed.searchParams.get('q') ?? parsed.searchParams.get('ll');
    if (target) {
      const [rawLat, rawLng] = target.split(',');
      const lat = Number.parseFloat(rawLat);
      const lng = Number.parseFloat(rawLng);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng, zoom: 14 };
    }
  } catch {
    // URL inválida: sin coordenadas parseables
  }
  return undefined;
}

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
  const parsedCoords = parseGoogleMapsUrl(apiProperty.locationUrl);
  const coordinates =
    apiProperty.lat !== null && apiProperty.lat !== undefined && apiProperty.lng !== null && apiProperty.lng !== undefined
      ? { lat: apiProperty.lat, lng: apiProperty.lng }
      : parsedCoords
        ? { lat: parsedCoords.lat, lng: parsedCoords.lng }
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
    currency: apiProperty.currency === 'PYG' ? 'PYG' : 'USD',
    price: toNumber(apiProperty.price),
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
    zoomLevel: parsedCoords?.zoom ?? apiProperty.zoomLevel ?? undefined,
  };
}