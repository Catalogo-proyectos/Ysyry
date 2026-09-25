import { create } from 'zustand';
import { Currency, Property, PropertyStatus, SearchFilters, ProjectionType } from '@/types/property';
import { ApiSettings } from '@/types/api';
import { mapApiProperty } from '@/lib/adapter';
import { getExchangeRate, getProperties, getSettings } from '@/lib/api';

type CatalogStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface PriceDisplay {
  primary: string;
  secondary?: string;
}

function formatAmount(amount: number, currency: Currency, isRent = false): string {
  if (!amount || amount <= 0) return 'Consultar';
  if (currency === 'PYG') {
    const formatted = new Intl.NumberFormat('es-PY', { maximumFractionDigits: 0 }).format(amount);
    return isRent ? `Gs. ${formatted} / mes` : `Gs. ${formatted}`;
  }
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  return isRent ? `${formatted} / mes` : formatted;
}

interface AppStoreState {
  exchangeRate: number;
  formatPrice: (amount: number, isRent?: boolean, currency?: Currency) => string;
  formatPropertyPrice: (property: Property) => PriceDisplay;

  properties: Property[];
  settings: ApiSettings | null;
  status: CatalogStatus;
  errorMessage: string;
  loadCatalog: () => Promise<void>;
  retryCatalog: () => void;
  whatsappNumber: () => string;

  activeFilter: PropertyStatus;
  setActiveFilter: (filter: PropertyStatus) => void;
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;

  getFilteredProperties: () => Property[];

  selectedProperty: Property | null;
  isDetailModalOpen: boolean;
  activeGalleryIndex: number;
  openDetailModal: (property: Property) => void;
  closeDetailModal: () => void;
  setActiveGalleryIndex: (index: number) => void;

  isSellerModalOpen: boolean;
  openSellerModal: () => void;
  closeSellerModal: () => void;

  isPublishModalOpen: boolean;
  openPublishModal: () => void;
  closePublishModal: () => void;

  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  activeProjection: ProjectionType;
  setActiveProjection: (proj: ProjectionType) => void;
}

const DEFAULT_WHATSAPP = '595981879612';

export const useAppStore = create<AppStoreState>((set, get) => ({
  exchangeRate: 7500,
  formatPrice: (amount, isRent = false, currency = 'USD') => formatAmount(amount, currency, isRent),
  formatPropertyPrice: (property) => {
    const { exchangeRate } = get();
    const isRent = property.isRent ?? false;
    const native = property.price && property.price > 0 ? property.price : undefined;
    const usd = property.priceUSD && property.priceUSD > 0 ? property.priceUSD : undefined;

    if (property.currency === 'PYG') {
      const primary = native
        ? formatAmount(native, 'PYG', isRent)
        : usd
          ? formatAmount(usd, 'USD', isRent)
          : 'Consultar';
      const secondary = usd
        ? `≈ ${formatAmount(usd, 'USD')}`
        : native && exchangeRate > 0
          ? `≈ ${formatAmount(native / exchangeRate, 'USD')}`
          : undefined;
      return { primary, secondary };
    }

    const primary = usd
      ? formatAmount(usd, 'USD', isRent)
      : native
        ? formatAmount(native, 'USD', isRent)
        : 'Consultar';
    const secondary = native && exchangeRate > 0 ? `≈ ${formatAmount(native * exchangeRate, 'PYG')}` : undefined;
    return { primary, secondary };
  },

  properties: [],
  settings: null,
  status: 'idle',
  errorMessage: '',
  loadCatalog: async () => {
    set({ status: 'loading', errorMessage: '' });
    try {
      const [list, settings, exchange] = await Promise.all([getProperties(), getSettings(), getExchangeRate()]);
      set({
        properties: list.items.map(mapApiProperty),
        settings,
        exchangeRate: exchange.rate > 0 ? exchange.rate : settings.exchangeRate,
        status: 'ready',
      });
    } catch (error) {
      set({
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'No se pudo conectar con el catálogo.',
      });
    }
  },
  retryCatalog: () => {
    void get().loadCatalog();
  },
  whatsappNumber: () => get().settings?.whatsappNumber || DEFAULT_WHATSAPP,

  activeFilter: 'all',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  searchFilters: {
    location: '',
    type: '',
    bedrooms: '',
    status: ''
  },
  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters }
    })),
  resetSearchFilters: () =>
    set({
      searchFilters: {
        location: '',
        type: '',
        bedrooms: '',
        status: ''
      }
    }),

  getFilteredProperties: () => {
    const { activeFilter, searchFilters, properties } = get();
    return properties.filter((property) => {
      if (activeFilter !== 'all' && !property.categories.includes(activeFilter)) {
        return false;
      }

      if (
        searchFilters.location &&
        !property.zone.toLowerCase().includes(searchFilters.location.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      ) {
        return false;
      }

      if (
        searchFilters.type &&
        !property.type.toLowerCase().includes(searchFilters.type.toLowerCase())
      ) {
        return false;
      }

      if (searchFilters.bedrooms) {
        const minBeds = parseInt(searchFilters.bedrooms, 10);
        if ((property.bedrooms ?? 0) < minBeds) {
          return false;
        }
      }

      if (searchFilters.status && property.operation !== searchFilters.status) {
        return false;
      }

      return true;
    });
  },

  selectedProperty: null,
  isDetailModalOpen: false,
  activeGalleryIndex: 0,
  openDetailModal: (property) => {
    set({
      selectedProperty: property,
      isDetailModalOpen: true,
      activeGalleryIndex: 0
    });
  },
  closeDetailModal: () => {
    set({
      isDetailModalOpen: false,
      selectedProperty: null
    });
  },
  setActiveGalleryIndex: (index) => set({ activeGalleryIndex: index }),

  isSellerModalOpen: false,
  openSellerModal: () => set({ isSellerModalOpen: true }),
  closeSellerModal: () => set({ isSellerModalOpen: false }),

  isPublishModalOpen: false,
  openPublishModal: () => set({ isPublishModalOpen: true }),
  closePublishModal: () => set({ isPublishModalOpen: false }),

  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  activeProjection: 'quinta',
  setActiveProjection: (proj) => set({ activeProjection: proj })
}));