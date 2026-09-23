'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { createInquiry } from '@/lib/api';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const SellerModal: React.FC = () => {
  const { isSellerModalOpen, closeSellerModal } = useAppStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('casa');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isSellerModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      await createInquiry({
        name,
        phone,
        message: `Tasación de ${propertyType} en ${location}`,
        kind: 'TASATION',
        location,
        propertyType,
      });
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo enviar la solicitud. Intentalo de nuevo.');
      setStatus('error');
    }
  };

  const closeAndReset = () => {
    closeSellerModal();
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setPhone('');
      setLocation('');
      setPropertyType('casa');
    }, 250);
  };

  return (
    <div className="modal-overlay active" onClick={closeAndReset}>
      <div
        className="modal-card max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAndReset}
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

          {status === 'success' ? (
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
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Carlos Benítez"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: +595 981 000 000"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Ubicación de la Propiedad</label>
                <input
                  type="text"
                  required
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Asunción, Barrio Carmelitas"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Tipo de Inmueble</label>
                <select
                  className="form-select-full"
                  required
                  name="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa / Residencia</option>
                  <option value="terreno">Terreno / Lote</option>
                  <option value="comercial">Edificio / Local Comercial</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn-luxury btn-primary-luxury mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Enviando...
                  </span>
                ) : (
                  'Solicitar Tasación Gratuita'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};