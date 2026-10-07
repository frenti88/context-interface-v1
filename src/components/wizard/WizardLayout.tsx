import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Shield,
  Eye,
  Check
} from 'lucide-react';
import { ContextualCase } from '../../types';
import { EvidenceBadge, DecisionGateBadge } from '../ui/Badges';

interface WizardLayoutProps {
  currentStep: number; // 1 to 6
  onStepChange: (step: number) => void;
  onSaveDraft: () => void;
  onExit: () => void;
  onFinish: () => void;
  draftData: Partial<ContextualCase>;
  isSaved?: boolean;
  children: React.ReactNode;
}

const STEP_LABELS = [
  { step: 1, title: 'Momento', desc: 'Journey y Job' },
  { step: 2, title: 'Señal', desc: 'Lo que observamos' },
  { step: 3, title: 'Interpretación', desc: 'Contexto e Intención' },
  { step: 4, title: 'Decisión', desc: 'Decision Gate' },
  { step: 5, title: 'Respuesta', desc: 'Patrones y Fallback' },
  { step: 6, title: 'Validación', desc: 'Métricas de éxito' },
];

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  currentStep,
  onStepChange,
  onSaveDraft,
  onExit,
  onFinish,
  draftData,
  isSaved = true,
  children,
}) => {
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [manualSaveToast, setManualSaveToast] = useState(false);

  const handleManualSave = () => {
    onSaveDraft();
    setManualSaveToast(true);
    setTimeout(() => setManualSaveToast(false), 2000);
  };

  const progressPercent = Math.round((currentStep / 6) * 100);

  return (
    <div className="min-h-screen bg-[#FAFAFB] flex flex-col pb-28 md:pb-16 text-[#0F172A]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="text-neutral-500 hover:text-neutral-900 p-2 rounded-lg hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2"
              title="Salir al panel"
              aria-label="Salir del constructor de hipótesis"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block">
                Constructor de Hipótesis
              </span>
              <h1 className="text-sm sm:text-base font-bold text-neutral-900 truncate max-w-[200px] sm:max-w-md">
                {draftData.title || 'Nueva Hipótesis Contextual'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto-saved indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Guardado automático</span>
            </div>

            <button
              type="button"
              onClick={handleManualSave}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-btn border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold min-h-[40px]"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guardar</span>
            </button>

            <button
              type="button"
              onClick={onExit}
              className="text-neutral-400 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Cerrar constructor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile compact stepper bar */}
        <div className="lg:hidden border-t border-neutral-100 px-4 py-2 bg-neutral-50 flex items-center justify-between text-xs">
          <div className="font-semibold text-neutral-900 flex items-center gap-2">
            <span className="bg-neutral-900 text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-[11px] font-bold">
              {currentStep}
            </span>
            <span>{STEP_LABELS[currentStep - 1].title}: {STEP_LABELS[currentStep - 1].desc}</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="text-neutral-700 font-semibold flex items-center gap-1 py-1 px-2 rounded hover:bg-neutral-200/50 min-h-[44px]"
          >
            <span>Ver hipótesis</span>
            {mobileSummaryOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Progress bar line */}
        <div className="h-1 w-full bg-neutral-200">
          <div
            className="h-full bg-neutral-900 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Mobile Collapsible Live Summary Drawer */}
      {mobileSummaryOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 p-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Tu hipótesis acumulada
            </span>
            <button
              type="button"
              onClick={() => setMobileSummaryOpen(false)}
              className="text-xs text-neutral-500 underline min-h-[36px]"
            >
              Cerrar
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">1. MOMENTO</span>
              <span className="font-medium text-neutral-900">{draftData.moment || draftData.journey || 'Por definir...'}</span>
            </div>
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">2. SEÑAL</span>
              <span className="font-medium text-neutral-900">{draftData.signal?.description || 'Por definir...'}</span>
            </div>
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">3. INTERPRETACIÓN</span>
              <span className="font-medium text-neutral-900">{draftData.interpretation?.context || 'Por definir...'}</span>
            </div>
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">4. DECISIÓN</span>
              <span className="font-bold text-neutral-900">{draftData.decision?.intervention || 'Por evaluar...'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Manual Save feedback */}
      {manualSaveToast && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Borrador guardado localmente.</span>
        </div>
      )}

      {/* Main Wizard Form Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Horizontal Stepper for Desktop */}
        <div className="hidden lg:block lg:col-span-3 space-y-2 sticky top-24">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 px-2">
            Pasos de la Hipótesis
          </div>
          <nav aria-label="Progreso de la hipótesis" className="space-y-1">
            {STEP_LABELS.map((s) => {
              const isCurrent = currentStep === s.step;
              const isCompleted = currentStep > s.step;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => onStepChange(s.step)}
                  className={`w-full text-left p-3 rounded-card transition-all flex items-start gap-3 min-h-[52px] ${
                    isCurrent
                      ? 'bg-white border border-neutral-900 shadow-sm'
                      : isCompleted
                      ? 'bg-white/60 border border-neutral-200 hover:bg-white text-neutral-700'
                      : 'border border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isCurrent
                        ? 'bg-neutral-900 text-white'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {isCompleted ? '✓' : s.step}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-neutral-900 leading-tight">{s.title}</div>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">{s.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Column: Form Step Container (max 760px) */}
        <div className="lg:col-span-6 bg-white rounded-card border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          {children}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => onStepChange(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onExit}
                className="text-xs text-neutral-500 hover:text-neutral-900 py-2.5 min-h-[44px]"
              >
                Salir
              </button>
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={() => onStepChange(currentStep + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold transition-colors shadow-sm min-h-[44px]"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinish}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold transition-colors shadow-sm min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generar Ficha de Hipótesis</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Persistent Summary Panel on Desktop */}
        <aside aria-label="Tu hipótesis en construcción" className="hidden lg:block lg:col-span-3 space-y-4 sticky top-24">
          <div className="bg-white rounded-card border border-neutral-200/90 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Tu hipótesis
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">En vivo</span>
            </div>

            {/* Badges preview */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {draftData.signal?.evidenceType && (
                <EvidenceBadge type={draftData.signal.evidenceType} size="sm" />
              )}
              {draftData.decision?.intervention && (
                <DecisionGateBadge outcome={draftData.decision.intervention} size="sm" />
              )}
            </div>

            {/* Structured answered blocks */}
            <div className="space-y-2.5 text-xs divide-y divide-neutral-100">
              <div className="pt-1.5">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  1. Momento & Job
                </span>
                <p className="text-neutral-800 font-medium line-clamp-2">
                  {draftData.moment || draftData.journey || 'Esperando definición...'}
                </p>
                {draftData.job && (
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5 italic">
                    "{draftData.job}"
                  </p>
                )}
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  2. Señal ({draftData.signal?.type || '...'})
                </span>
                <p className="text-neutral-800 font-medium line-clamp-2">
                  {draftData.signal?.description || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  3. Interpretación
                </span>
                <p className="text-neutral-800 line-clamp-2">
                  {draftData.interpretation?.context || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  4. Decisión Gate
                </span>
                <p className="text-neutral-900 font-bold">
                  {draftData.decision?.intervention || 'Esperando evaluación...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  5. Respuesta (Patrones)
                </span>
                <p className="text-neutral-800 line-clamp-2">
                  {draftData.response?.patterns?.join(' + ') || 'Esperando selección...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  6. Métrica de validación
                </span>
                <p className="text-neutral-800 line-clamp-2 font-medium">
                  {draftData.validation?.primaryMetric || draftData.validation?.outcome || 'Esperando definición...'}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => onStepChange(currentStep - 1)}
            className="px-4 py-2.5 rounded-btn border border-neutral-300 text-neutral-700 text-xs font-semibold min-h-[44px]"
          >
            Atrás
          </button>
        ) : (
          <button
            type="button"
            onClick={onExit}
            className="px-3 py-2.5 text-neutral-500 text-xs min-h-[44px]"
          >
            Salir
          </button>
        )}

        <div className="text-xs font-bold text-neutral-500">
          {currentStep} / 6
        </div>

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={() => onStepChange(currentStep + 1)}
            className="px-5 py-2.5 rounded-btn bg-neutral-900 text-white text-xs font-bold min-h-[44px] flex items-center gap-1.5"
          >
            <span>Continuar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinish}
            className="px-5 py-2.5 rounded-btn bg-neutral-900 text-white text-xs font-bold min-h-[44px] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Generar Ficha</span>
          </button>
        )}
      </footer>
    </div>
  );
};
