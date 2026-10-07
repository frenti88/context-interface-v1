import React from 'react';
import { 
  ConfidenceLevel, 
  UserValueLevel, 
  ErrorRiskLevel, 
  DecisionGateOutcome, 
  EvidenceType,
  ImplementationReadiness 
} from '../../types';
import { DecisionGateBadge, ReadinessBadge } from '../ui/Badges';
import { ArrowRightCircle, Layers, MessageSquare, Ban, Info, ShieldCheck } from 'lucide-react';

export function calculateDecisionGate(
  confidence?: ConfidenceLevel,
  userValue?: UserValueLevel,
  errorRisk?: ErrorRiskLevel,
  evidenceType?: EvidenceType
): {
  recommendation: DecisionGateOutcome;
  readiness: ImplementationReadiness;
  rationale: string;
  readinessExplanation: string;
  advice: string;
} {
  // Safe fallbacks when fields are not yet evaluated
  const c = confidence || 'Media';
  const v = userValue || 'Medio';
  const r = errorRisk || 'Medio';
  const e = evidenceType || 'HIPOTÉTICA';

  // 1. Calculate Design Decision
  let recommendation: DecisionGateOutcome = 'SUGERIR';
  let rationale = '';
  let advice = '';

  if (v === 'Bajo') {
    recommendation = 'NO ADAPTAR';
    rationale = 'El valor percibido por el usuario es bajo. Intervenir agregaría más fricción y ruido cognitivo que beneficio real.';
    advice = 'Mantener la experiencia estándar neutral y enfocar el esfuerzo de diseño en momentos de mayor impacto del journey.';
  } else if (r === 'Alto' && c === 'Baja') {
    recommendation = 'NO ADAPTAR';
    rationale = 'Riesgo alto con incertidumbre: equivocarse tiene consecuencias graves (financieras, de privacidad u operativas) y la confianza es baja.';
    advice = 'No adaptar la interfaz automáticamente. Mantener el flujo estándar hasta contar con evidencia observada.';
  } else if (r === 'Alto' && c === 'Media') {
    recommendation = 'PREGUNTAR';
    rationale = 'Existe valor en asistir, pero el costo del error es alto y la confianza es parcial. Se requiere confirmación consciente.';
    advice = 'Validar la intención con el usuario mediante un diálogo o confirmation sheet reversible antes de ejecutar cualquier cambio.';
  } else if (r === 'Alto' && c === 'Alta') {
    recommendation = 'SUGERIR';
    rationale = 'Conocemos el contexto con alta confianza, pero debido al impacto de la acción se debe preservar siempre el control del usuario.';
    advice = 'Ofrecer una sugerencia contextual destacada con opción de 1 clic, pero dejando siempre el camino habitual visible y fallback claro.';
  } else if (v === 'Alto' && r === 'Bajo' && c === 'Alta') {
    recommendation = 'ADAPTAR';
    rationale = 'Máxima oportunidad contextual: alta confianza, alto valor y costo de error casi nulo.';
    advice = 'La interfaz puede transformar componentes, reordenar accesos o precargar datos para ahorrar esfuerzo al usuario.';
  } else if (c === 'Alta' && r === 'Medio') {
    recommendation = 'SUGERIR';
    rationale = 'Buena oportunidad para acelerar la tarea manteniendo mecanismos claros de reversibilidad y autonomía.';
    advice = 'Acompañar con sugerencias contextuales sin bloquear ni sustituir el flujo principal de interacción.';
  } else if (c === 'Media') {
    recommendation = 'SUGERIR';
    rationale = 'Tenemos indicios pero no certeza absoluta. La intervención debe ser no intrusiva, fácilmente comprensible y descartable.';
    advice = 'Mostrar micro-guía, atajo o hint contextual ignorable con 1 toque.';
  } else {
    recommendation = 'PREGUNTAR';
    rationale = 'Incertidumbre en la interpretación. Es más seguro verificar la intención con el usuario que asumir por él.';
    advice = 'Pedir confirmación suave antes de aplicar adaptaciones.';
  }

  // 2. Calculate Implementation Readiness (Separado de la decisión de diseño)
  let readiness: ImplementationReadiness = 'PROTOTIPAR';
  let readinessExplanation = '';

  if (e === 'OBSERVADA' && c === 'Alta' && v === 'Alto' && r === 'Bajo') {
    readiness = 'PREPARAR IMPLEMENTACIÓN';
    readinessExplanation = 'Señal observada directamente en producción, alta confianza y bajo riesgo. Lista para preparar especificación técnica e implementación.';
  } else if (e === 'OBSERVADA' && c === 'Alta') {
    readiness = 'PREPARAR IMPLEMENTACIÓN';
    readinessExplanation = 'Respaldada por datos reales y alta confianza. Requiere definir salvaguardas y pruebas de regresión con el equipo de ingeniería.';
  } else if (e === 'HIPOTÉTICA') {
    readiness = 'PROTOTIPAR';
    readinessExplanation = 'Existe suficiente valor potencial para explorar esta respuesta, pero todavía necesitamos validar la hipótesis con prototipo antes de considerarla para implementación.';
  } else if (c === 'Baja') {
    readiness = 'EXPLORAR';
    readinessExplanation = 'La confianza en la interpretación es baja. Se recomienda explorar cualitativamente el momento antes de invertir en código.';
  } else {
    readiness = 'PROTOTIPAR';
    readinessExplanation = 'Evidencia o confianza parcial. Ideal para prototipar en Figma y validar con 5 usuarios antes de pasar al backlog de desarrollo.';
  }

  return {
    recommendation,
    readiness,
    rationale,
    readinessExplanation,
    advice,
  };
}

