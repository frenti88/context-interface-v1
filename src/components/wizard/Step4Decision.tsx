import React from 'react';
import { InterventionDecision, ErrorImpact, ErrorCost, ContextConfidence } from '../../types';
import { AlertTriangle, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface Step4DecisionProps {
  data: {
    intervention?: InterventionDecision;
    possibleMisinterpretation?: ErrorImpact;
    errorCost?: ErrorCost;
    rationale?: string;
  };
  contextConfidence?: ContextConfidence;
  onChange: (updates: {
    decision: {
      intervention: InterventionDecision;
      possibleMisinterpretation: ErrorImpact;
      errorCost: ErrorCost;
      rationale?: string;
    };
  }) => void;
}

const INTERVENTIONS: {
  id: InterventionDecision;
  title: string;
  badge: string;
  description: string;
  recommendation: string;
}[] = [
  {
    id: 'No intervenir',
    title: 'No intervenir',
    badge: 'Conservadora',
    description: 'La señal existe, pero cambiar la interfaz generaría más ruido cognitivo que ayuda real.',
    recommendation: 'Ideal cuando la confianza es baja, la señal es ruidosa o el costo de distraer al usuario supera el beneficio.',
  },
  {
    id: 'Acompañar',
    title: 'Acompañar',
    badge: 'Asistida',
    description: 'Agregar orientación contextual, hints o feedback visual sin modificar sustancialmente la experiencia.',
    recommendation: 'Mantiene intacta la jerarquía principal y ofrece ayuda no intrusiva al lado de la tarea en curso.',
  },
  {
    id: 'Adaptar',
    title: 'Adaptar',
    badge: 'Transformadora',
    description: 'Cambiar contenido, jerarquía, componentes, flujo o la acción disponible en primer plano.',
    recommendation: 'Apropiada cuando la confianza es alta y se cuenta con evidencia sólida de que la ruta estándar genera frustración.',
  },
];

const ERROR_IMPACTS: ErrorImpact[] = [
  'Sin impacto significativo',
  'Confusión',
  'Fricción adicional',
  'Decisión incorrecta',
  'Riesgo financiero',
  'Riesgo de privacidad',
  'Riesgo operativo',
];

export const Step4Decision: React.FC<Step4DecisionProps> = ({
  data,
  contextConfidence = 'Media',
  onChange,
}) => {
  const currentIntervention = data.intervention || 'Acompañar';
  const currentMisinterpretation = data.possibleMisinterpretation || 'Confusión';
  const currentCost = data.errorCost || 'Bajo';
  const currentRationale = data.rationale || '';

  const update = (
    interv?: InterventionDecision,
    mis?: ErrorImpact,
    cost?: ErrorCost,
    rat?: string
  ) => {
    onChange({
      decision: {
        intervention: interv !== undefined ? interv : currentIntervention,
        possibleMisinterpretation: mis !== undefined ? mis : currentMisinterpretation,
        errorCost: cost !== undefined ? cost : currentCost,
        rationale: rat !== undefined ? rat : currentRationale,
      },
    });
  };

  // Warning trigger if cost is Alto and confidence is Baja or Media, and trying to Adaptar
  const showWarning =
    currentCost === 'Alto' && (contextConfidence === 'Baja' || contextConfidence === 'Media');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-2">
          ¿Debería intervenir la interfaz?
        </h2>
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          Tener una señal no obliga a intervenir. Evalúa si la respuesta debe transformar la pantalla, limitarse a acompañar o permanecer inmutable.
        </p>

        {/* 3 Possibilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {INTERVENTIONS.map((item) => {
            const isSelected = currentIntervention === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => update(item.id, undefined, undefined, undefined)}
                className={`text-left p-4 rounded-card border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="font-bold text-sm sm:text-base">{item.title}</span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-neutral-200' : 'text-neutral-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                <div
                  className={`mt-3 pt-2 text-[11px] border-t ${
                    isSelected ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-500'
                  }`}
                >
                  {item.recommendation}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rationale justification */}
      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          Justificación de la decisión
        </label>
        <p className="text-xs text-neutral-500 mb-2">
          ¿Por qué elegiste esta postura de intervención para este caso?
        </p>
        <textarea
          rows={2}
          value={currentRationale}
          onChange={(e) => update(undefined, undefined, undefined, e.target.value)}
          placeholder="Ej: Acompañar con sugerencias claras tiene bajo costo de error y previene abandono sin romper la pantalla."
          className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* Misinterpretation Impact & Cost of Error */}
      <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            ¿Qué podría ocurrir si interpretamos mal el contexto?
          </label>
          <p className="text-xs text-neutral-500 mb-2">
            Identifica el peor escenario ante un falso positivo.
          </p>
          <select
            value={currentMisinterpretation}
            onChange={(e) => update(undefined, e.target.value as ErrorImpact, undefined, undefined)}
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          >
            {ERROR_IMPACTS.map((impact) => (
              <option key={impact} value={impact}>
                {impact}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            Costo de equivocarnos
          </label>
          <p className="text-xs text-neutral-500 mb-2">
            Impacto acumulado en el usuario y el negocio.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['Bajo', 'Medio', 'Alto'] as ErrorCost[]).map((cost) => {
              const isSelected = currentCost === cost;
              return (
                <button
                  key={cost}
                  type="button"
                  onClick={() => update(undefined, undefined, cost, undefined)}
                  className={`py-2 px-3 text-center rounded-btn border text-xs font-semibold transition-colors ${
                    isSelected
                      ? cost === 'Alto'
                        ? 'bg-rose-900 text-white border-rose-900'
                        : cost === 'Medio'
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {cost}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Warning callout for high cost & low/medium confidence */}
      {showWarning && (
        <aside aria-label="Advertencia de riesgo" className="p-4 rounded-card border border-rose-200 bg-rose-50 text-rose-900 text-sm flex gap-3 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-0.5">Alerta de Riesgo en la Intervención</h4>
            <p className="text-xs leading-relaxed text-rose-800">
              El costo de equivocarse es <strong>{currentCost}</strong> y la confianza de la interpretación es <strong>{contextConfidence}</strong>.{' '}
              <strong>Considera una intervención reversible o pedir confirmación antes de adaptar la experiencia.</strong>
            </p>
          </div>
        </aside>
      )}
    </div>
  );
};
