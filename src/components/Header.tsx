'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Menu,
  X,
  Home,
  MapPin,
  Sparkles,
  Building2,
  Users,
  PhoneCall,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    isMobileMenuOpen,
    setMobileMenuOpen,
    openSellerModal
  } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      label: 'Propiedades',
      subtitle: 'Catálogo de inmuebles disponibles',
      href: '#propiedades',
      icon: Home
    },
    {
      label: 'Mapa Satelital',
      subtitle: 'Ubicaciones y vistas aéreas en Paraguay',
      href: '#mapa-satelital',
      icon: MapPin,
      badge: 'En vivo'
    },
    {
      label: 'Proyecciones',
      subtitle: 'Simulaciones y potencial arquitectónico',
      href: '#proyecciones',
      icon: Sparkles
    },
    {
      label: 'Vender Propiedad',
      subtitle: 'Asesoramiento y gestión comercial',
      href: '#vender',
      icon: Building2,
      onClick: () => openSellerModal()
    },
    {
      label: 'Nosotros',
      subtitle: 'Nuestra visión y forma de trabajo',
      href: '#nosotros',
      icon: Users
    },
    {
      label: 'Contacto',
      subtitle: 'Atención directa y ubicación',
      href: '#contacto',
      icon: PhoneCall
    }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`} id="mainHeader">
      <div className="container-custom flex items-center justify-between h-full">
        <a href="#" className="flex items-center gap-3 text-white group z-50">
          <div className="brand-logo-mark">
            <img
              src="/img/logo-ysyry-montana-bn.svg"
              alt="Ysyry Inmobiliaria"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="brand-logo-text">
            Ysyry
            <span>INMOBILIARIA</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-7">
            <li>
              <a href="#propiedades" className="text-sm font-medium text-white/85 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white/80 hover:after:w-full after:transition-all">
                Propiedades
              </a>
            </li>
            <li>
              <a href="#mapa-satelital" className="text-sm font-medium text-white/85 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white/80 hover:after:w-full after:transition-all">
                Mapa Satelital
              </a>
            </li>
            <li>
              <a href="#proyecciones" className="text-sm font-medium text-white/85 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white/80 hover:after:w-full after:transition-all">
                Proyecciones
              </a>
            </li>
            <li>
              <a href="#vender" className="text-sm font-medium text-white/85 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white/80 hover:after:w-full after:transition-all">
                Vender
              </a>
            </li>
            <li>
              <a href="#nosotros" className="text-sm font-medium text-white/85 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white/80 hover:after:w-full after:transition-all">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#contacto" className="text-sm font-medium text-white/85 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white/80 hover:after:w-full after:transition-all">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-5 z-50">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all"
            aria-label={isMobileMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] bg-white/98 backdrop-blur-2xl z-40 flex flex-col md:hidden animate-in fade-in slide-in-from-top-3 duration-250 border-t border-slate-200 shadow-2xl overflow-y-auto text-slate-900">
          <div className="flex-1 px-5 py-6 flex flex-col justify-between relative z-10">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-2 font-mono">
                Menú de Navegación
              </div>

              <div className="space-y-2.5">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        item.onClick?.();
                      }}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-all active:scale-[0.99] shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shrink-0 shadow-2xs">
                          <Icon size={19} />
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-serif font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100/70 border border-blue-200/80 px-1.5 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 font-light block truncate">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 space-y-4">
              <a
                href="https://wa.me/595981879612?text=Hola%20Ysyry%20Inmobiliaria%2C%20quisiera%20consultar%20sobre%20las%20propiedades%20disponibles."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>

              <div className="text-center text-[11px] text-slate-400 font-light">
                Ysyry Inmobiliaria &bull; Paraguay
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
