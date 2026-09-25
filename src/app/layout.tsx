import type { Metadata } from 'next';
import { cache } from 'react';
import './globals.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ysyry.com.py';

const FALLBACK = {
  businessName: 'Ysyry Inmobiliaria',
  whatsappNumber: '595981879612',
  address: 'Itapúa / Alto Paraná, Paraguay',
  description:
    'Catálogo exclusivo de propiedades, terrenos, casas, cabañas y proyectos de inversión en Paraguay (Itapúa, Alto Paraná, Asunción). Atención personalizada por WhatsApp.',
};

interface SettingsResult {
  businessName?: string;
  whatsappNumber?: string;
  address?: string;
  about?: string;
}

const getSettings = cache(async (): Promise<SettingsResult> => {
  try {
    const response = await fetch(`${API_BASE}/settings`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return FALLBACK;
    const data = (await response.json()) as SettingsResult;
    return { ...FALLBACK, ...data };
  } catch {
    return FALLBACK;
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const businessName = settings.businessName || FALLBACK.businessName;
  const description = settings.about || FALLBACK.description;
  const url = SITE_URL;

  return {
    metadataBase: new URL(url),
    title: {
      default: `${businessName} | Catálogo de Propiedades en Paraguay`,
      template: `%s | ${businessName}`,
    },
    description,
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
    authors: [{ name: businessName, url }],
    creator: businessName,
    publisher: businessName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    alternates: {
      canonical: url,
      languages: {
        'es-PY': url,
        es: url
      }
    },
    openGraph: {
      title: `${businessName} | Catálogo de Propiedades en Paraguay`,
      description,
      url,
      siteName: businessName,
      locale: 'es_PY',
      type: 'website',
      images: [
        {
          url: '/img/aurora-env.jpg',
          width: 1200,
          height: 630,
          alt: `${businessName} Paraguay`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${businessName} | Catálogo de Propiedades en Paraguay`,
      description,
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
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const businessName = settings.businessName || FALLBACK.businessName;
  const whatsapp = settings.whatsappNumber || FALLBACK.whatsappNumber;
  const address = settings.address || FALLBACK.address;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': `${SITE_URL}/#organization`,
        name: businessName,
        url: SITE_URL,
        logo: `${SITE_URL}/img/logo-ysyry-montana-bn.svg`,
        image: `${SITE_URL}/img/aurora-env.jpg`,
        description:
          'Catálogo de propiedades, terrenos y proyectos con atención directa en Paraguay.',
        telephone: `+${whatsapp}`,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PY',
          addressRegion: address
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
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: businessName,
        description:
          'Catálogo de propiedades, terrenos y proyectos de inversión en Paraguay.',
        publisher: {
          '@id': `${SITE_URL}/#organization`
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