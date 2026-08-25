import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ysyry.com.py'),
  title: {
    default: 'Ysyry Inmobiliaria | Catálogo de Propiedades en Paraguay',
    template: '%s | Ysyry Inmobiliaria'
  },
  description:
    'Catálogo exclusivo de propiedades, terrenos, casas, cabañas y proyectos de inversión en Paraguay (Itapúa, Alto Paraná, Asunción). Atención personalizada por WhatsApp.',
  keywords: [
    'Ysyry',
    'Ysyry Inmobiliaria',
    'inmobiliaria Paraguay',
    'propiedades en venta Paraguay',
    'alquiler cabañas Itapúa',
    'Cabañas Ysyry',
    'San Juan del Paraná',
    'Encarnación',
    'Ciudad del Este inmuebles',
    'terrenos Alto Paraná',
    'casas en venta Paraguay',
    'inversión inmobiliaria Paraguay'
  ],
  authors: [{ name: 'Ysyry Inmobiliaria', url: 'https://ysyry.com.py' }],
  creator: 'Ysyry Inmobiliaria',
  publisher: 'Ysyry Inmobiliaria',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: 'https://ysyry.com.py',
    languages: {
      'es-PY': 'https://ysyry.com.py',
      es: 'https://ysyry.com.py'
    }
  },
  openGraph: {
    title: 'Ysyry Inmobiliaria | Catálogo de Propiedades en Paraguay',
    description:
      'Casas, terrenos, cabañas y proyectos de inversión en Paraguay con asesoramiento y contacto directo.',
    url: 'https://ysyry.com.py',
    siteName: 'Ysyry Inmobiliaria',
    locale: 'es_PY',
    type: 'website',
    images: [
      {
        url: '/img/aurora-env.jpg',
        width: 1200,
        height: 630,
        alt: 'Ysyry Inmobiliaria Paraguay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ysyry Inmobiliaria | Catálogo de Propiedades en Paraguay',
    description:
      'Catálogo de propiedades, terrenos y cabañas en Paraguay con atención directa.',
    images: ['/img/aurora-env.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: [
      { url: '/img/logo-ysyry-montana-bn.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/img/logo-ysyry-montana-bn.svg'
  },
  other: {
    'geo.region': 'PY',
    'geo.placename': 'Paraguay',
    'geo.position': '-25.5015;-54.6980',
    ICBM: '-25.5015, -54.6980'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://ysyry.com.py/#organization',
        name: 'Ysyry Inmobiliaria',
        url: 'https://ysyry.com.py',
        logo: 'https://ysyry.com.py/img/logo-ysyry-montana-bn.svg',
        image: 'https://ysyry.com.py/img/aurora-env.jpg',
        description:
          'Catálogo de propiedades, terrenos y proyectos con atención directa en Paraguay.',
        telephone: '+595 981 879 612',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PY',
          addressRegion: 'Itapúa / Alto Paraná',
          addressLocality: 'Paraguay'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -27.2985,
          longitude: -55.9620
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Itapúa' },
          { '@type': 'AdministrativeArea', name: 'Alto Paraná' },
          { '@type': 'AdministrativeArea', name: 'Asunción' },
          { '@type': 'Country', name: 'Paraguay' }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ysyry.com.py/#website',
        url: 'https://ysyry.com.py',
        name: 'Ysyry Inmobiliaria',
        description:
          'Catálogo de propiedades, terrenos y proyectos de inversión en Paraguay.',
        publisher: {
          '@id': 'https://ysyry.com.py/#organization'
        },
        inLanguage: 'es-PY'
      }
    ]
  };

  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/img/logo-ysyry-montana-bn.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
