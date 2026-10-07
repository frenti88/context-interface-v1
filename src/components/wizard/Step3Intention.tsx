import React, { useState, useEffect } from 'react';
import { Target, Sparkles } from 'lucide-react';

interface Step3IntentionProps {
  data: {
    when?: string;
    want?: string;
    inOrderTo?: string;
    jobToBeDone?: string;
  };
  onChange: (updates: {
    intention: {
      when: string;
      want: string;
      inOrderTo: string;
      jobToBeDone: string;
    };
  }) => void;
}

const JTBD_PRESETS = [
  {
    label: 'Error en pago',
    when: 'tengo un error ingresando mi medio de pago',
    want: 'entender la causa exacta y tener una alternativa inmediata',
    inOrderTo: 'terminar la compra sin perder mi tiempo ni mi reserva',
  },
  {
    label: 'Retomar trámite',
    when: 'vuelvo a la plataforma después de pausar un proceso',
    want: 'retomar exactamente donde me quedé con mis datos preservados',
    inOrderTo: 'culminar la solicitud sin repetir pasos anteriores',
  },
  {
    label: 'Operación frecuente',
    when: 'llega el fin de mes y tengo que pagar servicios o nómina',
    want: 'tener los destinatarios y montos habituales a un solo toque',
    inOrderTo: 'despachar mis pagos en 30 segundos sin cometer errores',
  },
  {
    label: 'Búsqueda sin resultado',
    when: 'busco una referencia o producto y no aparece',
    want: 'sugerencias de productos alternativos compatibles',
    inOrderTo: 'encontrar lo que necesito sin tener que iniciar una búsqueda desde cero',
  },
];

export const Step3Intention: React.FC<Step3IntentionProps> = ({ data, onChange }) => {
  const [when, setWhen] = useState(data.when || '');
  const [want, setWant] = useState(data.want || '');
  const [inOrderTo, setInOrderTo] = useState(data.inOrderTo || '');

  // Keep assembled JTBD updated
  const updateJTBD = (newWhen: string, newWant: string, newInOrderTo: string) => {
    setWhen(newWhen);
    setWant(newWant);
    setInOrderTo(newInOrderTo);

    const assembled =
      newWhen || newWant || newInOrderTo
        ? `Cuando ${newWhen.trim() || '...'}, quiero ${newWant.trim() || '...'} para poder ${newInOrderTo.trim() || '...'}.`
        : '';

    onChange({
      intention: {
        when: newWhen,
        want: newWant,
        inOrderTo: newInOrderTo,
        jobToBeDone: assembled,
      },
    });
  };

  const applyPreset = (preset: typeof JTBD_PRESETS[0]) => {
    updateJTBD(preset.when, preset.want, preset.inOrderTo);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-2">
          ¿Qué está intentando conseguir el usuario?
        </h2>
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          Define el objetivo fundamental del usuario. Evita describir soluciones tecnológicas aquí; enfócate en el resultado humano deseado.
        </p>

        {/* Presets suggestions */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Sugerencias rápidas editables:
          </span>
          <div className="flex flex-wrap gap-2">
            {JTBD_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guided Job To Be Done Builder */}
      <div className="bg-[#FAFBFD] p-5 sm:p-6 rounded-card border border-neutral-200 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
          <Target className="w-4 h-4 text-neutral-900" />
          <span>Fórmula Job To Be Done (JTBD)</span>
        </div>

        {/* 1. Cuando... */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
            1. Cuando... <span className="font-normal text-neutral-400">(Situación o disparador)</span>
          </label>
          <input
            type="text"
            value={when}
            onChange={(e) => updateJTBD(e.target.value, want, inOrderTo)}
            placeholder="ej. tengo un error ingresando una cuenta bancaria"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        {/* 2. Quiero... */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
            2. Quiero... <span className="font-normal text-neutral-400">(Necesidad inmediata)</span>
          </label>
          <input
            type="text"
            value={want}
            onChange={(e) => updateJTBD(when, e.target.value, inOrderTo)}
            placeholder="ej. entender cómo solucionarlo y tener una opción de pago alternativa"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        {/* 3. Para poder... */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
            3. Para poder... <span className="font-normal text-neutral-400">(Beneficio u objetivo final)</span>
          </label>
          <input
            type="text"
            value={inOrderTo}
            onChange={(e) => updateJTBD(when, want, e.target.value)}
            placeholder="ej. terminar el pago antes de que venza mi tarifa"
            className="w-full text-sm text-neutral-900 bg-white border border-neutral-300 rounded-input px-3.5 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Assembled sentence preview */}
      <div className="p-4 rounded-lg bg-neutral-900 text-white space-y-1">
        <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
          Enunciado de Intención Generado:
        </span>
        <p className="text-sm sm:text-base font-serif italic text-neutral-100 leading-relaxed">
          "{when || want || inOrderTo
            ? `Cuando ${when.trim() || '...'}, quiero ${want.trim() || '...'} para poder ${inOrderTo.trim() || '...'}.`
            : 'Completa los campos arriba para armar el Job To Be Done del usuario.'}"
        </p>
      </div>
    </div>
  );
};
