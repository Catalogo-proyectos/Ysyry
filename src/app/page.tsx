'use client';

import React from 'react';
import { AboutSection } from '@/components/AboutSection';
import { CatalogSection } from '@/components/CatalogSection';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PropertyMapSection } from '@/components/PropertyMapSection';
import { LandProjectionModule } from '@/components/LandProjectionModule';
import { PropertyDetailModal } from '@/components/Modals/PropertyDetailModal';
import { PublishModal } from '@/components/Modals/PublishModal';
import { SellerModal } from '@/components/Modals/SellerModal';
import { SellerBanner } from '@/components/SellerBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <Header />

      <HeroSection
        id="hero1"
        bgImage="/img/aurora-env.jpg"
        title={<>Encontrá el lugar<br />donde comienza tu próxima historia.</>}
        subtitle="Propiedades existentes, proyectos y oportunidades organizados para consultar de forma directa mientras completamos la información definitiva."
        ctaText="Ver catálogo"
        ctaHref="#propiedades"
        imageLabel="Imagen institucional"
      />

      <CatalogSection />

      <PropertyMapSection />

      <LandProjectionModule />
      <AboutSection />
      <SellerBanner />

      <HeroSection
        variant="dark"
        compact={true}
        badgeText="Atención directa"
        title={<>Tu próxima consulta<br />comienza con una propiedad.</>}
        subtitle="Cada ficha abre una conversación de WhatsApp con el inmueble identificado."
        ctaText="Encontrar una propiedad"
        ctaHref="#propiedades"
      />

      <Footer />
      <PropertyDetailModal />
      <SellerModal />
      <PublishModal />
      <FloatingWhatsApp />
    </main>
  );
}
