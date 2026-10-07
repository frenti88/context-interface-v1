import React from 'react';
import { ConfidenceLevel } from '../../types';
import { AlertCircle, Target, Lightbulb } from 'lucide-react';
import { ConfidenceBadge } from '../ui/Badges';

interface Step3InterpretationProps {
  context: string;
  intention: string;
  confidence: ConfidenceLevel;
  onChange: (updates: { context?: string; intention?: string; confidence?: ConfidenceLevel }) => void;
}

const CONFIDENCE_LEVELS: {
  level: ConfidenceLevel;
  label: string;
  description: string;
}[] = [
  {
    level: 'Baja',
    label: 'Baja',
    description: 'Tenemos pocos indicios y existen muchas otras explicaciones posibles.',
  },
  {
    level: 'Media',
    label: 'Media',
    description: 'Tenemos señales relacionadas, pero todavía existen explicaciones alternativas.',
  },
  {
    level: 'Alta',
    label: 'Alta',
    description: 'Existen varias señales o evidencia directa que apoyan la interpretación.',
  },
];

export const Step3Interpretation: React.FC<Step3InterpretationProps> = ({
  context,
  intention,
  confidence,
  onChange,
}) => {
  return (
    <div className="space-y-6 max-w-[760px] mx-auto">
      {/* Step Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Paso 3 de 6 • Interpretación (Contexto + Intención)
          </span>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Contexto ≠ Certeza</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          ¿Qué podría estar pasando y qué busca conseguir?
        </h2>
        <p className="text-base text-neutral-600 mt-1 leading-relaxed">
          Toda inferencia de contexto tiene margen de error. Formula una explicación razonable sin presentarla como verdad absoluta.
        </p>
      </div>

      {/* 1. Contexto: ¿Qué podría estar pasando? */}
      <div className="space-y-1.5">
        <label htmlFor="context-input" className="block text-sm font-semibold text-neutral-900">
          1. Contexto: ¿Qué podría estar pasando?
        </label>
        <span className="text-xs text-neutral-500 block">
          Describe la situación que inferimos detrás de la señal.
        </span>

        <textarea
          id="context-input"
          rows={3}
          value={context}
          onChange={(e) => onChange({ context: e.target.value })}
          placeholder="Ej: El usuario podría no estar seguro de los datos de la cuenta o el banco emisor tiene una restricción activa."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />

        {!context && (
          <button
            type="button"
            onClick={() =>
              onChange({
                context: 'El usuario podría no estar seguro de los datos de la cuenta.',
              })
            }
            className="text-xs text-neutral-500 hover:text-neutral-900 underline mt-1 inline-block"
          >
            Usar ejemplo: "El usuario podría no estar seguro de los datos de la cuenta."
          </button>
        )}
      </div>

      {/* 2. Intención: ¿Qué creemos que está intentando conseguir? */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-100">
        <label htmlFor="intention-input" className="block text-sm font-semibold text-neutral-900">
          2. Intención: ¿Qué creemos que está intentando conseguir?
        </label>
        <span className="text-xs text-neutral-500 block">
          El objetivo específico inmediato que la persona quiere lograr en este momento.
        </span>

        <textarea
          id="intention-input"
          rows={2}
          value={intention}
          onChange={(e) => onChange({ intention: e.target.value })}
          placeholder="Ej: Completar el pago correctamente sin cometer un error."
          className="w-full text-base text-neutral-900 bg-white border border-neutral-300 rounded-input p-3.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />

        {!intention && (
          <button
            type="button"
            onClick={() =>
              onChange({
                intention: 'Completar el pago correctamente sin cometer un error.',
              })
            }
            className="text-xs text-neutral-500 hover:text-neutral-900 underline mt-1 inline-block"
          >
            Usar ejemplo: "Completar el pago correctamente sin cometer un error."
          </button>
        )}
      </div>

      {/* 3. Confianza de la interpretación */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900">
          3. ¿Qué tan seguros estamos de esta interpretación?
        </label>
        <span className="text-xs text-neutral-500 block">
          Control de calibración para la toma de decisión posterior:
        </span>

        {/* Large segmented control */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CONFIDENCE_LEVELS.map((c) => {
            const isSelected = confidence === c.level;
            return (
              <button
                key={c.level}
                type="button"
                onClick={() => onChange({ confidence: c.level })}
                className={`p-4 rounded-card border text-left transition-all min-h-[90px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div>
                  <div className="font-bold text-sm sm:text-base">{c.label}</div>
                  <div className={`text-xs mt-1 leading-snug ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {c.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
