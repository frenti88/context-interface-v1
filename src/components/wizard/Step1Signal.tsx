import React, { useState } from 'react';
import { SignalType, SignalSource, EvidenceLevel } from '../../types';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { EvidenceBadge } from '../ui/Badges';

interface Step1SignalProps {
  data: {
    type?: SignalType;
    description?: string;
    source?: SignalSource;
    evidenceLevel?: EvidenceLevel;
    journey?: string;
    title?: string;
  };
  onChange: (updates: {
    signal?: {
      type: SignalType;
      description: string;
      source: SignalSource;
      evidenceLevel: EvidenceLevel;
    };
    journey?: string;
    title?: string;
  }) => void;
}

const SIGNAL_TYPES: { type: SignalType; label: string; desc: string }[] = [
  { type: 'Error', label: 'Error', desc: 'Fallos en campos, formularios o pasarelas' },
  { type: 'Abandono', label: 'Abandono', desc: 'Salida del flujo antes de completar el objetivo' },
  { type: 'Repetición', label: 'Repetición', desc: 'Acciones idénticas consecutivas o periódicas' },
  { type: 'Búsqueda', label: 'Búsqueda', desc: 'Consultas con 0 resultados o filtros complejos' },
  { type: 'Navegación', label: 'Navegación', desc: 'Rutas erráticas, rebotes o idas y vueltas' },
  { type: 'Tiempo', label: 'Tiempo', desc: 'Inactividad prolongada o prisa inusual' },
  { type: 'Historial', label: 'Historial', desc: 'Hábitos y frecuencia de compras o pagos previos' },
  { type: 'Preferencia', label: 'Preferencia', desc: 'Ajustes explícitos guardados por el usuario' },
  { type: 'Estado del journey', label: 'Estado del journey', desc: 'Trámites o pedidos en curso' },
  { type: 'Producto', label: 'Producto', desc: 'Cambios en inventario, precio o estado del servicio' },
  { type: 'Transacción', label: 'Transacción', desc: 'Montos atípicos o cambios de divisas' },
  { type: 'Evento externo', label: 'Evento externo', desc: 'Horarios bancarios, clima o ubicación' },
  { type: 'Otra señal', label: 'Otra señal', desc: 'Cualquier otro estímulo observable' },
];

const SIGNAL_SOURCES: { source: SignalSource; level: EvidenceLevel; desc: string }[] = [
  { source: 'Analítica', level: 'nivel-1', desc: 'Telemetría de eventos y embudos cuantitativos' },
  { source: 'Logs', level: 'nivel-1', desc: 'Registros técnicos de errores en servidor o API' },
  { source: 'Research', level: 'nivel-2', desc: 'Pruebas cualitativas o entrevistas previas' },
  { source: 'Observación', level: 'nivel-2', desc: 'Sesiones grabadas o feedback de soporte' },
  { source: 'Negocio', level: 'nivel-2', desc: 'Heurísticas conocidas y reglas comerciales' },
  { source: 'Hipótesis', level: 'nivel-3', desc: 'Idea no probada que requiere validación' },
];

