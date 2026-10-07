import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';

interface BeforeAfterViewProps {
  before?: string;
  after?: string;
  compact?: boolean;
}

export const BeforeAfterView: React.FC<BeforeAfterViewProps> = ({
  before,
  after,
  compact = false,
}) => {
  if (!before && !after) return null;

  return (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        <Layers className="w-3.5 h-3.5 text-neutral-400" />
        <span>Transformación de Interfaz</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
        {/* Antes */}
        <div className="rounded-card border border-neutral-200 bg-neutral-50/80 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                Antes (Estática)
              </span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {before || 'Interfaz estándar sin respuesta al contexto del usuario.'}
            </p>
          </div>
          <div className="mt-3 text-xs text-neutral-400 border-t border-neutral-200/60 pt-2">
            Mismo estado para el 100% de visitantes
          </div>
        </div>

        {/* Después */}
        <div className="rounded-card border border-neutral-900/10 bg-neutral-900/[0.02] p-4 flex flex-col justify-between ring-1 ring-neutral-900/5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-white">
                Después (Contextual)
              </span>
            </div>
            <p className="text-sm text-neutral-900 font-medium leading-relaxed">
              {after || 'Interfaz adaptada respondiendo a la señal e intención identificadas.'}
            </p>
          </div>
          <div className="mt-3 text-xs text-neutral-600 border-t border-neutral-200/60 pt-2 flex items-center gap-1 font-medium">
            <span>Intervención guiada por el Playbook</span>
            <ArrowRight className="w-3 h-3 text-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  );
};
