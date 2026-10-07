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
  Info,
  Sparkles,
  LayoutGrid
} from 'lucide-react';

interface Step5ResponseProps {
  patterns: PatternKey[];
  selectedMechanisms?: string[];
  description: string;
  fallback: string;
  before?: string;
  after?: string;
  decisionGateOutcome: DecisionGateOutcome;
  onChange: (updates: {
    patterns?: PatternKey[];
    selectedMechanisms?: string[];
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
  selectedMechanisms = [],
  description,
  fallback,
  before,
  after,
  decisionGateOutcome,
  onChange,
}) => {
  const [expandedPattern, setExpandedPattern] = useState<PatternKey | null>(null);

  const togglePattern = (id: PatternKey) => {
    let next: PatternKey[];
    if (patterns.includes(id)) {
      if (patterns.length === 1) return; // Keep at least 1
      next = patterns.filter((p) => p !== id);
    } else {
      if (patterns.length >= 3) {
        return; // Enforce max 3 patterns to prevent cognitive bloat
      }
      next = [...patterns, id];
    }
    onChange({ patterns: next });
  };

  const toggleMechanism = (mech: string) => {
    const exists = selectedMechanisms.includes(mech);
    const updated = exists
      ? selectedMechanisms.filter((m) => m !== mech)
      : [...selectedMechanisms, mech];
    onChange({ selectedMechanisms: updated });
  };

  // Check recommendation match
  const getRecommendationMatch = (patId: PatternKey): { recommended: boolean; reason: string } => {
    if (decisionGateOutcome === 'ADAPTAR') {
      if (['priorizar', 'precargar', 'continuar', 'simplificar'].includes(patId)) {
        return { recommended: true, reason: 'Se alinea con la decisión ADAPTAR (transforma la interfaz).' };
      }
    } else if (decisionGateOutcome === 'SUGERIR') {
      if (['orientar', 'recordar', 'recuperar'].includes(patId)) {
        return { recommended: true, reason: 'Se alinea con la decisión SUGERIR (orienta sin forzar).' };
      }
    } else if (decisionGateOutcome === 'PREGUNTAR') {
      if (['confirmar', 'orientar'].includes(patId)) {
        return { recommended: true, reason: 'Se alinea con PREGUNTAR (solicita confirmación explícita).' };
      }
    }
    return { recommended: false, reason: '' };
  };

  return (
    <div className="space-y-6 max-w-[760px] mx-auto text-[#0F172A]">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
          Paso 5 de 6 • Respuesta & Fallback
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Cómo debería responder la interfaz?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 leading-relaxed">
          Selecciona de 1 a 3 patrones probados, elige el mecanismo de UI adecuado y define siempre una vía de escape (Fallback).
        </p>

        <div className="mt-2 text-xs sm:text-sm text-neutral-700 bg-neutral-100 px-3.5 py-2 rounded-lg inline-flex items-center gap-2 border border-neutral-200">
          <span className="font-semibold text-neutral-900">Postura del Decision Gate:</span>
          <span className="font-bold bg-neutral-900 text-white px-2 py-0.5 rounded text-xs">{decisionGateOutcome}</span>
          <span className="text-neutral-500">• Elige hasta 3 patrones complementarios</span>
        </div>
      </div>

      {/* 1. Patterns Grid */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-900">
          1. Patrones contextuales (Toca para seleccionar de 1 a 3)
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          Patrones ordenados y categorizados según la decisión de diseño tomada:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PATTERNS_DATA.map((pat) => {
            const isSelected = patterns.includes(pat.id);
            const isExpanded = expandedPattern === pat.id;
            const match = getRecommendationMatch(pat.id);

            return (
              <div
                key={pat.id}
                className={`p-3.5 rounded-card border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
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
                      className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-white text-neutral-900' : 'border border-neutral-300'
                      }`}
                      aria-label={`Seleccionar ${pat.name}`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                  </div>

                  {match.recommended && (
                    <div className={`text-[11px] font-semibold mb-1 flex items-center gap-1 ${isSelected ? 'text-amber-300' : 'text-amber-700'}`}>
                      <Sparkles className="w-3 h-3" />
                      <span>Recomendado por Decision Gate</span>
                    </div>
                  )}

                  <p
                    onClick={() => togglePattern(pat.id)}
                    className={`text-xs cursor-pointer leading-snug line-clamp-2 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {pat.shortDescription}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-200/40 flex items-center justify-between text-xs">
                  <span className={isSelected ? 'text-neutral-400' : 'text-neutral-500'}>
                    Riesgo: {pat.risk}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedPattern(isExpanded ? null : pat.id)}
                    className={`font-semibold flex items-center gap-0.5 min-h-[36px] px-1 ${
                      isSelected ? 'text-amber-300 hover:underline' : 'text-neutral-700 hover:text-neutral-900'
                    }`}
                  >
                    <span>{isExpanded ? 'Menos' : 'Detalles & UI'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Progressive disclosure details */}
                {isExpanded && (
                  <div className={`mt-2 pt-2 border-t text-xs space-y-2 animate-in fade-in ${
                    isSelected ? 'border-neutral-800 text-neutral-200' : 'border-neutral-100 text-neutral-700'
                  }`}>
                    <div>
                      <strong className="block text-[11px] uppercase tracking-wider">Cuándo usar:</strong>
                      <span className="leading-snug">{pat.whenToUse[0]}</span>
                    </div>

                    {pat.uiMechanisms && pat.uiMechanisms.length > 0 && (
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider mb-1">Mecanismos UI:</strong>
                        <div className="flex flex-wrap gap-1">
                          {pat.uiMechanisms.map((mech) => {
                            const isMechSelected = selectedMechanisms.includes(mech);
                            return (
                              <button
                                key={mech}
                                type="button"
                                onClick={() => toggleMechanism(mech)}
                                className={`text-[11px] px-2 py-1 rounded transition-colors ${
                                  isMechSelected
                                    ? 'bg-amber-400 text-neutral-900 font-bold'
                                    : isSelected
                                    ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                              >
                                {isMechSelected ? `✓ ${mech}` : `+ ${mech}`}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected UI mechanisms summary */}
      {selectedMechanisms.length > 0 && (
        <div className="p-3.5 rounded-card bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2">
          <LayoutGrid className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Mecanismos de interfaz seleccionados para el prototipo:</strong>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {selectedMechanisms.map((m) => (
                <span key={m} className="bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ¿Qué debería cambiar en la interfaz? */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100">
        <label htmlFor="response-desc" className="block text-sm font-semibold text-neutral-900">
          2. Descripción de la respuesta en pantalla
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
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
            3. Vía de escape (Fallback)
          </label>
          <span className="text-xs text-neutral-500">
            Garantiza autonomía y reversibilidad
          </span>
        </div>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          ¿Cómo puede el usuario rechazar la adaptación y continuar con el flujo estándar?
        </span>

        {/* Fallback presets chips with min 44px height */}
        <div className="flex flex-wrap gap-2 pt-1 pb-1">
          {FALLBACK_PRESETS.map((fb) => (
            <button
              key={fb}
              type="button"
              onClick={() => onChange({ fallback: fb })}
              className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors min-h-[44px] ${
                fallback === fb
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
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
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[48px]"
        />

        <div className="p-3 rounded-card bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-700 flex items-start gap-2">
          <Info className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
          <span>
            Las experiencias contextuales deben preservar la autonomía del usuario. Nunca bloquees el camino habitual.
          </span>
        </div>
      </div>

      {/* 4. Comparación visual: Antes vs Después (Requisito para "Lista para prototipar") */}
      <div className="space-y-3 pt-2 border-t border-neutral-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-900">
              4. Comparación visual: Antes vs. Después
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
              Requerido para prototipo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Contrasta la pantalla actual estática (Antes) frente a la respuesta contextual (Después):
          </p>
        </div>

        <div className="space-y-4 bg-neutral-50 p-4 rounded-card border border-neutral-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="before-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Antes (Experiencia estándar habitual)
              </label>
              <textarea
                id="before-input"
                rows={3}
                value={before || ''}
                onChange={(e) => onChange({ before: e.target.value })}
                placeholder="Ej: Mensaje de error rojo genérico 'No pudimos validar la cuenta' que borra todos los campos ingresados."
                className="w-full text-sm sm:text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label htmlFor="after-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
                Después (Respuesta contextual adaptada)
              </label>
              <textarea
                id="after-input"
                rows={3}
                value={after || ''}
                onChange={(e) => onChange({ after: e.target.value })}
                placeholder="Ej: Tarjeta de asistencia inline preservando datos válidos con sugerencia de banco y botón de pago alternativo."
                className="w-full text-sm sm:text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {(before || after) && (
            <BeforeAfterView before={before} after={after} />
          )}
        </div>
      </div>
    </div>
  );
};
