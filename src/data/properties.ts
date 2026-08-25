import { Property } from '@/types/property';

const pendingPlan = (id: string, title: string) => ({
  id,
  title,
  alt: title,
  note: 'Archivo original pendiente de incorporación al catálogo.'
});

export const propertiesData: Property[] = [
  {
    id: 'cabanas-ysyry',
    title: 'Cabañas Ysyry - Alojamiento & Eventos',
    location: 'San Juan del Paraná, Itapúa',
    zone: 'San Juan del Paraná',
    type: 'Cabañas',
    categories: ['casa', 'oportunidad', 'cabana'],
    operation: 'alquiler',
    tagText: 'Alquiler temporal / Grupos',
    isRent: true,
    department: 'Itapúa',
    address: 'San Juan del Paraná, a minutos de Encarnación',
    coordinates: {
      lat: -27.2985,
      lng: -55.9620
    },
    zoomLevel: 14,
    bedrooms: 5,
    beds: 21,
    bathrooms: 3,
    parking: 6,
    whatsappNumber: '595981879612',
    mainImg: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.21 (3).jpeg',
    coverLabel: 'Fotografías reales',
    photos: [
      {
        id: 'ysyry-fachada-principal',
        title: 'Acceso y fachada principal',
        alt: 'Acceso principal a Cabañas Ysyry con estacionamiento',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.21 (3).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-abuela-chela',
        title: 'Cabaña Abuela Chela',
        alt: 'Fachada de cabaña Abuela Chela con aire acondicionado',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.21 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-abuela-angela',
        title: 'Cabaña Abuela Angela',
        alt: 'Cabaña Abuela Angela de dos plantas rodeada de naturaleza',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.23 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-pileta-arroyo',
        title: 'Arroyo natural y pileta con puente',
        alt: 'Pileta natural con agua de vertiente y puente de madera',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.21 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-quincho',
        title: 'Quincho y comedor al aire libre',
        alt: 'Quincho rústico techado con mesas y bancos de madera',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.23 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-entorno-general',
        title: 'Vista panorámica del complejo',
        alt: 'Vista panorámica del complejo de cabañas, arroyo y entorno',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.22.jpeg',
        provisional: false
      },
      {
        id: 'ysyry-fogon',
        title: 'Fogón a leña y patio exterior',
        alt: 'Área de fogón a leña, horno y patio',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.22 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-escalera-terraza',
        title: 'Acceso a terraza y balcón',
        alt: 'Escaleras hacia la planta superior y terraza',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.23.jpeg',
        provisional: false
      },
      {
        id: 'ysyry-arroyo-cascada',
        title: 'Cauce natural del arroyo Ysyry',
        alt: 'Cauce y compuerta de agua cristalina atravesando el predio',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.24 (3).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-vegetacion-arroyo',
        title: 'Parque arbolado y arroyo',
        alt: 'Paisaje natural con frondosa vegetación y arroyo',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.24 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-sendero',
        title: 'Senderos naturales',
        alt: 'Senderos en medio del bosque y naturaleza',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.24 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-vista-bosque',
        title: 'Cabaña integrada en la naturaleza',
        alt: 'Cabaña rústica con vista a la vegetación',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.25.jpeg',
        provisional: false
      },
      {
        id: 'ysyry-escalera-patio',
        title: 'Área posterior',
        alt: 'Vista lateral y servicios de la cabaña',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.22 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-cabana-arroyo',
        title: 'Espejo de agua y cabaña',
        alt: 'Vista desde el arroyo hacia la cabaña',
        src: '/img/Cabaña Ysyry/WhatsApp Image 2026-08-23 at 18.09.24.jpeg',
        provisional: false
      }
    ],
    plans: [],
    documents: [
      {
        id: 'ysyry-folleto-oficial',
        title: 'Folleto Oficial de Servicios',
        alt: 'Folleto informativo de Cabañas Ysyry con detalle de servicios, capacidad y menú',
        src: '/img/WhatsApp Image 2026-08-23 at 18.09.21.jpeg',
        note: 'Información completa: habitaciones dobles a quíntuples (21 camas totales), servicios gastronómicos y contacto.',
        provisional: false
      }
    ],
    projections: [],
    description: 'Complejo turístico y de descanso Cabañas Ysyry. Ideal para grupos grandes, familias y eventos (¡Sede especial WRC Paraguay 2025!). Contamos con capacidad de hasta 21 camas en habitaciones dobles, triples, cuádruples y quíntuples. Disfrutá de arroyo natural propio, pileta de agua de vertiente con puente, quincho techado, churrasquera, horno y fogón a leña, cocina equipada con heladera y menú personalizado a elección (carne vacuna, pescados, oveja y cerdo).',
    features: [
      'Capacidad para grupos: 21 camas en total',
      'Habitaciones dobles, triples, cuádruples y quíntuples',
      'Arroyo natural propio y pileta con puente de madera',
      'Quincho techado con mesas y bancos rústicos',
      'Churrasquera / Parrilla',
      'Horno y fogón a leña',
      'Cocina equipada con heladera',
      'Aire acondicionado en habitaciones',
      'Menú a elección: Carne vacuna, Pescados, Oveja, Cerdo',
      'Apto para grupos grandes, familias y WRC PY 2025',
      'Contacto directo: +595 981 879612'
    ],
    mediaNotice: 'Fotografías reales del predio e instalaciones de Cabañas Ysyry.'
  },
  {
    id: 'cabanas-ysyry-encarnacion',
    title: 'Cabañas Ysyry - Encarnación',
    location: 'Itapúa, Encarnación',
    zone: 'Encarnación',
    type: 'Cabañas',
    categories: ['casa', 'oportunidad', 'cabana'],
    operation: 'alquiler',
    tagText: 'Alojamiento en Encarnación',
    isRent: true,
    department: 'Itapúa',
    address: 'Encarnación, Itapúa',
    coordinates: {
      lat: -27.3350,
      lng: -55.8670
    },
    zoomLevel: 14,
    whatsappNumber: '595981879612',
    mainImg: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.56.jpeg',
    coverLabel: 'Fotografías reales',
    photos: [
      {
        id: 'ysyry-encarnacion-acceso',
        title: 'Acceso principal',
        alt: 'Acceso principal a Cabañas Ysyry en Encarnación',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.56.jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-vista-general',
        title: 'Vista general del predio',
        alt: 'Vista general del predio con cabaña, patio y quincho',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.55.jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-patio',
        title: 'Patio arbolado',
        alt: 'Patio amplio con árboles y áreas verdes',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.56 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-quincho',
        title: 'Quincho techado',
        alt: 'Quincho techado con mesa y bancos de madera',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.54.jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-exterior-cabana',
        title: 'Exterior de la cabaña',
        alt: 'Exterior de cabaña con galería y patio',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.55 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-galeria',
        title: 'Galería exterior',
        alt: 'Galería exterior con área de descanso',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.55 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-habitacion-familiar',
        title: 'Habitación familiar',
        alt: 'Habitación familiar con camas de madera y ropa blanca',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.53 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-dormitorio',
        title: 'Dormitorio',
        alt: 'Dormitorio de cabaña con camas preparadas',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.53 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-interior',
        title: 'Interior de cabaña',
        alt: 'Interior de cabaña con mobiliario de madera',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.53 (3).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-cocina-comedor',
        title: 'Cocina y comedor',
        alt: 'Área de cocina y comedor de la cabaña',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.54 (1).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-bano',
        title: 'Baño',
        alt: 'Baño de la cabaña',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.54 (2).jpeg',
        provisional: false
      },
      {
        id: 'ysyry-encarnacion-servicio',
        title: 'Área de servicio',
        alt: 'Área de servicio y apoyo de la cabaña',
        src: '/img/Capitan Miranda/WhatsApp Image 2026-08-22 at 07.21.54 (3).jpeg',
        provisional: false
      }
    ],
    plans: [],
    documents: [],
    projections: [],
    description: 'Alojamiento tipo cabaña en Encarnación, Itapúa, con patio amplio, quincho techado y espacios interiores preparados para estadías familiares o grupales. La ficha se incorpora con fotografías reales mientras se completan la capacidad exacta, tarifas, servicios disponibles y condiciones de reserva.',
    features: [
      'Ubicación: Encarnación, Itapúa',
      'Patio amplio con áreas verdes',
      'Quincho techado con mesa y bancos',
      'Habitaciones con camas y ropa blanca',
      'Cocina / comedor a confirmar según disponibilidad',
      'Capacidad, tarifas y servicios a confirmar por WhatsApp'
    ],
    mediaNotice: 'Fotografías reales del predio e instalaciones. Capacidad, servicios y tarifas pendientes de confirmación final.'
  },
  {
    id: 'proyecto-duplex-san-pablo',
    title: 'Proyecto de 3 dúplex',
    location: 'Km 11 Ciudad del Este',
    zone: 'Km 11',
    type: 'Dúplex',
    categories: ['construccion', 'proyecto'],
    operation: 'venta',
    tagText: 'En construcción',
    department: 'Alto Paraná',
    address: 'Ruta PY02 Km 11, Acaray, Ciudad del Este',
    coordinates: {
      lat: -25.5015,
      lng: -54.6980
    },
    zoomLevel: 15,
    bathrooms: 3,
    parking: 3,
    mainImg: '/img/Duplex/call_xaxvuX06thFxxPUYzZfD6GzE.png',
    coverLabel: 'Render provisorio',
    photos: [
      {
        id: 'duplex-fachada-principal',
        title: 'Fachada principal',
        alt: 'Render provisorio de la fachada de tres dúplex',
        src: '/img/Duplex/call_xaxvuX06thFxxPUYzZfD6GzE.png',
        provisional: true
      },
      {
        id: 'duplex-estar-comedor',
        title: 'Estar y comedor',
        alt: 'Render provisorio del estar comedor integrado',
        src: '/img/Duplex/call_B7uEmKo2mMPEhbKdRYxiZfUi.png',
        provisional: true
      },
      {
        id: 'duplex-estar-escalera',
        title: 'Estar y escalera',
        alt: 'Render provisorio del estar con escalera interior',
        src: '/img/Duplex/call_braqZtrOA2ux2usb57ag8SSZ.png',
        provisional: true
      },
      {
        id: 'duplex-cocina',
        title: 'Cocina',
        alt: 'Render provisorio de cocina con salida a patio',
        src: '/img/Duplex/call_PhgZKEpH8fcrIFg0hdVZUtwN.png',
        provisional: true
      },
      {
        id: 'duplex-dormitorio',
        title: 'Dormitorio',
        alt: 'Render provisorio de dormitorio con placard y balcón',
        src: '/img/Duplex/call_9levIoAsorNupomjp4XpcV3u.png',
        provisional: true
      },
      {
        id: 'duplex-bano',
        title: 'Baño',
        alt: 'Render provisorio de baño con ducha',
        src: '/img/Duplex/call_hplWooz36cPKS2hUNCO8KV3a.png',
        provisional: true
      }
    ],
    plans: [
      {
        id: 'duplex-plano',
        title: 'Distribución general del conjunto',
        alt: 'Plano de distribución general del proyecto de tres dúplex',
        src: '/img/Duplex/plano-triplex-web.webp',
        provisional: false
      }
    ],
    documents: [],
    projections: [],
    highlights: [
      {
        icon: 'building',
        label: '3 unidades',
        title: 'Tres viviendas adosadas dentro del mismo proyecto'
      },
      {
        icon: 'patio',
        label: 'Patio posterior',
        title: 'Salida hacia área abierta posterior por vivienda'
      }
    ],
    description: 'Proyecto residencial compuesto por 3 dúplex adosados en Km 11, Ciudad del Este. Cada unidad está planteada con cochera independiente al frente, acceso propio, estar-comedor integrado, cocina lineal, baño social, escalera interior y salida hacia patio posterior. La propuesta combina fachada moderna, aberturas negras, detalles cálidos en madera y una distribución pensada para aprovechar lotes angostos sin perder independencia entre viviendas. Los renders e interiores son referencias provisorias para visualizar terminaciones y uso de espacios mientras se confirman medidas finales, avance de obra y condiciones comerciales.',
    features: [
      'Ubicación: Km 11 Ciudad del Este',
      'Conjunto de 3 dúplex adosados',
      'Cochera independiente para cada unidad',
      'Acceso peatonal propio por vivienda',
      'Estar y comedor integrados en planta baja',
      'Cocina lineal conectada al área social',
      'Baño social en cada unidad según plano',
      'Escalera interior hacia planta alta',
      'Patio posterior y área abierta por unidad',
      'Fachada moderna con balcones y terminaciones cálidas',
      'Plano de distribución incorporado en la pestaña Planos',
      'Renders interiores provisorios para referencia visual',
      'Medidas, terminaciones y avance de obra a confirmar',
      'Precio y forma de pago a consultar'
    ],
    mediaNotice: 'Imágenes y renders provisorios del proyecto. La distribución general se muestra en Planos; materiales, medidas y terminaciones pueden variar según documentación final.',
    progressLabel: 'Avance de obra pendiente de confirmación',
    estimatedDelivery: 'A confirmar'
  },
];
