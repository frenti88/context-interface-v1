import React from 'react';
import { ExpectedOutcome, ValidationMethod, MaturityLevelNumber } from '../../types';
import { Target, CheckCircle2, FlaskConical, BarChart3 } from 'lucide-react';
import { MATURITY_LEVELS } from '../../data/maturityData';

interface Step6EvidenceProps {
  data: {
    outcome?: ExpectedOutcome;
    validationMethod?: ValidationMethod;
    primaryMetric?: string;
    secondaryMetric?: string;
    expectedResult?: string;
    maturityLevel?: MaturityLevelNumber;
  };
  onChange: (updates: {
    evidence: {
      outcome: ExpectedOutcome;
      validationMethod: ValidationMethod;
      primaryMetric: string;
      secondaryMetric?: string;
      expectedResult: string;
    };
    maturityLevel?: MaturityLevelNumber;
  }) => void;
}

const OUTCOMES: { id: ExpectedOutcome; label: string; desc: string }[] = [
  { id: 'Finalización', label: 'Finalización', desc: 'Completar la transacción o flujo sin abandonos' },
  { id: 'Comprensión', label: 'Comprensión', desc: 'Claridad sobre términos, costos o pasos siguientes' },
  { id: 'Tiempo', label: 'Tiempo', desc: 'Menor tiempo de ciclo para tareas recurrentes' },
  { id: 'Reducción de errores', label: 'Reducción de errores', desc: 'Menos envíos fallidos o datos incorrectos' },
  { id: 'Menos abandono', label: 'Menos abandono', desc: 'Menor fuga en puntos críticos del embudo' },
  { id: 'Menos esfuerzo', label: 'Menos esfuerzo', desc: 'Menor carga física y mental (Customer Effort Score)' },
  { id: 'Mayor confianza', label: 'Mayor confianza', desc: 'Seguridad percibida al realizar operaciones delicadas' },
  { id: 'Menos pasos', label: 'Menos pasos', desc: 'Eliminación de pantallas intermedias innecesarias' },
  { id: 'Menos contactos de soporte', label: 'Menos soporte', desc: 'Disminución de tickets y llamadas al contact center' },
  { id: 'Otro', label: 'Otro', desc: 'Cualquier otro objetivo medible' },
];

const VALIDATION_METHODS: ValidationMethod[] = [
  'Prueba de usabilidad',
  'Entrevista',
  'Prototipo',
  'A/B test',
  'Analítica',
  'Logs',
  'Encuesta',
  'Experimento',
  'Implementación',
];

export const Step6Evidence: React.FC<Step6EvidenceProps> = ({ data, onChange }) => {
  const currentOutcome = data.outcome || 'Finalización';
  const currentMethod = data.validationMethod || 'Prueba de usabilidad';
  const currentPrimaryMetric = data.primaryMetric || '';
  const currentSecondaryMetric = data.secondaryMetric || '';
  const currentExpectedResult = data.expectedResult || '';
  const currentMaturity = data.maturityLevel ?? 1;

  const update = (
    outcome?: ExpectedOutcome,
    method?: ValidationMethod,
    primary?: string,
    secondary?: string,
    result?: string,
    maturity?: MaturityLevelNumber
  ) => {
    onChange({
      evidence: {
        outcome: outcome !== undefined ? outcome : currentOutcome,
        validationMethod: method !== undefined ? method : currentMethod,
        primaryMetric: primary !== undefined ? primary : currentPrimaryMetric,
        secondaryMetric: secondary !== undefined ? secondary : currentSecondaryMetric,
        expectedResult: result !== undefined ? result : currentExpectedResult,
      },
      maturityLevel: maturity !== undefined ? maturity : currentMaturity,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-2">
          ¿Cómo sabremos si ayudó?
        </h2>
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          Toda propuesta de personalización contextual debe ser falsable. Define el outcome esperado, cómo lo validarás y la métrica de éxito.
        </p>

        {/* 1. Expected Outcome */}
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          1. Outcome de experiencia esperado:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {OUTCOMES.map((out) => {
            const isSelected = currentOutcome === out.id;
            return (
              <button
                key={out.id}
                type="button"
                onClick={() => update(out.id, undefined, undefined, undefined, undefined, undefined)}
                className={`p-2.5 rounded-card border text-left transition-all min-h-[58px] ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="font-semibold text-xs leading-tight">{out.label}</div>
                <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {out.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Validation method */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          2. Tipo de validación propuesta:
        </label>
        <div className="flex flex-wrap gap-2">
          {VALIDATION_METHODS.map((method) => {
            const isSelected = currentMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => update(undefined, method, undefined, undefined, undefined, undefined)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Metrics inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            Métrica principal
          </label>
          <input
            type="text"
            value={currentPrimaryMetric}
            onChange={(e) => update(undefined, undefined, e.target.value, undefined, undefined, undefined)}
            placeholder="Ej: Tasa de finalización del pago (+15%)"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            Métrica secundaria <span className="text-neutral-400 font-normal">(Opcional)</span>
          </label>
          <input
            type="text"
            value={currentSecondaryMetric}
            onChange={(e) => update(undefined, undefined, undefined, e.target.value, undefined, undefined)}
            placeholder="Ej: Reducción de llamadas a soporte (-20%)"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* 4. Expected Hypothesis Statement */}
      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          Resultado esperado (Enunciado de hipótesis)
        </label>
        <p className="text-xs text-neutral-500 mb-2">
          Expresa qué cambio de comportamiento esperas observar si la solución tiene éxito.
        </p>
        <textarea
          rows={2}
          value={currentExpectedResult}
          onChange={(e) => update(undefined, undefined, undefined, undefined, e.target.value, undefined)}
          placeholder="Ej: La intervención debería aumentar la finalización del pago en usuarios que sufren al menos un intento fallido."
          className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* 5. Contextual Maturity required */}
      <div className="pt-3 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          Nivel de madurez contextual requerido
        </label>
        <p className="text-xs text-neutral-500 mb-3">
          ¿Qué nivel de sofisticación técnica y de datos exige esta solución?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {MATURITY_LEVELS.map((m) => {
            const isSelected = currentMaturity === m.level;
            return (
              <button
                key={m.level}
                type="button"
                onClick={() =>
                  update(undefined, undefined, undefined, undefined, undefined, m.level as MaturityLevelNumber)
                }
                className={`p-2.5 rounded-card border text-left transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="text-xs font-bold">Nivel {m.level}</div>
                <div className={`text-[11px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {m.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
