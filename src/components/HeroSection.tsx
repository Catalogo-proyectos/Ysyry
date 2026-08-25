'use client';

import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  id?: string;
  bgImage?: string;
  badgeText?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageLabel?: string;
  variant?: 'image' | 'dark' | 'gradient';
  compact?: boolean;
}

export const HeroSection: React.FC<HeroProps> = ({
  id,
  bgImage,
  badgeText,
  title,
  subtitle,
  ctaText = 'Explorar propiedades',
  ctaHref = '#propiedades',
  imageLabel,
  variant = 'image',
  compact = false
}) => {
  const isImageVariant = variant === 'image' && Boolean(bgImage);

  return (
    <section
      id={id}
      className={`hero-fullscreen ${compact ? 'hero-compact' : ''} ${!isImageVariant ? 'hero-ambient-dark' : ''}`}
      style={isImageVariant ? { backgroundImage: `url('${bgImage}')` } : undefined}
    >
      {isImageVariant ? (
        <div className="hero-overlay"></div>
      ) : (
        <div className="hero-ambient-elements" aria-hidden="true">
          <div className="ambient-glow-1"></div>
          <div className="ambient-glow-2"></div>
          <div className="ambient-grid-pattern"></div>
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="hero-content">
          {badgeText && (
            <span
              className="tag-badge"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              {badgeText}
            </span>
          )}
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}

          {ctaText && (
            <div className="flex flex-wrap items-center gap-4">
              <a href={ctaHref} className="btn-luxury btn-white-luxury">
                {ctaText} <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>
      </div>

      {isImageVariant && imageLabel && <span className="hero-image-label">{imageLabel}</span>}
    </section>
  );
};

