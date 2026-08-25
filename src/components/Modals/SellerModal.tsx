'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, CheckCircle2 } from 'lucide-react';

export const SellerModal: React.FC = () => {
  const { isSellerModalOpen, closeSellerModal } = useAppStore();
  const [submitted, setSubmitted] = useState(false);

  if (!isSellerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeSellerModal();
    }, 2500);
  };

  return (
    <div className="modal-overlay active" onClick={closeSellerModal}>
      <div
        className="modal-card max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeSellerModal}
          className="modal-close-btn"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="modal-body p-8 sm:p-10">
          <span className="tag-badge mb-3">Valoración Gratuita</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 mb-2">
            Vendé tu Propiedad al Mejor Valor
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Completá el formulario para que un tasador certificado de Ysyry Inmobiliaria analice tu inmueble.
          </p>

          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 size={48} className="text-green-500 mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl text-slate-900">¡Solicitud Recibida!</h4>
              <p className="text-slate-600 text-sm">
                Un asesor especializado te contactará a la brevedad con la tasación estimada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group text-left">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carlos Benítez"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: +595 981 000 000"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Ubicación de la Propiedad</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Asunción, Barrio Carmelitas"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Tipo de Inmueble</label>
                <select className="form-select-full" required>
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa / Residencia</option>
                  <option value="terreno">Terreno / Lote</option>
                  <option value="comercial">Edificio / Local Comercial</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-luxury btn-primary-luxury mt-4"
              >
                Solicitar Tasación Gratuita
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
