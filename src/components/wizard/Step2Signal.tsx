import React, { useState } from 'react';
import { SignalType, SignalSource, EvidenceType } from '../../types';
import { EvidenceBadge } from '../ui/Badges';
import { HelpCircle, AlertCircle, Info, Sparkles, Check } from 'lucide-react';

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

const SIGNAL_SOURCES: { source: SignalSource; label: string; desc: string }[] = [
  { source: 'Analytics / logs', label: 'Analytics / logs', desc: 'Telemetría, servidores, eventos analíticos' },
  { source: 'Prueba de usuario', label: 'Prueba de usuario', desc: 'Observado en test o sesión de usabilidad' },
  { source: 'Investigación', label: 'Investigación cualitativa', desc: 'Entrevistas, diarios o benchmarks' },
  { source: 'Observación', label: 'Observación de soporte', desc: 'Grabaciones de sesión o tickets reportados' },
  { source: 'Contact center', label: 'Contact center', desc: 'Consultas frecuentes de usuarios' },
  { source: 'Conocimiento del negocio', label: 'Conocimiento del negocio', desc: 'Heurísticas comerciales o de la industria' },
  { source: 'Hipótesis', label: 'Hipótesis de diseño', desc: 'Suposición inicial del equipo de producto' },
];

const EVIDENCE_LEVELS: {
  type: EvidenceType;
  symbol: string;
  label: string;
  description: string;
  implication: string;
}[] = [
  {
    type: 'OBSERVADA',
    symbol: '[●]',
    label: 'Evidencia Observada [●]',
    description: 'Registrada y comprobada directamente en telemetría, logs o pruebas con usuarios.',
    implication: 'Habilita adaptar o intervenir con mayor solidez.',
  },
  {
    type: 'INFERIDA',
    symbol: '[△]',
    label: 'Evidencia Inferida [△]',
    description: 'Respaldada por heurísticas, tickets de soporte o investigación cualitativa previa.',
    implication: 'Recomienda sugerir o preguntar antes de cambiar la pantalla.',
  },
  {
    type: 'HIPOTÉTICA',
    symbol: '[?]',
    label: 'Evidencia Hipotética [?]',
    description: 'Suposición del equipo pendiente de comprobación empírica.',
    implication: 'Ideal para validar en prototipos antes de programar en código.',
  },
];

export const Step2Signal: React.FC<Step2SignalProps> = ({
  type,
  description,
  source,
  evidenceType,
  onChange,
}) => {
  const [showHelper, setShowHelper] = useState(false);

  return (
    <div className="space-y-6 max-w-[760px] mx-auto text-[#0F172A]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Paso 2 de 6 • Señal
          </span>
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 min-h-[44px] px-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-neutral-500" />
            <span>¿Qué cuenta como una señal?</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Qué está ocurriendo? (Señal observable)
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 leading-relaxed">
          Una señal es algo observable o detectable en el comportamiento del usuario o el sistema. Distingue el hecho observable de tus suposiciones.
        </p>

        {showHelper && (
          <div className="mt-3 p-4 rounded-card bg-neutral-100 border border-neutral-200 text-sm text-neutral-800 leading-relaxed animate-in fade-in">
            <p className="font-semibold text-neutral-900 mb-1">
              Distingue la señal de la interpretación:
            </p>
            <p>
              <strong>Señal</strong> = El hecho objetivo (ej: "3 intentos fallidos de número de cuenta").<br />
              <strong>Interpretación</strong> = Lo que supones que le pasa a la persona (ej: "podría estar confundida sobre qué banco es").
            </p>
          </div>
        )}
      </div>

      {/* 1. Tipo de señal */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-900">
          1. Tipo de señal
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
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
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
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
          2. ¿Qué observaste concretamente?
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
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
            className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 underline mt-1 inline-block"
          >
            Usar ejemplo: "El usuario corrigió tres veces el número de cuenta."
          </button>
        )}
      </div>

      {/* 3. Fuente de la señal */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900">
          3. ¿De dónde proviene esta información? (Fuente)
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          Indica el canal o artefacto donde se originó este hallazgo:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SIGNAL_SOURCES.map((src) => {
            const isSelected = source === src.source;
            return (
              <button
                key={src.source}
                type="button"
                onClick={() => onChange({ source: src.source })}
                className={`text-left p-3.5 rounded-card border transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div className="font-semibold text-sm">{src.label}</div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {src.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Calidad de evidencia (Explícitamente separable de la fuente) */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="block text-sm font-semibold text-neutral-900">
            4. Nivel de evidencia asignado
          </label>
          <span className="text-xs text-neutral-500">
            Elige con rigor la certeza de la evidencia
          </span>
        </div>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          La calidad de la evidencia condiciona la recomendación del Decision Gate:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EVIDENCE_LEVELS.map((el) => {
            const isSelected = evidenceType === el.type;
            return (
              <button
                key={el.type}
                type="button"
                onClick={() => onChange({ evidenceType: el.type })}
                className={`p-3.5 rounded-card border text-left transition-all min-h-[96px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base">{el.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className={`text-xs mt-1 leading-snug ${isSelected ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {el.description}
                  </p>
                </div>
                <div className={`text-[11px] font-medium pt-2 border-t ${
                  isSelected ? 'border-neutral-800 text-amber-300' : 'border-neutral-100 text-neutral-500'
                }`}>
                  {el.implication}
                </div>
              </button>
            );
          })}
        </div>

        {/* Informative advice */}
        <div className="p-3.5 rounded-card bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-800 flex items-start gap-2.5 mt-3">
          <Info className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>No necesitas tener todos los datos para continuar.</strong> Si estás explorando una idea con tu equipo, márcala honestamente como <strong>Evidencia Hipotética [?]</strong>. Esto te permitirá crear el prototipo para ir a buscar la evidencia que falta.
          </p>
        </div>
      </div>
    </div>
  );
};
