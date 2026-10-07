import React from 'react';
import { ContextConfidence } from '../../types';
import { AlertCircle, Lightbulb } from 'lucide-react';
import { ConfidenceBadge } from '../ui/Badges';

interface Step2ContextProps {
  data: {
    interpretation?: string;
    confidence?: ContextConfidence;
    helperTag?: string;
  };
  onChange: (updates: {
    context: {
      interpretation: string;
      confidence: ContextConfidence;
      helperTag?: string;
    };
  }) => void;
}

const CONTEXT_ARCHETYPES = [
  { tag: 'Tiene dificultades', label: 'Tiene dificultades', desc: 'Fricción técnica, errores o bloqueo en el formulario' },
  { tag: 'Está repitiendo una tarea', label: 'Está repitiendo una tarea', desc: 'Comportamiento rutinario en ciclos periódicos' },
  { tag: 'No entiende algo', label: 'No entiende algo', desc: 'Duda ante lenguaje técnico o requerimientos' },
  { tag: 'Está comparando opciones', label: 'Está comparando opciones', desc: 'Rebota entre alternativas evaluando precios o atributos' },
  { tag: 'Está retomando un proceso', label: 'Está retomando un proceso', desc: 'Vuelve tras una pausa a culminar un trámite' },
  { tag: 'Está buscando ayuda', label: 'Está buscando ayuda', desc: 'Consulta FAQs, términos o busca canal de soporte' },
  { tag: 'Está cerca de abandonar', label: 'Está cerca de abandonar', desc: 'Inactividad o navegación hacia páginas de salida' },
  { tag: 'Está realizando una tarea frecuente', label: 'Está realizando una tarea frecuente', desc: 'Usuario experto ejecutando un hábito consolidado' },
];

export const Step2Context: React.FC<Step2ContextProps> = ({ data, onChange }) => {
  const currentInterpretation = data.interpretation || '';
  const currentConfidence = data.confidence || 'Media';
  const currentTag = data.helperTag || 'Tiene dificultades';

  const update = (interpretation?: string, confidence?: ContextConfidence, helperTag?: string) => {
    onChange({
      context: {
        interpretation: interpretation !== undefined ? interpretation : currentInterpretation,
        confidence: confidence !== undefined ? confidence : currentConfidence,
        helperTag: helperTag !== undefined ? helperTag : currentTag,
      },
    });
  };

  const handleSelectArchetype = (arch: typeof CONTEXT_ARCHETYPES[0]) => {
    let suggestion = currentInterpretation;
    if (!suggestion || suggestion.trim().length === 0) {
      if (arch.tag === 'Tiene dificultades') {
        suggestion = 'El usuario tiene dificultades completando los datos de la cuenta bancaria.';
      } else if (arch.tag === 'Está retomando un proceso') {
        suggestion = 'El usuario está regresando para culminar un trámite dejado incompleto.';
      } else if (arch.tag === 'Está realizando una tarea frecuente') {
        suggestion = 'El usuario está repitiendo una operación recurrente de fin de mes.';
      } else {
        suggestion = `El usuario ${arch.desc.toLowerCase()}.`;
      }
    }
    update(suggestion, undefined, arch.tag);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            ¿Qué podría estar pasando?
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Contexto ≠ Certeza</span>
          </div>
        </div>

        <p className="text-sm text-neutral-600 mb-4">
          Una señal muestra qué ocurrió. El contexto es tu hipótesis explicativa sobre la situación real del usuario.
        </p>

        {/* Archetypes grid */}
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          Selecciona una situación típica como punto de partida:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {CONTEXT_ARCHETYPES.map((arch) => {
            const isSelected = currentTag === arch.tag;
            return (
              <button
                key={arch.tag}
                type="button"
                onClick={() => handleSelectArchetype(arch)}
                className={`text-left p-3 rounded-card border transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="font-semibold text-xs sm:text-sm leading-tight">{arch.label}</div>
                <div
                  className={`text-[11px] leading-tight mt-1 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {arch.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Single sentence interpretation */}
      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          Describe el contexto en una frase
        </label>
        <p className="text-xs text-neutral-500 mb-2">
          Sintetiza la situación en una afirmación clara y accionable.
        </p>
        <textarea
          rows={3}
          value={currentInterpretation}
          onChange={(e) => update(e.target.value, undefined, undefined)}
          placeholder="Ej: Posible dificultad completando información técnica o cuenta con bloqueo preventivo del banco."
          className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input p-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
        />
      </div>

      {/* Confidence Level */}
      <div className="pt-3 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          Confianza de la interpretación
        </label>
        <p className="text-xs text-neutral-500 mb-3">
          ¿Qué tan seguro estás de que esta interpretación es la correcta?
        </p>

        <div className="grid grid-cols-3 gap-3">
          {(['Baja', 'Media', 'Alta'] as ContextConfidence[]).map((conf) => {
            const isSelected = currentConfidence === conf;
            return (
              <button
                key={conf}
                type="button"
                onClick={() => update(undefined, conf, undefined)}
                className={`p-3 rounded-card border text-center transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="text-sm font-medium">{conf}</div>
                <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {conf === 'Baja' && 'Mucha incertidumbre'}
                  {conf === 'Media' && 'Patrón probable'}
                  {conf === 'Alta' && 'Validado con datos'}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Si tu confianza es <strong>Baja</strong>, en los siguientes pasos se sugerirá acompañar o pedir confirmación en lugar de transformar la pantalla de forma agresiva.
          </span>
        </div>
      </div>
    </div>
  );
};
