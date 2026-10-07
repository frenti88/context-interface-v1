import React, { useState } from 'react';
import { ValidationOutcome, ValidationMethod, ExperienceImpact } from '../../types';
import { Target, CheckCircle2, FlaskConical, HelpCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface Step6ValidationProps {
  outcome: ValidationOutcome;
  method: ValidationMethod;
  primaryMetric: string;
  secondaryMetric?: string;
  expectedResult?: string;
  experienceImpact?: ExperienceImpact;
  onChange: (updates: {
    outcome?: ValidationOutcome;
    method?: ValidationMethod;
    primaryMetric?: string;
    secondaryMetric?: string;
    expectedResult?: string;
    experienceImpact?: ExperienceImpact;
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
  experienceImpact,
  onChange,
}) => {
  const [showImpactModal, setShowImpactModal] = useState(false);

  return (
    <div className="space-y-6 max-w-[760px] mx-auto text-[#0F172A]">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
          Paso 6 de 6 • Validación & Métricas
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Cómo sabremos si realmente ayudó?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 leading-relaxed">
          Toda hipótesis contextual debe ser falsable: debe quedar claro qué observaríamos si la intervención estorba en lugar de ayudar.
        </p>
      </div>

      {/* 1. ¿Qué queremos mejorar? */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-900">
          1. ¿Qué queremos mejorar? (Outcome clave)
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          Selecciona el objetivo principal de la experiencia que pretendes impactar:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {OUTCOMES.map((out) => {
            const isSelected = outcome === out.id;
            return (
              <button
                key={out.id}
                type="button"
                onClick={() => onChange({ outcome: out.id })}
                className={`p-3 rounded-card border text-left transition-all min-h-[64px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm leading-tight">{out.label}</div>
                <div className={`text-[11px] truncate mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
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
          2. ¿Cómo podemos comprobarlo? (Método de validación)
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          Elige el método más rápido y apropiado para probar tu hipótesis:
        </span>

        <div className="flex flex-wrap gap-2">
          {METHODS.map((m) => {
            const isSelected = method === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ method: m })}
                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors min-h-[44px] ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                    : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-800'
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
        <span className="text-xs sm:text-sm text-neutral-600 block">
          Puede ser cuantitativa (datos duros) o cualitativa (observación de comprensión en pruebas con usuarios):
        </span>

        <input
          id="primary-metric"
          type="text"
          value={primaryMetric}
          onChange={(e) => onChange({ primaryMetric: e.target.value })}
          placeholder="Ej: Tasa de resolución de la tarea o 'El usuario entiende qué ocurrió y sabe cómo continuar sin asistencia'."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[48px]"
        />

        {!primaryMetric && (
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-600">
            <span>Ejemplos:</span>
            <button
              type="button"
              onClick={() => onChange({ primaryMetric: 'Tasa de recuperación del error' })}
              className="underline hover:text-neutral-900 font-medium"
            >
              "Tasa de recuperación del error"
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onChange({ primaryMetric: 'El usuario comprende qué ocurrió y continúa sin soporte' })}
              className="underline hover:text-neutral-900 font-medium"
            >
              "El usuario comprende y continúa sin soporte"
            </button>
          </div>
        )}
      </div>

      {/* 4. Métrica secundaria y Resultado esperado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
        <div className="space-y-1.5">
          <label htmlFor="sec-metric" className="block text-xs font-semibold text-neutral-900">
            Métrica secundaria <span className="text-neutral-500 font-normal">(Opcional)</span>
          </label>
          <input
            id="sec-metric"
            type="text"
            value={secondaryMetric || ''}
            onChange={(e) => onChange({ secondaryMetric: e.target.value })}
            placeholder="Ej: Reducción de consultas al contact center"
            className="w-full text-sm sm:text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="exp-result" className="block text-xs font-semibold text-neutral-900">
            Criterio de éxito falsable <span className="text-neutral-500 font-normal">(Opcional)</span>
          </label>
          <input
            id="exp-result"
            type="text"
            value={expectedResult || ''}
            onChange={(e) => onChange({ expectedResult: e.target.value })}
            placeholder="Ej: 4 de 5 usuarios resuelven el paso en <30s sin solicitar ayuda"
            className="w-full text-sm sm:text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[44px]"
          />
        </div>
      </div>

      {/* 5. Impacto en la Experiencia (Opcional) */}
      <div className="pt-2 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => setShowImpactModal(!showImpactModal)}
          className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 py-2 font-medium min-h-[44px]"
        >
          <TrendingUp className="w-4 h-4 text-neutral-500" />
          <span>Impacto en la Experiencia: 3 niveles de medición (Opcional)</span>
          {showImpactModal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showImpactModal && (
          <div className="mt-2 p-4 rounded-card bg-neutral-50 border border-neutral-200 text-xs sm:text-sm space-y-3 text-neutral-700 animate-in fade-in">
            <span className="font-bold text-neutral-900 block text-xs uppercase tracking-wider">
              Marco de 3 niveles de impacto (Micro a Macro)
            </span>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-neutral-900 text-xs mb-1">
                  Nivel 1: Outcome directo en el momento
                </label>
                <input
                  type="text"
                  value={experienceImpact?.directOutcome || ''}
                  onChange={(e) =>
                    onChange({
                      experienceImpact: {
                        ...experienceImpact,
                        directOutcome: e.target.value,
                      },
                    })
                  }
                  placeholder="Ej: Menos errores en la cuenta, menor vacilación"
                  className="w-full text-xs sm:text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-900 text-xs mb-1">
                  Nivel 2: Indicador del journey completo
                </label>
                <input
                  type="text"
                  value={experienceImpact?.journeyIndicator || ''}
                  onChange={(e) =>
                    onChange({
                      experienceImpact: {
                        ...experienceImpact,
                        journeyIndicator: e.target.value,
                      },
                    })
                  }
                  placeholder="Ej: Task Success Rate, Customer Effort Score (CES)"
                  className="w-full text-xs sm:text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-900 text-xs mb-1">
                  Nivel 3: Indicador agregado de negocio / satisfacción
                </label>
                <input
                  type="text"
                  value={experienceImpact?.aggregateIndicator || ''}
                  onChange={(e) =>
                    onChange({
                      experienceImpact: {
                        ...experienceImpact,
                        aggregateIndicator: e.target.value,
                      },
                    })
                  }
                  placeholder="Ej: Contribución a NPS, retención de transacciones"
                  className="w-full text-xs sm:text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
