import {
  Building2,
  CookingPot,
  DoorOpen,
  PanelTop,
  Sofa,
  Trees,
  type LucideIcon
} from 'lucide-react';
import { PropertyHighlightIcon } from '@/types/property';

export const propertyHighlightIcons: Record<PropertyHighlightIcon, LucideIcon> = {
  building: Building2,
  sofa: Sofa,
  kitchen: CookingPot,
  stairs: DoorOpen,
  patio: Trees,
  balcony: PanelTop
};
