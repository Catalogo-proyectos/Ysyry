import { create } from 'zustand';
import { Currency, Property, PropertyStatus, SearchFilters, ProjectionType } from '@/types/property';
import { propertiesData } from '@/data/properties';

interface AppStoreState {
  currency: Currency;
  exchangeRate: number;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceUSD: number, isRent?: boolean) => string;

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

export const useAppStore = create<AppStoreState>((set, get) => ({
  currency: 'USD',
  exchangeRate: 7500,
  setCurrency: (currency) => set({ currency }),
  formatPrice: (priceUSD, isRent = false) => {
    const { currency, exchangeRate } = get();
    if (currency === 'PYG') {
      const pygAmount = priceUSD * exchangeRate;
      const formatted = new Intl.NumberFormat('es-PY', {
        style: 'currency',
        currency: 'PYG',
        maximumFractionDigits: 0
      }).format(pygAmount);
      return isRent ? `${formatted} / mes` : formatted;
    }

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(priceUSD);
    return isRent ? `${formatted} / mes` : formatted;
  },

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
    const { activeFilter, searchFilters } = get();
    return propertiesData.filter((property) => {
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
