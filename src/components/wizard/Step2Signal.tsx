import React, { useState } from 'react';
import { SignalType, SignalSource, EvidenceType } from '../../types';
import { EvidenceBadge } from '../ui/Badges';
import { HelpCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

interface Step2SignalProps {
  type: SignalType;
  description: string;
  source: SignalSource;
  evidenceType: EvidenceType;
  onChange: (updates: {
    type?: SignalType;
    description?: string;
    source?: SignalSource;
    evidenceType?: EvidenceType;
  }) => void;
}

const SIGNAL_TYPES: { type: SignalType; label: string; desc: string }[] = [
  { type: 'Error', label: 'Error', desc: 'Fallo al enviar datos o validar un campo' },
  { type: 'Repetición', label: 'Repetición', desc: 'Acciones idénticas consecutivas o periódicas' },
  { type: 'Abandono', label: 'Abandono', desc: 'Salida del flujo sin completar la tarea' },
  { type: 'Búsqueda', label: 'Búsqueda', desc: 'Búsquedas sin resultado o filtros exhaustivos' },
  { type: 'Navegación', label: 'Navegación', desc: 'Rutas erráticas o idas y vueltas entre pasos' },
  { type: 'Tiempo', label: 'Tiempo', desc: 'Permanencia prolongada o inactividad' },
  { type: 'Historial', label: 'Historial', desc: 'Hábitos consolidados de compras o pagos previos' },
  { type: 'Preferencia', label: 'Preferencia', desc: 'Ajustes o elecciones explícitas del usuario' },
  { type: 'Estado del journey', label: 'Estado del journey', desc: 'Trámites en curso o pasos pendientes' },
  { type: 'Transacción', label: 'Transacción', desc: 'Montos atípicos, cambios de moneda o saldo' },
  { type: 'Evento', label: 'Evento', desc: 'Dispositivo, hora, ubicación o evento externo' },
  { type: 'Otro', label: 'Otro', desc: 'Cualquier otro estímulo observable' },
];

const SIGNAL_SOURCES: { source: SignalSource; evidence: EvidenceType; label: string; desc: string }[] = [
  { source: 'Analytics / logs', evidence: 'OBSERVADA', label: 'Analytics / logs', desc: 'Datos duros de telemetría o servidores' },
  { source: 'Prueba de usuario', evidence: 'OBSERVADA', label: 'Prueba de usuario', desc: 'Comportamiento observado directamente en test' },
  { source: 'Investigación', evidence: 'INFERIDA', label: 'Investigación cualitativa', desc: 'Entrevistas o benchmarks previos' },
  { source: 'Observación', evidence: 'INFERIDA', label: 'Observación de soporte', desc: 'Grabaciones de sesión o tickets reportados' },
  { source: 'Contact center', evidence: 'INFERIDA', label: 'Contact center', desc: 'Casos y consultas habituales de clientes' },
  { source: 'Conocimiento del negocio', evidence: 'INFERIDA', label: 'Conocimiento del negocio', desc: 'Heurísticas comerciales o reglas de industria' },
  { source: 'Hipótesis', evidence: 'HIPOTÉTICA', label: 'Hipótesis de diseño', desc: 'Suposición inicial pendiente de validar' },
];

export const Step2Signal: React.FC<Step2SignalProps> = ({
  type,
  description,
  source,
  evidenceType,
  onChange,
}) => {
  const [showHelper, setShowHelper] = useState(false);

  const handleSourceChange = (newSource: SignalSource) => {
    const matched = SIGNAL_SOURCES.find((s) => s.source === newSource);
    const assignedEvidence: EvidenceType = matched?.evidence || 'HIPOTÉTICA';
    onChange({ source: newSource, evidenceType: assignedEvidence });
  };

  return (
    <div className="space-y-6 max-w-[760px] mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Paso 2 de 6 • Señal
          </span>
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 min-h-[44px]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>¿Qué cuenta como una señal?</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Qué está ocurriendo?
        </h2>
        <p className="text-base text-neutral-600 mt-1 leading-relaxed">
          Una señal es algo que podemos observar o potencialmente detectar en el comportamiento de la persona o el sistema.
        </p>

        {showHelper && (
          <div className="mt-3 p-4 rounded-card bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <p className="font-semibold text-neutral-900 mb-1">
              Distingue la señal de la interpretación:
            </p>
            <p>
              La señal es el hecho objetivo (ej: "3 intentos fallidos"). La interpretación es lo que supones que le pasa a la persona (ej: "podría estar confundida").
            </p>
          </div>
        )}
      </div>

      {/* 1. Tipo de señal (Max 3 cards per row desktop, 1 on mobile) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-900">
          1. Tipo de señal
        </label>
        <span className="text-xs text-neutral-500 block">
          Selecciona la categoría del estímulo observado:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SIGNAL_TYPES.map((st) => {
            const isSelected = type === st.type;
            return (
              <button
                key={st.type}
                type="button"
                onClick={() => onChange({ type: st.type })}
                className={`text-left p-3.5 rounded-card border transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="font-bold text-sm leading-tight">{st.label}</div>
                <div className={`text-xs mt-1 leading-tight ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {st.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ¿Qué observaste? */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100">
        <label htmlFor="signal-desc" className="block text-sm font-semibold text-neutral-900">
          2. ¿Qué observaste?
        </label>
        <span className="text-xs text-neutral-500 block">
          Describe el hecho concreto observable con la mayor precisión posible.
        </span>

        <textarea
          id="signal-desc"
          rows={3}
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Ej: El usuario corrigió tres veces el número de cuenta y obtuvo error de rechazo de pasarela."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />

        {!description && (
          <button
            type="button"
            onClick={() =>
              onChange({
                description: 'El usuario corrigió tres veces el número de cuenta.',
              })
            }
            className="text-xs text-neutral-500 hover:text-neutral-900 underline mt-1 inline-block"
          >
            Usar ejemplo: "El usuario corrigió tres veces el número de cuenta."
          </button>
        )}
      </div>

      {/* 3. ¿De dónde viene esta información? */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900">
          3. ¿De dónde viene esta información?
        </label>
        <span className="text-xs text-neutral-500 block">
          La fuente asigna automáticamente el tipo de evidencia de la hipótesis.
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SIGNAL_SOURCES.map((src) => {
            const isSelected = source === src.source;
            return (
              <button
                key={src.source}
                type="button"
                onClick={() => handleSourceChange(src.source)}
                className={`text-left p-3.5 rounded-card border transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="font-semibold text-xs sm:text-sm">{src.label}</div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {src.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Assigned Evidence Type Feedback Box */}
        <div className="mt-4 p-4 rounded-card bg-[#FAFBFD] border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
              Tipo de evidencia asignado
            </span>
            <EvidenceBadge type={evidenceType} size="md" />
          </div>

          <p className="text-xs text-neutral-600 max-w-sm leading-relaxed">
            {evidenceType === 'OBSERVADA' && 'Existe evidencia directa registrada en analítica o pruebas reales.'}
            {evidenceType === 'INFERIDA' && 'Tenemos indicios o heurísticas, pero no comprobación en producción.'}
            {evidenceType === 'HIPOTÉTICA' && 'Todavía necesitamos comprobarlo mediante un prototipo o experimento.'}
          </p>
        </div>

        {/* Reassuring note from requirements */}
        <div className="p-3.5 rounded-card bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>No necesitas tener todos los datos para continuar.</strong> Lo importante es dejar claro qué sabemos y qué estamos suponiendo.
          </p>
        </div>
      </div>
    </div>
  );
};