export const Step1Signal: React.FC<Step1SignalProps> = ({ data, onChange }) => {
  const [showHelper, setShowHelper] = useState(false);

  const currentType = data.type || 'Error';
  const currentSource = data.source || 'Observación';
  const currentDescription = data.description || '';
  const currentTitle = data.title || '';
  const currentJourney = data.journey || '';

  // Calculate auto evidence level based on source
  const matchedSource = SIGNAL_SOURCES.find((s) => s.source === currentSource);
  const currentEvidenceLevel: EvidenceLevel = matchedSource?.level || 'nivel-3';

  const updateField = (newType?: SignalType, newSource?: SignalSource, newDesc?: string, newTitle?: string, newJour?: string) => {
    const sType = newType !== undefined ? newType : currentType;
    const sSource = newSource !== undefined ? newSource : currentSource;
    const sDesc = newDesc !== undefined ? newDesc : currentDescription;
    const sLevel = SIGNAL_SOURCES.find((s) => s.source === sSource)?.level || 'nivel-3';

    onChange({
      signal: {
        type: sType,
        source: sSource,
        description: sDesc,
        evidenceLevel: sLevel,
      },
      title: newTitle !== undefined ? newTitle : currentTitle,
      journey: newJour !== undefined ? newJour : currentJourney,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Journey input */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-neutral-100">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            Nombre de la oportunidad o caso
          </label>
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => updateField(undefined, undefined, undefined, e.target.value, undefined)}
            placeholder="Ej. Recuperación asistida tras 3 errores de pago"
            className="w-full text-base font-semibold text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            Momento / Journey
          </label>
          <input
            type="text"
            value={currentJourney}
            onChange={(e) => updateField(undefined, undefined, undefined, undefined, e.target.value)}
            placeholder="Ej. Checkout y Pagos"
            className="w-full text-sm text-neutral-800 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Main question */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            ¿Qué está ocurriendo?
          </h2>
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 min-h-[44px] px-2"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>¿Qué cuenta como señal?</span>
            {showHelper ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showHelper && (
          <div className="p-3.5 rounded-lg bg-neutral-100/70 border border-neutral-200 text-xs text-neutral-700 space-y-1 mb-4 leading-relaxed">
            <p className="font-semibold text-neutral-900">
              Una señal es cualquier dato medible o comportamiento observable del usuario o su entorno.
            </p>
            <p>
              Evita suposiciones sobre intenciones en este paso. Concéntrate exclusivamente en lo que el sistema o un observador puede constatar empíricamente.
            </p>
          </div>
        )}

        <p className="text-sm text-neutral-600 mb-4">
          Selecciona el tipo de señal principal que activa esta hipótesis:
        </p>

        {/* Signal type chips / grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {SIGNAL_TYPES.map((st) => {
            const isSelected = currentType === st.type;
            return (
              <button
                key={st.type}
                type="button"
                onClick={() => updateField(st.type, undefined, undefined, undefined, undefined)}
                className={`text-left p-3 rounded-card border transition-all min-h-[58px] ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="font-semibold text-xs sm:text-sm">{st.label}</div>
                <div
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {st.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Observation description */}
      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
          ¿Qué observaste concretamente?
        </label>
        <p className="text-xs text-neutral-500 mb-2">
          Describe el hecho específico con la mayor precisión posible.
        </p>
        <textarea
          rows={3}
          value={currentDescription}
          onChange={(e) => updateField(undefined, undefined, e.target.value, undefined, undefined)}
          placeholder="Ej: El usuario intentó ingresar tres veces una cuenta y obtuvo error de rechazo de pasarela."
          className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
        {/* Suggestion shortcut */}
        {!currentDescription && (
          <button
            type="button"
            onClick={() =>
              updateField(
                undefined,
                undefined,
                'El usuario intentó ingresar tres veces una cuenta bancaria y obtuvo error.',
                undefined,
                undefined
              )
            }
            className="text-xs text-neutral-500 hover:text-neutral-900 mt-1 inline-block underline"
          >
            Usar ejemplo: "El usuario intentó ingresar tres veces una cuenta y obtuvo error."
          </button>
        )}
      </div>

      {/* Source selection */}
      <div className="pt-2 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          ¿De dónde viene esta señal?
        </label>
        <p className="text-xs text-neutral-500 mb-3">
          La fuente asignará automáticamente el nivel de evidencia del caso.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SIGNAL_SOURCES.map((src) => {
            const isSelected = currentSource === src.source;
            return (
              <button
                key={src.source}
                type="button"
                onClick={() => updateField(undefined, src.source, undefined, undefined, undefined)}
                className={`text-left p-3 rounded-card border transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-semibold text-xs sm:text-sm">{src.source}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                    {src.level === 'nivel-1' ? 'Nivel 1' : src.level === 'nivel-2' ? 'Nivel 2' : 'Nivel 3'}
                  </span>
                </div>
                <div className={`text-[11px] leading-snug ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {src.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Auto assigned Evidence level indicator */}
        <div className="mt-4 p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-700">Nivel de evidencia asignado:</span>
            <EvidenceBadge level={currentEvidenceLevel} size="sm" />
          </div>
          <div className="text-xs text-neutral-500">
            {currentEvidenceLevel === 'nivel-1' && 'Basado en telemetría o datos empíricos de producción.'}
            {currentEvidenceLevel === 'nivel-2' && 'Basado en investigación cualitativa o conocimiento previo.'}
            {currentEvidenceLevel === 'nivel-3' && 'Hipótesis sin verificar que requerirá validación antes del despliegue.'}
          </div>
        </div>
      </div>
    </div>
  );
};
