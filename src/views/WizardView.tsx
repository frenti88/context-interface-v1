import React, { useState } from 'react';
import { useCases, checkCaseCompleteness } from '../context/CasesContext';
import { WizardLayout } from '../components/wizard/WizardLayout';
import { Step1Moment } from '../components/wizard/Step1Moment';
import { Step2Signal } from '../components/wizard/Step2Signal';
import { Step3Interpretation } from '../components/wizard/Step3Interpretation';
import { Step4Decision } from '../components/wizard/Step4Decision';
import { Step5Response } from '../components/wizard/Step5Response';
import { Step6Validation } from '../components/wizard/Step6Validation';
import { ContextualCase, DecisionGateOutcome, CaseStatus } from '../types';
import { Modal } from '../components/ui/Modal';
import { AlertCircle, ArrowRight, Save, CheckCircle2 } from 'lucide-react';

export const WizardView: React.FC = () => {
  const { draftCase, saveDraft, saveCase, navigateTo } = useCases();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [incompletenessModalOpen, setIncompletenessModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<{ field: string; label: string; step: number }[]>([]);

  const localDraft = draftCase || {};

  const handleUpdate = (updates: Partial<ContextualCase>) => {
    saveDraft(updates);
  };

  const handleFinish = () => {
    const missing = checkCaseCompleteness(localDraft);

    if (missing.length > 0) {
      setMissingFields(missing);
      setIncompletenessModalOpen(true);
      return;
    }

    persistCase('Lista para prototipar');
  };

  const persistCase = (status: CaseStatus) => {
    const titleGenerated =
      localDraft.title?.trim() ||
      `${localDraft.moment || 'Oportunidad'} en ${localDraft.journey || 'el proceso'}`;

    const completedCase: ContextualCase = {
      id: localDraft.id || `case-${Date.now()}`,
      title: titleGenerated,
      journey: localDraft.journey?.trim() || 'Journey general',
      moment: localDraft.moment?.trim() || 'Momento de interacción',
      job: localDraft.job?.trim() || 'Objetivo del usuario por detallar.',
      createdAt: localDraft.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: status,

      signal: {
        type: localDraft.signal?.type || 'Error',
        description: localDraft.signal?.description?.trim() || 'Señal observada.',
        source: localDraft.signal?.source || 'Hipótesis',
        evidenceType: localDraft.signal?.evidenceType || 'HIPOTÉTICA',
      },

      interpretation: {
        context: localDraft.interpretation?.context?.trim() || 'Contexto inferido.',
        intention: localDraft.interpretation?.intention?.trim() || 'Intención del usuario.',
        confidence: localDraft.interpretation?.confidence || 'Media',
      },

      decision: {
        userValue: localDraft.decision?.userValue || 'Medio',
        errorRisk: localDraft.decision?.errorRisk || 'Medio',
        possibleImpact: localDraft.decision?.possibleImpact || 'Fricción',
        intervention: (localDraft.decision?.intervention as DecisionGateOutcome) || 'SUGERIR',
        readiness: localDraft.decision?.readiness || 'PROTOTIPAR',
        rationale: localDraft.decision?.rationale?.trim() || 'Decisión evaluada en el Decision Gate.',
      },

      response: {
        patterns: localDraft.response?.patterns?.length
          ? localDraft.response.patterns
          : ['orientar'],
        selectedMechanisms: localDraft.response?.selectedMechanisms || [],
        description: localDraft.response?.description?.trim() || 'Respuesta contextual propuesta.',
        fallback: localDraft.response?.fallback?.trim() || 'Continuar normalmente con el flujo estándar.',
        before: localDraft.response?.before?.trim(),
        after: localDraft.response?.after?.trim(),
      },

      dataRequirements: localDraft.dataRequirements || {
        signalNeeded: localDraft.signal?.description || 'Detección del evento de interacción',
        sourceType: localDraft.signal?.source || 'Analytics / logs',
        availability: localDraft.signal?.evidenceType === 'OBSERVADA' ? 'En producción' : localDraft.signal?.evidenceType === 'INFERIDA' ? 'En desarrollo' : 'Requiere instrumentación',
        contextualMaturity: localDraft.signal?.type === 'Historial' ? 'M3' : localDraft.signal?.type === 'Transacción' ? 'M2' : 'M1',
      },

      validation: {
        outcome: localDraft.validation?.outcome || 'Finalización',
        method: localDraft.validation?.method || 'Prueba de usabilidad',
        primaryMetric: localDraft.validation?.primaryMetric?.trim() || 'Tasa de resolución de la tarea',
        secondaryMetric: localDraft.validation?.secondaryMetric?.trim(),
        expectedResult: localDraft.validation?.expectedResult?.trim(),
      },

      experienceImpact: localDraft.experienceImpact,
    };

    saveCase(completedCase);
    navigateTo('case-detail', completedCase.id);
  };

  return (
    <>
      <WizardLayout
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onSaveDraft={() => saveDraft(localDraft)}
        onExit={() => navigateTo('home')}
        onFinish={handleFinish}
        draftData={localDraft}
      >
        {/* Paso 1: Momento */}
        {currentStep === 1 && (
          <Step1Moment
            journey={localDraft.journey || ''}
            moment={localDraft.moment || ''}
            job={localDraft.job || ''}
            title={localDraft.title || ''}
            onChange={(updates) => handleUpdate(updates)}
          />
        )}

        {/* Paso 2: Señal */}
        {currentStep === 2 && (
          <Step2Signal
            type={localDraft.signal?.type || 'Error'}
            description={localDraft.signal?.description || ''}
            source={localDraft.signal?.source || 'Hipótesis'}
            evidenceType={localDraft.signal?.evidenceType || 'HIPOTÉTICA'}
            onChange={(updates) =>
              handleUpdate({
                signal: {
                  type: updates.type ?? localDraft.signal?.type ?? 'Error',
                  description: updates.description ?? localDraft.signal?.description ?? '',
                  source: updates.source ?? localDraft.signal?.source ?? 'Hipótesis',
                  evidenceType: updates.evidenceType ?? localDraft.signal?.evidenceType ?? 'HIPOTÉTICA',
                },
              })
            }
          />
        )}

        {/* Paso 3: Interpretación (Contexto + Intención) */}
        {currentStep === 3 && (
          <Step3Interpretation
            context={localDraft.interpretation?.context || ''}
            intention={localDraft.interpretation?.intention || ''}
            confidence={localDraft.interpretation?.confidence || 'Media'}
            onChange={(updates) =>
              handleUpdate({
                interpretation: {
                  context: updates.context ?? localDraft.interpretation?.context ?? '',
                  intention: updates.intention ?? localDraft.interpretation?.intention ?? '',
                  confidence: updates.confidence ?? localDraft.interpretation?.confidence ?? 'Media',
                },
              })
            }
          />
        )}

        {/* Paso 4: Decisión (Decision Gate) */}
        {currentStep === 4 && (
          <Step4Decision
            confidence={localDraft.interpretation?.confidence || 'Media'}
            userValue={localDraft.decision?.userValue || 'Medio'}
            errorRisk={localDraft.decision?.errorRisk || 'Medio'}
            possibleImpact={localDraft.decision?.possibleImpact || 'Fricción'}
            intervention={localDraft.decision?.intervention || 'SUGERIR'}
            evidenceType={localDraft.signal?.evidenceType || 'HIPOTÉTICA'}
            readiness={localDraft.decision?.readiness || 'PROTOTIPAR'}
            rationale={localDraft.decision?.rationale || ''}
            onChange={(updates) =>
              handleUpdate({
                decision: {
                  userValue: updates.userValue ?? localDraft.decision?.userValue ?? 'Medio',
                  errorRisk: updates.errorRisk ?? localDraft.decision?.errorRisk ?? 'Medio',
                  possibleImpact: updates.possibleImpact ?? localDraft.decision?.possibleImpact ?? 'Fricción',
                  intervention: updates.intervention ?? localDraft.decision?.intervention ?? 'SUGERIR',
                  readiness: updates.readiness ?? localDraft.decision?.readiness ?? 'PROTOTIPAR',
                  rationale: updates.rationale ?? localDraft.decision?.rationale,
                },
              })
            }
          />
        )}

        {/* Paso 5: Respuesta & Fallback */}
        {currentStep === 5 && (
          <Step5Response
            patterns={localDraft.response?.patterns || ['orientar']}
            selectedMechanisms={localDraft.response?.selectedMechanisms || []}
            description={localDraft.response?.description || ''}
            fallback={localDraft.response?.fallback || 'Continuar normalmente'}
            before={localDraft.response?.before}
            after={localDraft.response?.after}
            decisionGateOutcome={localDraft.decision?.intervention || 'SUGERIR'}
            onChange={(updates) =>
              handleUpdate({
                response: {
                  patterns: updates.patterns ?? localDraft.response?.patterns ?? ['orientar'],
                  selectedMechanisms: updates.selectedMechanisms ?? localDraft.response?.selectedMechanisms ?? [],
                  description: updates.description ?? localDraft.response?.description ?? '',
                  fallback: updates.fallback ?? localDraft.response?.fallback ?? 'Continuar normalmente',
                  before: updates.before ?? localDraft.response?.before,
                  after: updates.after ?? localDraft.response?.after,
                },
              })
            }
          />
        )}

        {/* Paso 6: Validación */}
        {currentStep === 6 && (
          <Step6Validation
            outcome={localDraft.validation?.outcome || 'Finalización'}
            method={localDraft.validation?.method || 'Prueba de usabilidad'}
            primaryMetric={localDraft.validation?.primaryMetric || ''}
            secondaryMetric={localDraft.validation?.secondaryMetric}
            expectedResult={localDraft.validation?.expectedResult}
            experienceImpact={localDraft.experienceImpact}
            onChange={(updates) =>
              handleUpdate({
                validation: {
                  outcome: updates.outcome ?? localDraft.validation?.outcome ?? 'Finalización',
                  method: updates.method ?? localDraft.validation?.method ?? 'Prueba de usabilidad',
                  primaryMetric: updates.primaryMetric ?? localDraft.validation?.primaryMetric ?? '',
                  secondaryMetric: updates.secondaryMetric ?? localDraft.validation?.secondaryMetric,
                  expectedResult: updates.expectedResult ?? localDraft.validation?.expectedResult,
                },
                experienceImpact: updates.experienceImpact ?? localDraft.experienceImpact,
              })
            }
          />
        )}
      </WizardLayout>

      {/* Modal de Advertencia de Campos Pendientes */}
      <Modal
        isOpen={incompletenessModalOpen}
        onClose={() => setIncompletenessModalOpen(false)}
        title="Faltan definiciones clave para la ficha"
        description="Para que una hipótesis se considere 'Lista para prototipar', debe contar con definiciones claras en sus pasos principales."
        maxWidth="md"
      >
        <div className="space-y-4 text-[#0F172A]">
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Hemos detectado <strong>{missingFields.length} campos pendientes</strong>. Puedes completarlos ahora o guardar el avance como <strong>Borrador</strong>.
            </p>
          </div>

          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
            {missingFields.map((item) => (
              <button
                key={item.field}
                type="button"
                onClick={() => {
                  setCurrentStep(item.step);
                  setIncompletenessModalOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between text-xs sm:text-sm min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <span className="font-medium text-neutral-800">{item.label}</span>
                </div>
                <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1">
                  Completar en Paso {item.step} <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() => {
                setIncompletenessModalOpen(false);
                persistCase('Borrador');
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-btn border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 text-xs sm:text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4 text-neutral-500" />
              <span>Guardar como Borrador</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (missingFields.length > 0) {
                  setCurrentStep(missingFields[0].step);
                }
                setIncompletenessModalOpen(false);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <span>Completar ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
