import React, { useState } from 'react';
import { PatternKey } from '../../types';
import { PATTERNS_DATA } from '../../data/patterns';
import { Layers, Check, ChevronDown, ChevronUp, Info, Eye } from 'lucide-react';
import { BeforeAfterView } from '../card/BeforeAfterView';

interface Step5ResponseProps {
  data: {
    selectedPatterns?: PatternKey[];
    description?: string;
    currentInterface?: string;
    proposedInterface?: string;
  };
  onChange: (updates: {
    response: {
      selectedPatterns: PatternKey[];
      description: string;
      currentInterface?: string;
      proposedInterface?: string;
    };
  }) => void;
}

export const Step5Response: React.FC<Step5ResponseProps> = ({ data, onChange }) => {
  const currentSelected = data.selectedPatterns || ['orientar'];
  const currentDescription = data.description || '';
  const currentBefore = data.currentInterface || '';
  const currentAfter = data.proposedInterface || '';

  const [expandedPattern, setExpandedPattern] = useState<PatternKey | null>(null);
  const [showBeforeAfterFields, setShowBeforeAfterFields] = useState<boolean>(
    Boolean(currentBefore || currentAfter)
  );

  const togglePattern = (patternId: PatternKey) => {
    let updated: PatternKey[];
    if (currentSelected.includes(patternId)) {
      if (currentSelected.length === 1) return; // keep at least 1
      updated = currentSelected.filter((p) => p !== patternId);
    } else {
      updated = [...currentSelected, patternId];
    }

    onChange({
      response: {
        selectedPatterns: updated,
        description: currentDescription,
        currentInterface: currentBefore,
        proposedInterface: currentAfter,
      },
    });
  };

  const updateFields = (desc?: string, before?: string, after?: string) => {
    onChange({
      response: {
        selectedPatterns: currentSelected,
        description: desc !== undefined ? desc : currentDescription,
        currentInterface: before !== undefined ? before : currentBefore,
        proposedInterface: after !== undefined ? after : currentAfter,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-2">
          ¿Cómo debería responder la interfaz?
        </h2>
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          Selecciona uno o más patrones de respuesta y describe la transformación tangible en los componentes de la interfaz.
        </p>

        {/* Patterns Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {PATTERNS_DATA.map((pat) => {
            const isSelected = currentSelected.includes(pat.id);
            const isExpanded = expandedPattern === pat.id;

            return (
              <div
                key={pat.id}
                className={`rounded-card border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900/5 ring-1 ring-neutral-900/20'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-bold text-sm text-neutral-900">{pat.name}</span>
                    <button
                      type="button"
                      onClick={() => togglePattern(pat.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-neutral-900 text-white' : 'border border-neutral-300 text-transparent'
                      }`}
                      aria-label={`Seleccionar patrón ${pat.name}`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-600 leading-snug line-clamp-2">
                    {pat.shortDescription}
                  </p>
                </div>

                <div className="px-3.5 py-2 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="font-medium text-neutral-700">Riesgo: {pat.risk}</span>
                  <button
                    type="button"
                    onClick={() => setExpandedPattern(isExpanded ? null : pat.id)}
                    className="text-neutral-700 hover:text-neutral-900 flex items-center gap-0.5"
                  >
                    <span>{isExpanded ? 'Ocultar' : 'Detalles'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {/* Expanded accordion details */}
                {isExpanded && (
                  <div className="p-3.5 bg-neutral-100/50 border-t border-neutral-200 text-xs text-neutral-700 space-y-2">
                    <div>
                      <span className="font-semibold text-neutral-900 block text-[10px] uppercase">Cuándo usar:</span>
                      <p className="text-[11px] leading-tight">{pat.whenToUse[0]}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-900 block text-[10px] uppercase">Cuándo evitar:</span>
                      <p className="text-[11px] leading-tight">{pat.whenToAvoid[0]}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-900 block text-[10px] uppercase">Ejemplo:</span>
                      <p className="text-[11px] italic leading-tight text-neutral-600">{pat.example.after}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Description of change */}
      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          Describe qué cambiaría concretamente en la interfaz
        </label>
        <p className="text-xs text-neutral-500 mb-2">
          Detalla qué componentes, jerarquías, textos o acciones aparecen o se modifican.
        </p>
        <textarea
          rows={3}
          value={currentDescription}
          onChange={(e) => updateFields(e.target.value, undefined, undefined)}
          placeholder="Ej: Tras el segundo intento fallido, mostrar un panel contextual con el motivo en lenguaje simple y un botón directo para cambiar a PSE o transferir entre cuentas."
          className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* Optional Before / After comparison builder */}
      <div className="pt-2 border-t border-neutral-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Comparación visual: Antes vs. Después
            </h3>
            <p className="text-xs text-neutral-500">
              Representa el contraste entre la experiencia estática y la propuesta contextual.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBeforeAfterFields(!showBeforeAfterFields)}
            className="text-xs font-semibold px-3 py-1.5 rounded-btn border border-neutral-300 hover:bg-neutral-50 text-neutral-700 min-h-[44px]"
          >
            {showBeforeAfterFields ? 'Ocultar campos' : '+ Definir Antes / Después'}
          </button>
        </div>

        {showBeforeAfterFields && (
          <div className="space-y-4 bg-neutral-50 p-4 rounded-card border border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Interfaz actual (Antes - Estática)
                </label>
                <textarea
                  rows={3}
                  value={currentBefore}
                  onChange={(e) => updateFields(undefined, e.target.value, undefined)}
                  placeholder="Ej: Banner rojo con error genérico 'Error 402: Transacción declinada'. El formulario se resetea y borra los campos."
                  className="w-full text-xs text-neutral-900 bg-white border border-neutral-300 rounded-input p-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
                  Interfaz contextual propuesta (Después)
                </label>
                <textarea
                  rows={3}
                  value={currentAfter}
                  onChange={(e) => updateFields(undefined, undefined, e.target.value)}
                  placeholder="Ej: Tarjeta inline: 'Tu banco declinó la tarjeta. Puedes pagar con transferencia en 1 clic o reservar tu compra 2 horas.'"
                  className="w-full text-xs text-neutral-900 bg-white border border-neutral-300 rounded-input p-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
                />
              </div>
            </div>

            {/* Live Visual Preview */}
            {(currentBefore || currentAfter) && (
              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                  Vista previa de la tarjeta:
                </span>
                <BeforeAfterView before={currentBefore} after={currentAfter} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
