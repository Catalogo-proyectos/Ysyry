'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { createInquiry } from '@/lib/api';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const PublishModal: React.FC = () => {
  const { isPublishModalOpen, closePublishModal } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const closeAndReset = () => {
    closePublishModal();
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setEmail('');
      setDetails('');
    }, 250);
  };

  useEffect(() => {
    if (!isPublishModalOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && closeAndReset();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublishModalOpen]);

  if (!isPublishModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      await createInquiry({
        name,
        email,
        message: details,
        kind: 'PUBLISH',
      });
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo enviar la solicitud. Intentalo de nuevo.');
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay active" onClick={closeAndReset}>
      <div
        className="modal-card max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Publicar inmueble"
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
          <span className="tag-badge mb-3">Publicación Exclusiva</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 mb-2">
            Publicá tu Inmueble con Ysyry
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Accedé a nuestra cartera de inversores VIP y posicionamiento en portales de primer nivel.
          </p>

          {status === 'success' ? (
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
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Inmobiliaria Delta o Nombre Propietario"
                  className="form-input"
                />
              </div>

              <div className="form-group text-left">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  name="message"
                  minLength={10}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Departamento 2 dormitorios en Villa Morra, 95m², USD 140.000..."
                  className="form-textarea"
                />
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
                  'Enviar Propiedad para Revisión'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};