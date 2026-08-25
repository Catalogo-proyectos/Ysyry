'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, CheckCircle2 } from 'lucide-react';

export const PublishModal: React.FC = () => {
  const { isPublishModalOpen, closePublishModal } = useAppStore();
  const [submitted, setSubmitted] = useState(false);

  if (!isPublishModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closePublishModal();
    }, 2500);
  };

  return (
    <div className="modal-overlay active" onClick={closePublishModal}>
      <div
        className="modal-card max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePublishModal}
          className="modal-close-btn"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="modal-body p-8 sm:p-10">
          <span className="tag-badge mb-3">Publicación Exclusiva</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 mb-2">
            Publicá tu Inmueble con Ysyry
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Accedé a nuestra cartera de inversores VIP y posicionamiento en portales de primer nivel.
          </p>

          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 size={48} className="text-green-500 mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl text-slate-900">¡Información Recibida!</h4>
              <p className="text-slate-600 text-sm">
                Nuestro equipo comercial se contactará para coordinar la sesión fotográfica y publicación.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group text-left">
                <label className="form-label">Tu Nombre / Agencia</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Inmobiliaria Delta o Nombre Propietario"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">
                  Detalles del Inmueble (Precio estimado, m², dorms, ubicación)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Departamento 2 dormitorios en Villa Morra, 95m², USD 140.000..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-luxury btn-primary-luxury mt-4"
              >
                Enviar Propiedad para Revisión
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
