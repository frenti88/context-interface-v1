import React from 'react';
import { ConfidenceLevel, UserValueLevel, ErrorRiskLevel, DecisionGateOutcome } from '../../types';
import { DecisionGateBadge } from '../ui/Badges';
import { AlertTriangle, ArrowRightCircle, Layers, MessageSquare, Ban, Info } from 'lucide-react';

export function calculateDecisionGate(
  confidence: ConfidenceLevel,
  userValue: UserValueLevel,
  errorRisk: ErrorRiskLevel
): {
  recommendation: DecisionGateOutcome;
  rationale: string;
  advice: string;
} {
  // Low value cases
  if (userValue === 'Bajo') {
    return {
      recommendation: 'NO ADAPTAR',
      rationale: 'El beneficio percibido por el usuario es bajo. Intervenir agregaría más ruido cognitivo que valor.',
      advice: 'Mantener la experiencia estándar y enfocar esfuerzos de diseño en momentos de mayor fricción.',
    };
  }

  // High risk + Low confidence
  if (errorRisk === 'Alto' && confidence === 'Baja') {
    return {
      recommendation: 'NO ADAPTAR',
      rationale: 'Riesgo alto con incertidumbre: equivocarse tiene consecuencias serias (financieras, operativas o de privacidad) y no hay certeza.',
      advice: 'No adaptar la interfaz automáticamente. Mantener el flujo estándar hasta contar con evidencia observada.',
    };
  }

  // High risk + Medium confidence
  if (errorRisk === 'Alto' && confidence === 'Media') {
    return {
      recommendation: 'PREGUNTAR',
      rationale: 'Existe valor en ayudar, pero el costo del error es alto. Se requiere consentimiento consciente.',
      advice: 'Validar la intención con el usuario mediante un diálogo de confirmación reversible antes de ejecutar cualquier cambio.',
    };
  }

  // High risk + High confidence
  if (errorRisk === 'Alto' && confidence === 'Alta') {
    return {
      recommendation: 'SUGERIR',
      rationale: 'Conocemos el contexto con alta certeza, pero debido al impacto de la acción se debe preservar el control del usuario.',
      advice: 'Ofrecer una sugerencia contextual destacada con opción de 1 clic, pero dejando siempre el camino habitual visible.',
    };
  }

  // High value + Low risk + High confidence
  if (userValue === 'Alto' && errorRisk === 'Bajo' && confidence === 'Alta') {
    return {
      recommendation: 'ADAPTAR',
      rationale: 'Máxima oportunidad contextual: alta certeza, alto beneficio y costo de error casi nulo.',
      advice: 'La interfaz puede transformar componentes, reordenar accesos o precargar datos para ahorrar esfuerzo.',
    };
  }

  // High/Medium value + Medium/Low risk
  if (confidence === 'Alta' && errorRisk === 'Medio') {
    return {
      recommendation: 'SUGERIR',
      rationale: 'Buena oportunidad para acelerar la tarea manteniendo mecanismos de reversibilidad.',
      advice: 'Acompañar con sugerencias contextuales sin bloquear ni sustituir el flujo principal.',
    };
  }

  if (confidence === 'Media') {
    return {
      recommendation: 'SUGERIR',
      rationale: 'Tenemos indicios pero no certeza absoluta. La ayuda contextual debe ser no intrusiva y descartable.',
      advice: 'Mostrar micro-guía, atajo o hint fácilmente ignorable con 1 toque.',
    };
  }

  // Default fallback
  return {
    recommendation: 'PREGUNTAR',
    rationale: 'Incertidumbre moderada. Es más seguro verificar la intención de la persona que asumir.',
    advice: 'Pedir confirmación suave antes de aplicar adaptaciones.',
  };
}

interface DecisionGateProps {
  confidence: ConfidenceLevel;
  userValue: UserValueLevel;
  errorRisk: ErrorRiskLevel;
  currentDecision: DecisionGateOutcome;
  onSelectDecision: (outcome: DecisionGateOutcome) => void;
}

export const DecisionGate: React.FC<DecisionGateProps> = ({
  confidence,
  userValue,
  errorRisk,
  currentDecision,
  onSelectDecision,
}) => {
  const gate = calculateDecisionGate(confidence, userValue, errorRisk);

  return (
    <div className="bg-[#FAFBFD] p-5 sm:p-6 rounded-card border border-neutral-300 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Decision Gate
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Evaluación cruzada: Confianza ({confidence}) + Valor ({userValue}) + Riesgo ({errorRisk})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Recomendación del sistema:</span>
          <DecisionGateBadge outcome={gate.recommendation} />
        </div>
      </div>

      {/* Rationale explanation */}
      <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed space-y-1">
        <p className="font-semibold text-neutral-900">{gate.rationale}</p>
        <p className="text-neutral-600 text-xs">{gate.advice}</p>
      </div>

      {/* 4 Decision Options for User to Decide */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
          Decisión del equipo para esta interfaz:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(['ADAPTAR', 'SUGERIR', 'PREGUNTAR', 'NO ADAPTAR'] as DecisionGateOutcome[]).map((outcome) => {
            const isSelected = currentDecision === outcome;
            const isRecommended = gate.recommendation === outcome;

            return (
              <button
                key={outcome}
                type="button"
                onClick={() => onSelectDecision(outcome)}
                className={`p-3.5 rounded-card border text-left transition-all flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : isRecommended
                    ? 'border-neutral-400 bg-white hover:border-neutral-900 text-neutral-800'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs sm:text-sm">{outcome}</span>
                    {isRecommended && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                      }`}>
                        Recomendado
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] leading-tight ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {outcome === 'ADAPTAR' && 'Responder directamente en pantalla.'}
                    {outcome === 'SUGERIR' && 'Ofrecer ayuda conservando control.'}
                    {outcome === 'PREGUNTAR' && 'Confirmar antes de modificar.'}
                    {outcome === 'NO ADAPTAR' && 'Mantener experiencia estándar.'}
                  </div>
                </div>

                <div className={`text-[10px] pt-2 mt-1 border-t ${
                  isSelected ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-400'
                }`}>
                  {outcome === 'ADAPTAR' && 'Alta automatización'}
                  {outcome === 'SUGERIR' && 'Reversible (1 clic)'}
                  {outcome === 'PREGUNTAR' && 'Confirmación explícita'}
                  {outcome === 'NO ADAPTAR' && 'Cero cambios en UI'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
