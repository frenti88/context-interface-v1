import React, { useState } from 'react';
import { PatternKey, FallbackOption, DecisionGateOutcome } from '../../types';
import { PATTERNS_DATA } from '../../data/patterns';
import { BeforeAfterView } from '../card/BeforeAfterView';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  Info
} from 'lucide-react';

interface Step5ResponseProps {
  patterns: PatternKey[];
  description: string;
  fallback: string;
  before?: string;
  after?: string;
  decisionGateOutcome: DecisionGateOutcome;
  onChange: (updates: {
    patterns?: PatternKey[];
    description?: string;
    fallback?: string;
    before?: string;
    after?: string;
  }) => void;
}

const FALLBACK_PRESETS: FallbackOption[] = [
  'Ignorar recomendación',
  'Cerrar ayuda',
  'Continuar normalmente',
  'Cambiar opción',
  'Volver atrás',
  'Confirmar manualmente',
];

export const Step5Response: React.FC<Step5ResponseProps> = ({
  patterns,
  description,
  fallback,
  before,
  after,
  decisionGateOutcome,
  onChange,
}) => {
  const [expandedPattern, setExpandedPattern] = useState<PatternKey | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(Boolean(before || after));

  const togglePattern = (id: PatternKey) => {
    let next: PatternKey[];
    if (patterns.includes(id)) {
      if (patterns.length === 1) return; // Keep at least 1
      next = patterns.filter((p) => p !== id);
    } else {
      if (patterns.length >= 3) {
        // Enforce max 3 patterns to avoid cognitive bloat
        return;
      }
      next = [...patterns, id];
    }
    onChange({ patterns: next });
  };

  return (
    <div className="space-y-6 max-w-[760px] mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
          Paso 5 de 6 • Respuesta & Fallback
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Qué necesita el usuario en este momento?
        </h2>
        <p className="text-base text-neutral-600 mt-1 leading-relaxed">
          Selecciona cómo responderá la interfaz aplicando de 1 a 3 patrones probados y define siempre un camino de escape (Fallback).
        </p>

        <div className="mt-2 text-xs text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg inline-block">
          Decisión tomada: <strong>{decisionGateOutcome}</strong> • Puedes elegir máximo 3 patrones complementarios.
        </div>
      </div>

      {/* 1. Patterns Grid (Max 3 per row on desktop, 1 on mobile) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-900">
          1. Patrones contextuales recomendados
        </label>
        <span className="text-xs text-neutral-500 block">
          Toca para seleccionar (máximo 3):
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PATTERNS_DATA.map((pat) => {
            const isSelected = patterns.includes(pat.id);
            const isExpanded = expandedPattern === pat.id;

            return (
              <div
                key={pat.id}
                className={`p-3.5 rounded-card border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <button
                      type="button"
                      onClick={() => togglePattern(pat.id)}
                      className="font-bold text-sm sm:text-base text-left flex-1"
                    >
                      {pat.name}
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePattern(pat.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-white text-neutral-900' : 'border border-neutral-300'
                      }`}
                      aria-label={`Seleccionar ${pat.name}`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </div>

                  <p
                    onClick={() => togglePattern(pat.id)}
                    className={`text-xs cursor-pointer leading-snug line-clamp-2 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {pat.shortDescription}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-200/40 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-neutral-400' : 'text-neutral-400'}>
                    Riesgo: {pat.risk}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedPattern(isExpanded ? null : pat.id)}
                    className={`font-semibold flex items-center gap-0.5 ${
                      isSelected ? 'text-amber-300 hover:underline' : 'text-neutral-700 hover:text-neutral-900'
                    }`}
                  >
                    <span>{isExpanded ? 'Menos' : 'Ver más'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {/* Progressive disclosure details */}
                {isExpanded && (
                  <div className={`mt-2 pt-2 border-t text-[11px] space-y-1.5 ${
                    isSelected ? 'border-neutral-800 text-neutral-200' : 'border-neutral-100 text-neutral-700'
                  }`}>
                    <div>
                      <strong className="block text-[10px] uppercase tracking-wider">Cuándo usar:</strong>
                      <span>{pat.whenToUse[0]}</span>
                    </div>
                    <div>
                      <strong className="block text-[10px] uppercase tracking-wider">Ejemplo:</strong>
                      <span className="italic">{pat.example.after}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ¿Qué debería cambiar en la interfaz? */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100">
        <label htmlFor="response-desc" className="block text-sm font-semibold text-neutral-900">
          2. ¿Qué debería cambiar en la interfaz?
        </label>
        <span className="text-xs text-neutral-500 block">
          Describe la respuesta tangible en textos, componentes o acciones:
        </span>

        <textarea
          id="response-desc"
          rows={3}
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Ej: Preservar los datos válidos, explicar por qué la cuenta no pudo validarse y ofrecer dos acciones seguras para continuar."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* 3. Fallback: Conservar el control del usuario */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label htmlFor="fallback-input" className="block text-sm font-semibold text-neutral-900">
            3. Fallback: ¿Qué puede hacer el usuario si nos equivocamos?
          </label>
          <span className="text-xs text-neutral-500">
            Garantiza autonomía y reversibilidad
          </span>
        </div>

        {/* Fallback presets chips */}
        <div className="flex flex-wrap gap-2 pt-1 pb-1">
          {FALLBACK_PRESETS.map((fb) => (
            <button
              key={fb}
              type="button"
              onClick={() => onChange({ fallback: fb })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-[36px] ${
                fallback === fb
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {fb}
            </button>
          ))}
        </div>

        <input
          id="fallback-input"
          type="text"
          value={fallback}
          onChange={(e) => onChange({ fallback: e.target.value })}
          placeholder="Ej: El usuario puede cerrar la sugerencia y continuar con el flujo estándar o reintentar manualmente."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />

        <div className="p-3 rounded-card bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2">
          <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            Las experiencias contextuales deben conservar el control de la persona. Nunca bloquees la salida a la experiencia estándar.
          </span>
        </div>
      </div>

      {/* 4. Comparación Opcional: Antes vs Después */}
      <div className="space-y-3 pt-2 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Comparación visual: Antes vs. Después <span className="text-neutral-400 font-normal">(Opcional)</span>
            </h3>
            <p className="text-xs text-neutral-500">
              Contrasta la pantalla actual estática con la respuesta contextual.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className="text-xs font-bold text-neutral-700 hover:underline p-2 min-h-[44px]"
          >
            {showBeforeAfter ? 'Ocultar campos' : '+ Definir Antes y Después'}
          </button>
        </div>

        {showBeforeAfter && (
          <div className="space-y-4 bg-neutral-50 p-4 rounded-card border border-neutral-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Antes (Experiencia estándar)
                </label>
                <textarea
                  rows={3}
                  value={before || ''}
                  onChange={(e) => onChange({ before: e.target.value })}
                  placeholder="Ej: 'No pudimos validar la cuenta' (error rojo plano que borra los campos)."
                  className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
                  Después (Respuesta contextual)
                </label>
                <textarea
                  rows={3}
                  value={after || ''}
                  onChange={(e) => onChange({ after: e.target.value })}
                  placeholder="Ej: 'No pudimos validar esta cuenta tras varios intentos. [Revisar número] [Elegir otra cuenta]'."
                  className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            {(before || after) && (
              <BeforeAfterView before={before} after={after} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
