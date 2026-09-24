import {
  Building2,
  CookingPot,
  DoorOpen,
  PanelTop,
  Sofa,
  Sparkles,
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

export function resolveHighlightIcon(icon: string): LucideIcon {
  return propertyHighlightIcons[icon as PropertyHighlightIcon] ?? Sparkles;
}
