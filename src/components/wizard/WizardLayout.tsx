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
  FileCheck
} from 'lucide-react';
import { ContextualCase, EvidenceLevel } from '../../types';
import { EvidenceBadge, ConfidenceBadge, RiskBadge, MaturityBadge } from '../ui/Badges';

interface WizardLayoutProps {
  currentStep: number; // 1 to 6
  onStepChange: (step: number) => void;
  onSaveDraft: () => void;
  onExit: () => void;
  onFinish: () => void;
  draftData: Partial<ContextualCase>;
  children: React.ReactNode;
}

const STEP_LABELS = [
  { step: 1, title: 'Señal', desc: '¿Qué está ocurriendo?' },
  { step: 2, title: 'Contexto', desc: '¿Qué podría estar pasando?' },
  { step: 3, title: 'Intención', desc: '¿Qué busca conseguir?' },
  { step: 4, title: 'Decisión', desc: '¿Debería intervenir?' },
  { step: 5, title: 'Respuesta', desc: '¿Cómo debe responder?' },
  { step: 6, title: 'Evidencia', desc: '¿Cómo sabremos si ayudó?' },
];

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  currentStep,
  onStepChange,
  onSaveDraft,
  onExit,
  onFinish,
  draftData,
  children,
}) => {
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const handleSave = () => {
    onSaveDraft();
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  const progressPercent = Math.round((currentStep / 6) * 100);

  return (
    <div className="min-h-screen bg-[#FAFAFB] flex flex-col pb-24 md:pb-12">
      {/* Top Utility Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="text-neutral-500 hover:text-neutral-900 p-2 rounded-lg hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2"
              title="Salir al panel"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
                Constructor de Hipótesis
              </span>
              <h1 className="text-sm sm:text-base font-bold text-neutral-900 truncate max-w-[200px] sm:max-w-md">
                {draftData.title || 'Nueva Hipótesis Contextual'}
              </h1>
            </div>
          </div>

          {/* Stepper info on mobile / actions on desktop */}
          <div className="flex items-center gap-3">
            {/* Desktop stepper indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mr-2">
              <span>Etapa {currentStep} de 6</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-900">{STEP_LABELS[currentStep - 1].title}</span>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-colors min-h-[44px]"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guardar borrador</span>
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
            className="text-neutral-700 font-medium flex items-center gap-1 py-1 px-2 rounded hover:bg-neutral-200/50 min-h-[36px]"
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
              Hipótesis en construcción
            </span>
            <button
              type="button"
              onClick={() => setMobileSummaryOpen(false)}
              className="text-xs text-neutral-500 underline"
            >
              Cerrar
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">SEÑAL</span>
              <span className="font-medium text-neutral-900">{draftData.signal?.description || 'Por definir...'}</span>
            </div>
            <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">CONTEXTO</span>
              <span className="font-medium text-neutral-900">{draftData.context?.interpretation || 'Por definir...'}</span>
            </div>
            <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">INTENCIÓN</span>
              <span className="font-medium text-neutral-900 italic font-serif">{draftData.intention?.jobToBeDone || 'Por definir...'}</span>
            </div>
            <div className="p-2 rounded bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 font-bold block text-[10px]">DECISIÓN</span>
              <span className="font-medium text-neutral-900">{draftData.decision?.intervention || 'Por definir...'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Saved Toast notification */}
      {draftSavedToast && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Borrador guardado localmente en tu navegador.</span>
        </div>
      )}

      {/* Main Wizard Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Horizontal Stepper for Desktop */}
        <div className="hidden lg:block lg:col-span-3 space-y-2 sticky top-24">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 px-2">
            Etapas del Framework
          </div>
          <nav className="space-y-1">
            {STEP_LABELS.map((s) => {
              const isCurrent = currentStep === s.step;
              const isCompleted = currentStep > s.step;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => onStepChange(s.step)}
                  className={`w-full text-left p-3 rounded-card transition-all flex items-start gap-3 ${
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
                    <div className="font-bold text-sm text-neutral-900">{s.title}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{s.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Column: Step Form Content */}
        <div className="lg:col-span-6 bg-white rounded-card border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          {children}

          {/* Inline Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => onStepChange(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-medium transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onExit}
                className="text-xs text-neutral-500 hover:text-neutral-900 py-2.5 min-h-[44px]"
              >
                Cancelar
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm min-h-[44px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generar Hypothesis Card</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Persistent Context Summary on Desktop */}
        <aside aria-label="Resumen de hipótesis persistente" className="hidden lg:block lg:col-span-3 space-y-4 sticky top-24">
          <div className="bg-white rounded-card border border-neutral-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Resumen de Hipótesis
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">En vivo</span>
            </div>

            {/* Badges preview */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {draftData.signal?.evidenceLevel && (
                <EvidenceBadge level={draftData.signal.evidenceLevel} size="sm" />
              )}
              {draftData.context?.confidence && (
                <ConfidenceBadge confidence={draftData.context.confidence} />
              )}
              {draftData.decision?.errorCost && (
                <RiskBadge cost={draftData.decision.errorCost} labelPrefix="Costo: " />
              )}
            </div>

            {/* Mini blocks */}
            <div className="space-y-3 text-xs divide-y divide-neutral-100">
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  1. Señal ({draftData.signal?.type || '...'})
                </span>
                <p className="text-neutral-800 font-medium line-clamp-2">
                  {draftData.signal?.description || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  2. Contexto ({draftData.context?.confidence || '...'})
                </span>
                <p className="text-neutral-800 line-clamp-2">
                  {draftData.context?.interpretation || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  3. Intención (JTBD)
                </span>
                <p className="text-neutral-800 font-serif italic line-clamp-3">
                  {draftData.intention?.jobToBeDone || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  4. Decisión
                </span>
                <p className="text-neutral-900 font-bold">
                  {draftData.decision?.intervention || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  5. Respuesta (Patrones)
                </span>
                <p className="text-neutral-800 line-clamp-2">
                  {draftData.response?.selectedPatterns?.join(', ') || 'Esperando definición...'}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                  6. Evidencia & Métrica
                </span>
                <p className="text-neutral-800 line-clamp-2 font-medium">
                  {draftData.evidence?.primaryMetric || draftData.evidence?.outcome || 'Esperando definición...'}
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
            className="px-5 py-2.5 rounded-btn bg-emerald-600 text-white text-xs font-bold min-h-[44px] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Finalizar</span>
          </button>
        )}
      </footer>
    </div>
  );
};
