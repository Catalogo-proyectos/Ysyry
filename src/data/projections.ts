import { LandProjection } from '@/types/property';

export const landProjectionsData: Record<string, LandProjection> = {
  quinta: {
    id: 'quinta',
    label: 'Cabaña',
    title: 'Proyección de cabaña',
    description: 'Una referencia visual para explorar el potencial de alojamiento y descanso de una cabaña, sin sustituir el relevamiento ni el proyecto arquitectónico.',
    specs: [
      { label: 'Uso sugerido', value: 'Vivienda y esparcimiento' },
      { label: 'Validación', value: 'Sujeta a factibilidad' },
      { label: 'Alcance', value: 'Conceptual' },
      { label: 'Material', value: 'Ilustrativo' }
    ],
    img: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.21 (3).jpeg'
  },
  casa: {
    id: 'casa',
    label: 'Casa familiar',
    title: 'Proyección de vivienda familiar',
    description: 'Una forma clara de acompañar las fotos reales con una posible evolución del inmueble, siempre identificada como simulación.',
    specs: [
      { label: 'Uso sugerido', value: 'Vivienda permanente' },
      { label: 'Validación', value: 'Sujeta a proyecto' },
      { label: 'Alcance', value: 'Conceptual' },
      { label: 'Material', value: 'Ilustrativo' }
    ],
    img: '/img/centro-hero.jpg'
  },
  duplex: {
    id: 'duplex',
    label: 'Dúplex',
    title: 'Proyección de conjunto de dúplex',
    description: 'Visualización orientativa para comunicar una intención de desarrollo. La distribución y las terminaciones finales requieren documentación técnica.',
    specs: [
      { label: 'Uso sugerido', value: 'Desarrollo residencial' },
      { label: 'Validación', value: 'Sujeta a normativa' },
      { label: 'Alcance', value: 'Conceptual' },
      { label: 'Material', value: 'Ilustrativo' }
    ],
    img: '/img/Duplex/call_xaxvuX06thFxxPUYzZfD6GzE.png'
  }
};
