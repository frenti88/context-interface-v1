import React from 'react';
import { ValidationOutcome, ValidationMethod } from '../../types';
import { Target, CheckCircle2, FlaskConical, HelpCircle } from 'lucide-react';

interface Step6ValidationProps {
  outcome: ValidationOutcome;
  method: ValidationMethod;
  primaryMetric: string;
  secondaryMetric?: string;
  expectedResult?: string;
  onChange: (updates: {
    outcome?: ValidationOutcome;
    method?: ValidationMethod;
    primaryMetric?: string;
    secondaryMetric?: string;
    expectedResult?: string;
  }) => void;
}

const OUTCOMES: { id: ValidationOutcome; label: string; desc: string }[] = [
  { id: 'Finalización', label: 'Finalización', desc: 'Completar la tarea sin abandonar' },
  { id: 'Comprensión', label: 'Comprensión', desc: 'Entender qué ocurrió y qué hacer' },
  { id: 'Tiempo', label: 'Tiempo', desc: 'Ahorrar segundos en tareas repetitivas' },
  { id: 'Errores', label: 'Errores', desc: 'Reducir fallos al ingresar datos' },
  { id: 'Recuperación', label: 'Recuperación', desc: 'Resolver el problema tras un error' },
  { id: 'Abandono', label: 'Abandono', desc: 'Menor deserción en pasos críticos' },
  { id: 'Esfuerzo', label: 'Esfuerzo', desc: 'Menor carga mental percibida' },
  { id: 'Confianza', label: 'Confianza', desc: 'Mayor seguridad en decisiones' },
  { id: 'Número de pasos', label: 'Número de pasos', desc: 'Menos clics y pantallas intermedias' },
  { id: 'Necesidad de soporte', label: 'Menos soporte', desc: 'Menos llamadas o tickets de ayuda' },
];

const METHODS: ValidationMethod[] = [
  'Prueba de usabilidad',
  'Prototipo',
  'Entrevista',
  'Comparación A/B',
  'Analytics',
  'Logs',
  'Encuesta',
  'Implementación piloto',
];

export const Step6Validation: React.FC<Step6ValidationProps> = ({
  outcome,
  method,
  primaryMetric,
  secondaryMetric,
  expectedResult,
  onChange,
}) => {
  return (
    <div className="space-y-6 max-w-[760px] mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
          Paso 6 de 6 • Validación & Métricas
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Cómo sabremos si realmente ayudó?
        </h2>
        <p className="text-base text-neutral-600 mt-1 leading-relaxed">
          Toda hipótesis contextual debe ser falsable. Define el objetivo que deseas mejorar, cómo comprobarlo y tu criterio de éxito.
        </p>
      </div>

      {/* 1. ¿Qué queremos mejorar? */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-900">
          1. ¿Qué queremos mejorar?
        </label>
        <span className="text-xs text-neutral-500 block">
          Selecciona el outcome de experiencia clave:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {OUTCOMES.map((out) => {
            const isSelected = outcome === out.id;
            return (
              <button
                key={out.id}
                type="button"
                onClick={() => onChange({ outcome: out.id })}
                className={`p-2.5 rounded-card border text-left transition-all min-h-[58px] ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="font-bold text-xs leading-tight">{out.label}</div>
                <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {out.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ¿Cómo podemos comprobarlo? */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900">
          2. ¿Cómo podemos comprobarlo?
        </label>
        <span className="text-xs text-neutral-500 block">
          Elige el método de validación más rápido y accesible:
        </span>

        <div className="flex flex-wrap gap-2">
          {METHODS.map((m) => {
            const isSelected = method === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ method: m })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-[38px] ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Métrica principal */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100">
        <label htmlFor="primary-metric" className="block text-sm font-semibold text-neutral-900">
          3. Métrica u objetivo principal
        </label>
        <span className="text-xs text-neutral-500 block">
          Puede ser cuantitativa (números) o cualitativa si no tienes benchmarks aún:
        </span>

        <input
          id="primary-metric"
          type="text"
          value={primaryMetric}
          onChange={(e) => onChange({ primaryMetric: e.target.value })}
          placeholder="Ej: Tasa de recuperación del error o 'El usuario entiende qué ocurrió y sabe cómo continuar'."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
        />

        {!primaryMetric && (
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-500">
            <span>Ejemplos:</span>
            <button
              type="button"
              onClick={() => onChange({ primaryMetric: 'Tasa de recuperación del error' })}
              className="underline hover:text-neutral-900"
            >
              "Tasa de recuperación del error"
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onChange({ primaryMetric: 'El usuario entiende qué ocurrió y sabe cómo continuar' })}
              className="underline hover:text-neutral-900"
            >
              "El usuario entiende y sabe cómo continuar"
            </button>
          </div>
        )}
      </div>

      {/* 4. Métrica secundaria y Resultado esperado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
        <div className="space-y-1">
          <label htmlFor="sec-metric" className="block text-xs font-semibold text-neutral-900">
            Métrica secundaria <span className="text-neutral-400 font-normal">(Opcional)</span>
          </label>
          <input
            id="sec-metric"
            type="text"
            value={secondaryMetric || ''}
            onChange={(e) => onChange({ secondaryMetric: e.target.value })}
            placeholder="Ej: Reducción de llamadas a soporte (-20%)"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="exp-result" className="block text-xs font-semibold text-neutral-900">
            Resultado esperado <span className="text-neutral-400 font-normal">(Opcional)</span>
          </label>
          <input
            id="exp-result"
            type="text"
            value={expectedResult || ''}
            onChange={(e) => onChange({ expectedResult: e.target.value })}
            placeholder="Ej: Menos fricción sin incrementar errores"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>
    </div>
  );
};
