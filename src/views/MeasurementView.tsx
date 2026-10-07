import React, { useState } from 'react';
import { BarChart2, Target, FlaskConical, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { useCases } from '../context/CasesContext';

const METRICS_CATALOG = [
  {
    category: 'Eficacia y Finalización',
    metrics: [
      { name: 'Tasa de conversión de tarea (Task Completion Rate)', desc: 'Porcentaje de usuarios que logran el objetivo sin abandonar.' },
      { name: 'Tasa de recuperación tras error (Error Recovery Rate)', desc: 'Porcentaje de usuarios que corrigen un fallo y culminan la transacción.' },
      { name: 'Tasa de abandono en pantalla (Screen Drop-off)', desc: 'Fuga específica atribuible a la fricción de un formulario.' },
    ],
  },
  {
    category: 'Eficiencia y Esfuerzo',
    metrics: [
      { name: 'Tiempo hasta primera acción (Time to First Action)', desc: 'Rapidez con la que el usuario identifica qué hacer en la pantalla.' },
      { name: 'Duración total del ciclo (Task Completion Time)', desc: 'Ahorro de segundos en tareas recurrentes de alta frecuencia.' },
      { name: 'Número de clics o toques evitados (Step Reduction)', desc: 'Campos y pasos omitidos gracias a precarga contextual.' },
    ],
  },
  {
    category: 'Percepción y Soporte',
    metrics: [
      { name: 'Customer Effort Score (CES)', desc: 'Evaluación del esfuerzo percibido ("¿Qué tan fácil fue completar el trámite?").' },
      { name: 'Volumen de llamadas a soporte (Support Deflection)', desc: 'Reducción de tickets generados por dudas en pantallas ambiguas.' },
      { name: 'Tasa de cancelación consciente (Undo Rate)', desc: 'Frecuencia con la que el usuario revierte una sugerencia contextual.' },
    ],
  },
];

export const MeasurementView: React.FC = () => {
  const { startNewCase } = useCases();

  const [formulaPattern, setFormulaPattern] = useState('Orientar y recuperar');
  const [formulaSignal, setFormulaSignal] = useState('fallan 2 veces al pagar');
  const [formulaMetric, setFormulaMetric] = useState('aumentar la finalización en +15%');
  const [formulaMethod, setFormulaMethod] = useState('un A/B test con 2.000 usuarios');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Validación & Métricas
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Medición de Interfaces Contextuales
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Evita que la personalización sea un acto de fe. Diseña hipótesis falsables y mide si el cambio de interfaz realmente ahorró esfuerzo al usuario.
        </p>
      </div>

      {/* Interactive Formula Playground */}
      <section aria-labelledby="formula-title" className="p-6 sm:p-8 rounded-card bg-neutral-900 text-white space-y-6 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Fórmula de Hipótesis Medible</span>
          </div>
          <h2 id="formula-title" className="text-xl sm:text-2xl font-bold">
            Generador de Declaración Falsable
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Ajusta las variables para construir un enunciado listo para presentar a tu equipo de desarrollo o negocio:
          </p>
        </div>

        {/* Variables Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-neutral-400 font-semibold mb-1">1. Intervención / Patrón</label>
            <input
              type="text"
              value={formulaPattern}
              onChange={(e) => setFormulaPattern(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-input p-2.5 text-white focus:outline-none focus:border-amber-300"
            />
          </div>

          <div>
            <label className="block text-neutral-400 font-semibold mb-1">2. Señal del Usuario</label>
            <input
              type="text"
              value={formulaSignal}
              onChange={(e) => setFormulaSignal(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-input p-2.5 text-white focus:outline-none focus:border-amber-300"
            />
          </div>

          <div>
            <label className="block text-neutral-400 font-semibold mb-1">3. Métrica Esperada</label>
            <input
              type="text"
              value={formulaMetric}
              onChange={(e) => setFormulaMetric(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-input p-2.5 text-white focus:outline-none focus:border-amber-300"
            />
          </div>

          <div>
            <label className="block text-neutral-400 font-semibold mb-1">4. Método de Prueba</label>
            <input
              type="text"
              value={formulaMethod}
              onChange={(e) => setFormulaMethod(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-input p-2.5 text-white focus:outline-none focus:border-amber-300"
            />
          </div>
        </div>

        {/* Output Sentence */}
        <div className="p-4 rounded-lg bg-neutral-800 border border-neutral-700 text-sm sm:text-base font-serif italic text-amber-200 leading-relaxed">
          "Creemos que al <strong>{formulaPattern || '...'}</strong> para los usuarios que <strong>{formulaSignal || '...'}</strong>, lograremos <strong>{formulaMetric || '...'}</strong>. Lo validaremos mediante <strong>{formulaMethod || '...'}</strong>."
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() =>
              startNewCase({
                response: { selectedPatterns: ['orientar'], description: formulaPattern },
                evidence: {
                  outcome: 'Finalización',
                  validationMethod: 'A/B test',
                  primaryMetric: formulaMetric,
                  expectedResult: `Creemos que al ${formulaPattern} lograremos ${formulaMetric}.`,
                },
              })
            }
            className="px-4 py-2 rounded-btn bg-white text-neutral-900 font-semibold text-xs hover:bg-neutral-100 transition-colors shadow-sm min-h-[44px]"
          >
            Usar esta fórmula en una hipótesis
          </button>
        </div>
      </section>

      {/* Metrics Catalog */}
      <section aria-labelledby="metrics-catalog-title" className="space-y-4">
        <div>
          <h2 id="metrics-catalog-title" className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
            Catálogo de Métricas de Experiencia
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Métricas organizadas por impacto en el usuario y en el sistema:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {METRICS_CATALOG.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-card border border-neutral-200 p-5 space-y-4 shadow-sm">
              <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
                {cat.category}
              </h3>
              <div className="space-y-3">
                {cat.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="text-xs space-y-1">
                    <span className="font-semibold text-neutral-900 block">{m.name}</span>
                    <p className="text-neutral-500 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* A/B Testing & Validation Best Practices */}
      <section aria-labelledby="experimentation-title" className="bg-white rounded-card border border-neutral-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 id="experimentation-title" className="text-lg font-bold text-neutral-900">
          Reglas para el diseño de experimentos contextuales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-700">
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-2">
            <span className="font-bold text-neutral-900 block">1. Comparar siempre contra la interfaz estática</span>
            <p className="text-xs leading-relaxed text-neutral-600">
              El grupo de control (A) debe ver la pantalla generalista habitual. El grupo variante (B) debe recibir la respuesta contextual únicamente cuando la señal se cumpla.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-2">
            <span className="font-bold text-neutral-900 block">2. Cuidado con el "efecto novedad"</span>
            <p className="text-xs leading-relaxed text-neutral-600">
              Los usuarios frecuentes pueden sorprenderse al inicio si la interfaz cambia de golpe. Monitorea métricas tras al menos 2 ciclos completos de uso para ver el impacto sostenido.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
