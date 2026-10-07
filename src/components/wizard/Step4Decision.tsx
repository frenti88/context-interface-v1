import React, { useState } from 'react';
import { 
  ConfidenceLevel, 
  UserValueLevel, 
  ErrorRiskLevel, 
  ErrorImpact, 
  DecisionGateOutcome,
  EvidenceType,
  ImplementationReadiness 
} from '../../types';
import { DecisionGate } from '../decision/DecisionGate';
import { ShieldAlert, HelpCircle, ChevronDown, ChevronUp, Sparkles, Scale } from 'lucide-react';

interface Step4DecisionProps {
  confidence: ConfidenceLevel;
  userValue: UserValueLevel;
  errorRisk: ErrorRiskLevel;
  possibleImpact: ErrorImpact;
  intervention: DecisionGateOutcome;
  evidenceType?: EvidenceType;
  readiness?: ImplementationReadiness;
  rationale?: string;
  onChange: (updates: {
    userValue?: UserValueLevel;
    errorRisk?: ErrorRiskLevel;
    possibleImpact?: ErrorImpact;
    intervention?: DecisionGateOutcome;
    readiness?: ImplementationReadiness;
    rationale?: string;
  }) => void;
}

const IMPACTS: ErrorImpact[] = [
  'Confusión',
  'Fricción',
  'Decisión incorrecta',
  'Error operativo',
  'Privacidad',
  'Impacto financiero',
  'Ninguno relevante',
];

export const Step4Decision: React.FC<Step4DecisionProps> = ({
  confidence,
  userValue,
  errorRisk,
  possibleImpact,
  intervention,
  evidenceType = 'HIPOTÉTICA',
  readiness,
  rationale,
  onChange,
}) => {
  const [showScoreModal, setShowScoreModal] = useState(false);

  return (
    <div className="space-y-6 max-w-[760px] mx-auto text-[#0F172A]">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
          Paso 4 de 6 • Decisión
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Vale la pena que la interfaz intervenga?
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 mt-1 leading-relaxed">
          Tener una señal no obliga a intervenir. Sopesa el valor real para la persona frente a las consecuencias de una falsa inferencia.
        </p>
      </div>

      {/* 1. Valor para el usuario */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="block text-sm font-semibold text-neutral-900">
            1. Valor para el usuario
          </label>
          <span className="text-xs sm:text-sm text-neutral-600">
            ¿Cuánto ayudaría intervenir en este momento exacto?
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {(['Bajo', 'Medio', 'Alto'] as UserValueLevel[]).map((val) => {
            const isSelected = userValue === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ userValue: val })}
                className={`p-3.5 rounded-card border text-center transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white font-bold shadow-sm ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div className="text-sm sm:text-base font-semibold">{val}</div>
                <div className={`text-xs mt-1 leading-tight ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {val === 'Bajo' && 'Mejora menor o cosmética'}
                  {val === 'Medio' && 'Ahorra tiempo perceptible'}
                  {val === 'Alto' && 'Evita abandono o bloqueo'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Riesgo si nos equivocamos */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="block text-sm font-semibold text-neutral-900">
            2. Riesgo si nos equivocamos (Costo del falso positivo)
          </label>
          <span className="text-xs sm:text-sm text-neutral-600">
            ¿Qué tan grave es una inferencia errónea?
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {(['Bajo', 'Medio', 'Alto'] as ErrorRiskLevel[]).map((rsk) => {
            const isSelected = errorRisk === rsk;
            return (
              <button
                key={rsk}
                type="button"
                onClick={() => onChange({ errorRisk: rsk })}
                className={`p-3.5 rounded-card border text-center transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? rsk === 'Alto'
                      ? 'border-rose-900 bg-rose-900 text-white font-bold ring-1 ring-rose-900'
                      : rsk === 'Medio'
                      ? 'border-amber-900 bg-amber-900 text-white font-bold ring-1 ring-amber-900'
                      : 'border-neutral-900 bg-neutral-900 text-white font-bold ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div className="text-sm sm:text-base font-semibold">{rsk}</div>
                <div className={`text-xs mt-1 leading-tight ${isSelected ? 'text-neutral-200' : 'text-neutral-500'}`}>
                  {rsk === 'Bajo' && 'Fácilmente descartable'}
                  {rsk === 'Medio' && 'Causa molestia o corrección'}
                  {rsk === 'Alto' && 'Impacto financiero / legal'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Posible impacto ante mala interpretación */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100">
        <label htmlFor="impact-select" className="block text-sm font-semibold text-neutral-900">
          3. Posible impacto si interpretamos mal el contexto
        </label>
        <span className="text-xs sm:text-sm text-neutral-600 block">
          Identifica la naturaleza del error para diseñar salvaguardas:
        </span>

        <select
          id="impact-select"
          value={possibleImpact}
          onChange={(e) => onChange({ possibleImpact: e.target.value as ErrorImpact })}
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[48px]"
        >
          {IMPACTS.map((imp) => (
            <option key={imp} value={imp}>
              {imp}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Decision Gate Component */}
      <div className="pt-2">
        <DecisionGate
          confidence={confidence}
          userValue={userValue}
          errorRisk={errorRisk}
          evidenceType={evidenceType}
          currentDecision={intervention}
          currentReadiness={readiness}
          onSelectDecision={(outcome, newReadiness) => 
            onChange({ intervention: outcome, readiness: newReadiness })
          }
        />
      </div>

      {/* Justificación opcional */}
      <div className="space-y-1.5 pt-2">
        <label htmlFor="rationale-input" className="block text-sm font-semibold text-neutral-900">
          Justificación o notas de la decisión <span className="text-neutral-500 font-normal">(Opcional)</span>
        </label>
        <textarea
          id="rationale-input"
          rows={2}
          value={rationale || ''}
          onChange={(e) => onChange({ rationale: e.target.value })}
          placeholder="Ej: Elegimos 'Sugerir' porque permite al usuario mantener el control y no arriesgar la transacción."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* Context Score Secondary Tool (Collapsible) */}
      <div className="pt-2 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => setShowScoreModal(!showScoreModal)}
          className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 py-2 font-medium min-h-[44px]"
        >
          <Scale className="w-4 h-4 text-neutral-500" />
          <span>Ver desglose de Context Score (Herramienta de diagnóstico)</span>
          {showScoreModal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showScoreModal && (
          <div className="mt-2 p-4 rounded-card bg-neutral-100 border border-neutral-200 text-xs sm:text-sm space-y-2 text-neutral-700 animate-in fade-in">
            <span className="font-bold text-neutral-900 block text-xs uppercase tracking-wider">
              Diagnóstico de Oportunidad
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 block text-[11px]">1. Evidencia</span>
                <span className="font-bold text-neutral-900 text-xs sm:text-sm">{evidenceType}</span>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 block text-[11px]">2. Confianza</span>
                <span className="font-bold text-neutral-900 text-xs sm:text-sm">{confidence}</span>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 block text-[11px]">3. Valor esperado</span>
                <span className="font-bold text-neutral-900 text-xs sm:text-sm">{userValue}</span>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-200">
                <span className="text-neutral-500 block text-[11px]">4. Riesgo de error</span>
                <span className={`font-bold text-xs sm:text-sm ${errorRisk === 'Alto' ? 'text-rose-700' : 'text-neutral-900'}`}>
                  {errorRisk}
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-600 mt-2">
              Recomendación: {userValue === 'Alto' && errorRisk === 'Alto' 
                ? 'Buena oportunidad para prototipar, pero requiere confirmación explícita antes de ejecutar acciones en producción.' 
                : 'Oportunidad balanceada para iterar en pruebas de concepto.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
