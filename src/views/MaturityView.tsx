import React, { useState } from 'react';
import { MATURITY_LEVELS, EVALUATOR_QUESTIONS } from '../data/maturityData';
import { Scale, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { useCases } from '../context/CasesContext';

export const MaturityView: React.FC = () => {
  const { startNewCase } = useCases();
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [evaluatorAnswers, setEvaluatorAnswers] = useState<Record<string, number>>({});

  const activeLevelInfo = MATURITY_LEVELS.find((m) => m.level === selectedLevel) || MATURITY_LEVELS[1];

  // Calculate evaluator result
  const questionCount = EVALUATOR_QUESTIONS.length;
  const answeredCount = Object.keys(evaluatorAnswers).length;

  let calculatedLevel: number | null = null;
  if (answeredCount === questionCount) {
    const totalPoints = Object.values(evaluatorAnswers).reduce((a, b) => a + b, 0);
    // Average points rounded between 0 and 4
    calculatedLevel = Math.min(4, Math.max(0, Math.round(totalPoints / questionCount)));
  }

  const handleSelectOption = (questionId: string, points: number) => {
    setEvaluatorAnswers((prev) => ({ ...prev, [questionId]: points }));
  };

  const resetEvaluator = () => {
    setEvaluatorAnswers({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Estrategia de Producto
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Madurez Contextual
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Cinco niveles progresivos para evaluar y dimensionar la complejidad técnica y el valor de una interfaz adaptativa.
        </p>
      </div>

      {/* Core Principle Callout */}
      <aside aria-label="Principio de Madurez" className="p-5 sm:p-6 rounded-card bg-neutral-900 text-white space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Principio de Madurez</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold">
          Mayor contextualidad no significa automáticamente mejor experiencia
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
          El objetivo no es llegar al Nivel 4 en todas las pantallas. El nivel adecuado depende estrictamente de la disponibilidad de datos limpios, el riesgo de equivocarse, la confianza en la inferencia y el beneficio real para el usuario.
        </p>
      </aside>

      {/* 5 Levels Interactive Visualization */}
      <section aria-labelledby="levels-nav" className="space-y-4">
        <h2 id="levels-nav" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Explora los 5 Niveles de Madurez
        </h2>

        {/* Level Tabs / Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {MATURITY_LEVELS.map((m) => {
            const isSelected = selectedLevel === m.level;
            return (
              <button
                key={m.level}
                type="button"
                onClick={() => setSelectedLevel(m.level)}
                className={`p-3.5 rounded-card border text-left transition-all min-h-[85px] flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono ${isSelected ? 'text-amber-300' : 'text-neutral-500'}`}>
                    Nivel {m.level}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </div>
                <div>
                  <div className="font-bold text-sm">{m.name}</div>
                  <div className={`text-[11px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {m.dataRequired.split('.')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Level Detail Card */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-xs font-bold font-mono text-neutral-400">
                NIVEL {activeLevelInfo.level}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {activeLevelInfo.name}
              </h3>
            </div>
            <div className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full font-medium">
              Datos requeridos: {activeLevelInfo.dataRequired}
            </div>
          </div>

          <p className="text-base text-neutral-700 leading-relaxed font-serif">
            {activeLevelInfo.shortDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Características principales
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-800">
                {activeLevelInfo.characteristics.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Respuesta de interfaz típica
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 bg-neutral-50 p-3 rounded border border-neutral-200">
                  {activeLevelInfo.typicalResponse}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Riesgo asociado
                </span>
                <p className="text-xs text-amber-900 bg-amber-50/70 p-3 rounded border border-amber-200">
                  {activeLevelInfo.risks}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 bg-neutral-50/70 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-card">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Ejemplo real en producto digital
            </span>
            <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
              "{activeLevelInfo.realExample}"
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Assessment Tool: ¿Qué nivel necesita mi caso? */}
      <section aria-labelledby="evaluator-title" className="bg-[#FAFBFD] rounded-card border border-neutral-300/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-neutral-900" />
              <h2 id="evaluator-title" className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
                Evaluador: ¿Qué nivel necesita mi caso?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Responde estas 4 preguntas rápidas para determinar el nivel de madurez óptimo para tu hipótesis.
            </p>
          </div>

          {answeredCount > 0 && (
            <button
              type="button"
              onClick={resetEvaluator}
              className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 underline min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar evaluador</span>
            </button>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {EVALUATOR_QUESTIONS.map((q) => {
            const currentAnswer = evaluatorAnswers[q.id];
            return (
              <div key={q.id} className="space-y-2 bg-white p-4 sm:p-5 rounded-card border border-neutral-200">
                <div className="font-bold text-sm text-neutral-900">{q.question}</div>
                <div className="text-xs text-neutral-500">{q.description}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = currentAnswer === opt.points;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.points)}
                        className={`text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between min-h-[64px] ${
                          isSelected
                            ? 'border-neutral-900 bg-neutral-900 text-white font-medium shadow-sm'
                            : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        <div className="font-semibold leading-tight">{opt.label}</div>
                        <div className={`text-[10px] mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {opt.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Result recommendation */}
        {calculatedLevel !== null && (
          <div className="p-6 rounded-card bg-neutral-900 text-white space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                Recomendación Calculada
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/20">
                Nivel Sugerido: {calculatedLevel}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold">
                Nivel {calculatedLevel}: {MATURITY_LEVELS[calculatedLevel].name}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {MATURITY_LEVELS[calculatedLevel].shortDescription}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-neutral-400">
                Evita sobreingeniería innecesaria. Empieza con esta regla antes de escalar.
              </div>
              <button
                type="button"
                onClick={() =>
                  startNewCase({
                    journey: 'Flujo con madurez evaluada',
                  })
                }
                className="px-4 py-2 rounded-btn bg-white text-neutral-900 font-semibold text-xs hover:bg-neutral-100 transition-colors shadow-sm min-h-[44px]"
              >
                Crear hipótesis en este nivel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
