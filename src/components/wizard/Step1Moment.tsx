import React, { useState } from 'react';
import { Target, Sparkles, HelpCircle } from 'lucide-react';

interface Step1MomentProps {
  journey: string;
  moment: string;
  job: string;
  title: string;
  onChange: (updates: { journey?: string; moment?: string; job?: string; title?: string }) => void;
}

const QUICK_JOBS = [
  { label: 'Completar un pago', want: 'validar correctamente los datos', inOrderTo: 'completar el pago de manera segura' },
  { label: 'Corregir un error', want: 'entender qué dato falló', inOrderTo: 'corregir el error sin empezar de cero' },
  { label: 'Continuar una solicitud', want: 'retomar donde me quedé', inOrderTo: 'culminar mi trámite sin repetir pasos' },
  { label: 'Encontrar información', want: 'localizar la opción adecuada', inOrderTo: 'tomar una decisión informada' },
  { label: 'Confirmar una decisión', want: 'revisar el impacto de la acción', inOrderTo: 'proceder con total seguridad' },
  { label: 'Retomar una tarea', want: 'acceder a mis borradores guardados', inOrderTo: 'ahorrar tiempo' },
];

export const Step1Moment: React.FC<Step1MomentProps> = ({
  journey,
  moment,
  job,
  title,
  onChange,
}) => {
  const [showHelper, setShowHelper] = useState(false);

  const handleApplyQuickJob = (item: typeof QUICK_JOBS[0]) => {
    const formattedJob = `Quiero ${item.want} para poder ${item.inOrderTo}.`;
    const autoTitle = title || `${item.label} en ${moment || journey || 'el proceso'}`;
    onChange({ job: formattedJob, title: autoTitle });
  };

  return (
    <div className="space-y-6 max-w-[760px] mx-auto text-[#0F172A]">
      {/* Step Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Paso 1 de 6 • Momento
          </span>
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 min-h-[44px] px-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-neutral-500" />
            <span>¿Por qué empezar por el momento?</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿En qué momento del journey quieres ayudar al usuario?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 leading-relaxed">
          Las interfaces contextuales no cambian pantallas al azar. Responden en un punto preciso de la experiencia.
        </p>

        {showHelper && (
          <div className="mt-3 p-4 rounded-card bg-neutral-100 border border-neutral-200 text-sm text-neutral-800 leading-relaxed animate-in fade-in">
            <p className="font-semibold text-neutral-900 mb-1">
              Ubicar el momento previene diseñar personalizaciones huérfanas:
            </p>
            <p>
              Define primero el flujo general (Journey) y luego el punto crítico exacto donde ocurre la vacilación, duda o bloqueo.
            </p>
          </div>
        )}
      </div>

      {/* Field 1: Journey */}
      <div className="space-y-1.5">
        <label htmlFor="journey-input" className="block text-sm font-semibold text-neutral-900">
          1. Journey macro
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          El proceso o flujo general que está realizando la persona.
        </span>
        <input
          id="journey-input"
          type="text"
          value={journey}
          onChange={(e) => onChange({ journey: e.target.value })}
          placeholder="Ej: Pago de obligaciones, Solicitud de crédito, Onboarding de comercio"
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[48px]"
        />
      </div>

      {/* Field 2: Momento */}
      <div className="space-y-1.5">
        <label htmlFor="moment-input" className="block text-sm font-semibold text-neutral-900">
          2. Momento específico
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          La pantalla, paso o interacción concreta donde surge la oportunidad.
        </span>
        <input
          id="moment-input"
          type="text"
          value={moment}
          onChange={(e) => onChange({ moment: e.target.value })}
          placeholder="Ej: Validación de cuenta destino, Subida de soportes, Búsqueda sin resultados"
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[48px]"
        />
      </div>

      {/* Field 3: Job del usuario */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label htmlFor="job-input" className="block text-sm font-semibold text-neutral-900">
            3. Objetivo o Job del usuario
          </label>
          <span className="text-xs sm:text-sm text-neutral-600">
            Describe qué está intentando conseguir la persona.
          </span>
        </div>

        {/* Quick job suggestion chips (min 44px touch targets) */}
        <div className="flex flex-wrap gap-2 pt-1 pb-1">
          {QUICK_JOBS.map((qj) => (
            <button
              key={qj.label}
              type="button"
              onClick={() => handleApplyQuickJob(qj)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-xs sm:text-sm font-medium text-neutral-700 transition-colors min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{qj.label}</span>
            </button>
          ))}
        </div>

        <textarea
          id="job-input"
          rows={3}
          value={job}
          onChange={(e) => onChange({ job: e.target.value })}
          placeholder="Estructura recomendada: Quiero [validar la cuenta] para poder [realizar el pago de forma segura]."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* Case Title */}
      <div className="space-y-1.5 pt-2">
        <label htmlFor="title-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Nombre de la hipótesis (para identificarla en tu lista)
        </label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Ej: Recuperación asistida tras 3 errores de cuenta"
          className="w-full text-base font-semibold text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[48px]"
        />
      </div>
    </div>
  );
};
