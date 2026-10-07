import React, { useState } from 'react';
import { useCases } from '../context/CasesContext';
import { WizardLayout } from '../components/wizard/WizardLayout';
import { Step1Moment } from '../components/wizard/Step1Moment';
import { Step2Signal } from '../components/wizard/Step2Signal';
import { Step3Interpretation } from '../components/wizard/Step3Interpretation';
import { Step4Decision } from '../components/wizard/Step4Decision';
import { Step5Response } from '../components/wizard/Step5Response';
import { Step6Validation } from '../components/wizard/Step6Validation';
import { ContextualCase, DecisionGateOutcome } from '../types';

export const WizardView: React.FC = () => {
  const { draftCase, saveDraft, saveCase, navigateTo } = useCases();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const localDraft = draftCase || {};

  const handleUpdate = (updates: Partial<ContextualCase>) => {
    saveDraft(updates);
  };

  const handleFinish = () => {
    const titleGenerated =
      localDraft.title?.trim() ||
      `${localDraft.moment || 'Oportunidad'} en ${localDraft.journey || 'el proceso'}`;

    const completedCase: ContextualCase = {
      id: localDraft.id || `case-${Date.now()}`,
      title: titleGenerated,
      journey: localDraft.journey?.trim() || 'Pago u Operación',
      moment: localDraft.moment?.trim() || 'Paso crítico de interacción',
      job: localDraft.job?.trim() || 'Completar la tarea de manera exitosa y segura.',
      createdAt: localDraft.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Lista para prototipar',

      signal: {
        type: localDraft.signal?.type || 'Error',
        description: localDraft.signal?.description?.trim() || 'Señal observada en la pantalla.',
        source: localDraft.signal?.source || 'Analytics / logs',
        evidenceType: localDraft.signal?.evidenceType || 'OBSERVADA',
      },

      interpretation: {
        context: localDraft.interpretation?.context?.trim() || 'El usuario podría estar experimentando dificultad o incertidumbre.',
        intention: localDraft.interpretation?.intention?.trim() || 'Completar el objetivo sin errores.',
        confidence: localDraft.interpretation?.confidence || 'Media',
      },

      decision: {
        userValue: localDraft.decision?.userValue || 'Alto',
        errorRisk: localDraft.decision?.errorRisk || 'Bajo',
        possibleImpact: localDraft.decision?.possibleImpact || 'Fricción',
        intervention: (localDraft.decision?.intervention as DecisionGateOutcome) || 'SUGERIR',
        rationale: localDraft.decision?.rationale?.trim() || 'Intervención recomendada por Decision Gate.',
      },

      response: {
        patterns: localDraft.response?.patterns?.length
          ? localDraft.response.patterns
          : ['orientar'],
        description: localDraft.response?.description?.trim() || 'Respuesta contextual asistida.',
        fallback: localDraft.response?.fallback?.trim() || 'El usuario puede cerrar la ayuda y continuar con el flujo estándar.',
        before: localDraft.response?.before?.trim(),
        after: localDraft.response?.after?.trim(),
      },

      validation: {
        outcome: localDraft.validation?.outcome || 'Finalización',
        method: localDraft.validation?.method || 'Prueba de usabilidad',
        primaryMetric: localDraft.validation?.primaryMetric?.trim() || 'Tasa de resolución de la tarea',
        secondaryMetric: localDraft.validation?.secondaryMetric?.trim(),
        expectedResult: localDraft.validation?.expectedResult?.trim(),
      },
    };

    saveCase(completedCase);
  };

  return (
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
          source={localDraft.signal?.source || 'Analytics / logs'}
          evidenceType={localDraft.signal?.evidenceType || 'OBSERVADA'}
          onChange={(updates) =>
            handleUpdate({
              signal: {
                type: updates.type ?? localDraft.signal?.type ?? 'Error',
                description: updates.description ?? localDraft.signal?.description ?? '',
                source: updates.source ?? localDraft.signal?.source ?? 'Analytics / logs',
                evidenceType: updates.evidenceType ?? localDraft.signal?.evidenceType ?? 'OBSERVADA',
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
          userValue={localDraft.decision?.userValue || 'Alto'}
          errorRisk={localDraft.decision?.errorRisk || 'Bajo'}
          possibleImpact={localDraft.decision?.possibleImpact || 'Fricción'}
          intervention={localDraft.decision?.intervention || 'SUGERIR'}
          rationale={localDraft.decision?.rationale || ''}
          onChange={(updates) =>
            handleUpdate({
              decision: {
                userValue: updates.userValue ?? localDraft.decision?.userValue ?? 'Alto',
                errorRisk: updates.errorRisk ?? localDraft.decision?.errorRisk ?? 'Bajo',
                possibleImpact: updates.possibleImpact ?? localDraft.decision?.possibleImpact ?? 'Fricción',
                intervention: updates.intervention ?? localDraft.decision?.intervention ?? 'SUGERIR',
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
          description={localDraft.response?.description || ''}
          fallback={localDraft.response?.fallback || 'Continuar con el flujo estándar'}
          before={localDraft.response?.before}
          after={localDraft.response?.after}
          decisionGateOutcome={localDraft.decision?.intervention || 'SUGERIR'}
          onChange={(updates) =>
            handleUpdate({
              response: {
                patterns: updates.patterns ?? localDraft.response?.patterns ?? ['orientar'],
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
          onChange={(updates) =>
            handleUpdate({
              validation: {
                outcome: updates.outcome ?? localDraft.validation?.outcome ?? 'Finalización',
                method: updates.method ?? localDraft.validation?.method ?? 'Prueba de usabilidad',
                primaryMetric: updates.primaryMetric ?? localDraft.validation?.primaryMetric ?? '',
                secondaryMetric: updates.secondaryMetric ?? localDraft.validation?.secondaryMetric,
                expectedResult: updates.expectedResult ?? localDraft.validation?.expectedResult,
              },
            })
          }
        />
      )}
    </WizardLayout>
  );
};