interface DecisionGateProps {
  confidence?: ConfidenceLevel;
  userValue?: UserValueLevel;
  errorRisk?: ErrorRiskLevel;
  evidenceType?: EvidenceType;
  currentDecision?: DecisionGateOutcome;
  currentReadiness?: ImplementationReadiness;
  onSelectDecision: (outcome: DecisionGateOutcome, readiness?: ImplementationReadiness) => void;
}

export const DecisionGate: React.FC<DecisionGateProps> = ({
  confidence,
  userValue,
  errorRisk,
  evidenceType,
  currentDecision,
  currentReadiness,
  onSelectDecision,
}) => {
  const gate = calculateDecisionGate(confidence, userValue, errorRisk, evidenceType);
  const activeDecision = currentDecision || gate.recommendation;
  const activeReadiness = currentReadiness || gate.readiness;

  return (
    <section aria-labelledby="decision-gate-title" className="bg-[#FAFBFD] p-5 sm:p-7 rounded-card border border-neutral-300 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-neutral-900" aria-hidden="true" />
            <h3 id="decision-gate-title" className="text-base font-bold uppercase tracking-wider text-neutral-900">
              Decision Gate Metodológico
            </h3>
          </div>
          <p className="text-sm text-neutral-600 mt-1 leading-normal">
            Cruce de 4 factores: Evidencia ({evidenceType || 'Sin clasificar'}) + Confianza ({confidence || 'Sin evaluar'}) + Valor ({userValue || 'Sin evaluar'}) + Riesgo ({errorRisk || 'Sin evaluar'}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-600 font-medium">Recomendación:</span>
            <DecisionGateBadge outcome={gate.recommendation} size="sm" />
          </div>
          <ReadinessBadge readiness={gate.readiness} size="sm" />
        </div>
      </div>

      {/* Two Column Evaluation: Decisión de diseño vs Preparación para implementación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-card bg-white border border-neutral-200 space-y-2">
          <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
            <Info className="w-4 h-4 text-neutral-700" aria-hidden="true" />
            <span>A. Postura de Intervención en Interfaz</span>
          </div>
          <p className="text-sm text-neutral-800 leading-relaxed">
            {gate.rationale}
          </p>
          <p className="text-xs text-neutral-600 leading-normal pt-1 border-t border-neutral-100">
            <strong>Guía de diseño:</strong> {gate.advice}
          </p>
        </div>

        <div className="p-4 rounded-card bg-white border border-neutral-200 space-y-2">
          <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span>B. Preparación para Implementación (Readiness)</span>
          </div>
          <p className="text-sm text-neutral-800 leading-relaxed">
            {gate.readinessExplanation}
          </p>
          <div className="pt-1 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span>Nivel de madurez sugerido:</span>
            <span className="font-semibold text-neutral-900">{gate.readiness}</span>
          </div>
        </div>
      </div>

      {/* 4 Decision Options for User to Select */}
      <div className="space-y-3 pt-2">
        <label className="block text-sm font-bold uppercase tracking-wider text-neutral-700">
          Decisión del equipo para esta interfaz (Elige la postura a documentar):
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(['ADAPTAR', 'SUGERIR', 'PREGUNTAR', 'NO ADAPTAR'] as DecisionGateOutcome[]).map((outcome) => {
            const isSelected = activeDecision === outcome;
            const isRecommended = gate.recommendation === outcome;

            return (
              <button
                key={outcome}
                type="button"
                onClick={() => onSelectDecision(outcome, gate.readiness)}
                className={`p-4 rounded-card border text-left transition-all flex flex-col justify-between min-h-[110px] focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : isRecommended
                    ? 'border-neutral-400 bg-white hover:border-neutral-900 text-neutral-900 shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
                aria-pressed={isSelected}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-bold text-base">{outcome}</span>
                    {isRecommended && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-950 border border-amber-300'
                      }`}>
                        Sugerido
                      </span>
                    )}
                  </div>
                  <div className={`text-xs leading-normal ${isSelected ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {outcome === 'ADAPTAR' && 'Responder directamente transformando o precargando la pantalla.'}
                    {outcome === 'SUGERIR' && 'Ofrecer ayuda contextual destacada conservando el control del usuario.'}
                    {outcome === 'PREGUNTAR' && 'Confirmar la intención explícitamente antes de modificar datos.'}
                    {outcome === 'NO ADAPTAR' && 'Mantener la experiencia estándar neutral sin intervención.'}
                  </div>
                </div>

                <div className={`text-xs pt-2 mt-2 border-t font-medium ${
                  isSelected ? 'border-neutral-800 text-neutral-300' : 'border-neutral-100 text-neutral-500'
                }`}>
                  {outcome === 'ADAPTAR' && 'Alta automatización'}
                  {outcome === 'SUGERIR' && 'Reversible con 1 toque'}
                  {outcome === 'PREGUNTAR' && 'Consentimiento explícito'}
                  {outcome === 'NO ADAPTAR' && 'Cero cambios en UI'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
