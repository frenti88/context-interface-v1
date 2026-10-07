import React from 'react';
import { useCases } from '../context/CasesContext';
import { HypothesisCard } from '../components/card/HypothesisCard';
import { ArrowLeft, Edit3, Copy, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { CaseStatus, ValidationRecord } from '../types';

export const CaseDetailView: React.FC = () => {
  const { 
    cases, 
    selectedCaseId, 
    navigateTo, 
    editCase, 
    duplicateCase, 
    deleteCase, 
    updateCaseStatus 
  } = useCases();

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  if (!currentCase) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-lg font-bold text-neutral-900">Caso no encontrado</h2>
        <button
          type="button"
          onClick={() => navigateTo('my-cases')}
          className="mt-4 px-4 py-2 rounded-btn bg-neutral-900 text-white text-xs font-semibold"
        >
          Volver a Mis Casos
        </button>
      </div>
    );
  }

  // Next / Prev navigation
  const currentIndex = cases.findIndex((c) => c.id === currentCase.id);
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase = currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => navigateTo('my-cases')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Mis Casos</span>
        </button>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-2 text-xs">
          {prevCase && (
            <button
              type="button"
              onClick={() => navigateTo('case-detail', prevCase.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-btn border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 min-h-[40px]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
          )}

          {nextCase && (
            <button
              type="button"
              onClick={() => navigateTo('case-detail', nextCase.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-btn border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 min-h-[40px]"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Master Hypothesis Card */}
      <HypothesisCard
        caseData={currentCase}
        onEdit={() => editCase(currentCase.id)}
        onDuplicate={() => {
          const newId = duplicateCase(currentCase.id);
          if (newId) navigateTo('case-detail', newId);
        }}
        onStatusChange={(newStatus: CaseStatus, validationRecord?: ValidationRecord) => 
          updateCaseStatus(currentCase.id, newStatus, validationRecord)
        }
      />
    </div>
  );
};
