import React, { useState } from 'react';
import { useCases } from '../context/CasesContext';
import { WizardLayout } from '../components/wizard/WizardLayout';
import { Step1Signal } from '../components/wizard/Step1Signal';
import { Step2Context } from '../components/wizard/Step2Context';
import { Step3Intention } from '../components/wizard/Step3Intention';
import { Step4Decision } from '../components/wizard/Step4Decision';
import { Step5Response } from '../components/wizard/Step5Response';
import { Step6Evidence } from '../components/wizard/Step6Evidence';
import { ContextualCase, MaturityLevelNumber } from '../types';

export const WizardView: React.FC = () => {
  const { draftCase, saveDraft, saveCase, navigateTo } = useCases();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const localDraft = draftCase || {};

  const handleUpdate = (updates: Partial<ContextualCase>) => {
    saveDraft(updates);
  };

  const handleFinish = () => {
    // Fill fallback defaults so hypothesis is always valid and complete
    const completedCase: ContextualCase = {
      id: localDraft.id || `case-${Date.now()}`,
      title: localDraft.title?.trim() || 'Hipótesis Contextual sin título',
      journey: localDraft.journey?.trim() || 'Journey General',
      isCustom: true,
      createdAt: localDraft.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'En validación',
      signal: {
        type: localDraft.signal?.type || 'Error',
        description: localDraft.signal?.description?.trim() || 'Señal observada en la interfaz.',
        source: localDraft.signal?.source || 'Observación',
        evidenceLevel: localDraft.signal?.evidenceLevel || 'nivel-3',
      },
      context: {
        interpretation: localDraft.context?.interpretation?.trim() || 'Posible dificultad o necesidad del usuario.',
        confidence: localDraft.context?.confidence || 'Media',
        helperTag: localDraft.context?.helperTag || 'Tiene dificultades',
      },
      intention: {
        when: localDraft.intention?.when?.trim() || '',
        want: localDraft.intention?.want?.trim() || '',
        inOrderTo: localDraft.intention?.inOrderTo?.trim() || '',
        jobToBeDone:
          localDraft.intention?.jobToBeDone?.trim() ||
          `Cuando ${localDraft.intention?.when || 'estoy en el proceso'}, quiero ${localDraft.intention?.want || 'resolver la tarea'} para poder ${localDraft.intention?.inOrderTo || 'completar mi objetivo'}.`,
      },
      decision: {
        intervention: localDraft.decision?.intervention || 'Acompañar',
        possibleMisinterpretation: localDraft.decision?.possibleMisinterpretation || 'Confusión',
        errorCost: localDraft.decision?.errorCost || 'Bajo',
        rationale: localDraft.decision?.rationale || 'Intervención no intrusiva con bajo costo de error.',
      },
      response: {
        selectedPatterns: localDraft.response?.selectedPatterns?.length
          ? localDraft.response.selectedPatterns
          : ['orientar'],
        description: localDraft.response?.description?.trim() || 'Orientación contextual en pantalla.',
        currentInterface: localDraft.response?.currentInterface,
        proposedInterface: localDraft.response?.proposedInterface,
      },
      evidence: {
        outcome: localDraft.evidence?.outcome || 'Finalización',
        validationMethod: localDraft.evidence?.validationMethod || 'Prueba de usabilidad',
        primaryMetric: localDraft.evidence?.primaryMetric?.trim() || 'Tasa de finalización de tarea',
        secondaryMetric: localDraft.evidence?.secondaryMetric,
        expectedResult:
          localDraft.evidence?.expectedResult?.trim() ||
          'La intervención contextual mejorará la experiencia y reducirá el abandono.',
      },
      maturityLevel: (localDraft.maturityLevel as MaturityLevelNumber) ?? 1,
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
      {currentStep === 1 && (
        <Step1Signal
          data={{
            type: localDraft.signal?.type,
            description: localDraft.signal?.description,
            source: localDraft.signal?.source,
            evidenceLevel: localDraft.signal?.evidenceLevel,
            title: localDraft.title,
            journey: localDraft.journey,
          }}
          onChange={(updates) => handleUpdate(updates)}
        />
      )}

      {currentStep === 2 && (
        <Step2Context
          data={{
            interpretation: localDraft.context?.interpretation,
            confidence: localDraft.context?.confidence,
            helperTag: localDraft.context?.helperTag,
          }}
          onChange={(updates) => handleUpdate(updates)}
        />
      )}

      {currentStep === 3 && (
        <Step3Intention
          data={{
            when: localDraft.intention?.when,
            want: localDraft.intention?.want,
            inOrderTo: localDraft.intention?.inOrderTo,
            jobToBeDone: localDraft.intention?.jobToBeDone,
          }}
          onChange={(updates) => handleUpdate(updates)}
        />
      )}

      {currentStep === 4 && (
        <Step4Decision
          data={{
            intervention: localDraft.decision?.intervention,
            possibleMisinterpretation: localDraft.decision?.possibleMisinterpretation,
            errorCost: localDraft.decision?.errorCost,
            rationale: localDraft.decision?.rationale,
          }}
          contextConfidence={localDraft.context?.confidence}
          onChange={(updates) => handleUpdate(updates)}
        />
      )}

      {currentStep === 5 && (
        <Step5Response
          data={{
            selectedPatterns: localDraft.response?.selectedPatterns,
            description: localDraft.response?.description,
            currentInterface: localDraft.response?.currentInterface,
            proposedInterface: localDraft.response?.proposedInterface,
          }}
          onChange={(updates) => handleUpdate(updates)}
        />
      )}

      {currentStep === 6 && (
        <Step6Evidence
          data={{
            outcome: localDraft.evidence?.outcome,
            validationMethod: localDraft.evidence?.validationMethod,
            primaryMetric: localDraft.evidence?.primaryMetric,
            secondaryMetric: localDraft.evidence?.secondaryMetric,
            expectedResult: localDraft.evidence?.expectedResult,
            maturityLevel: localDraft.maturityLevel,
          }}
          onChange={(updates) => handleUpdate(updates)}
        />
      )}
    </WizardLayout>
  );
};
