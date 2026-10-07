import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContextualCase, ActiveView, CaseStatus, PatternKey } from '../types';
import { DEMO_CASES } from '../data/demoCases';

interface CasesContextType {
  cases: ContextualCase[];
  activeView: ActiveView;
  selectedCaseId: string | null;
  selectedPatternId: PatternKey | null;
  draftCase: Partial<ContextualCase> | null;
  activePlaybookChapter: string;
  isSearchOpen: boolean;

  // Actions
  setActiveView: (view: ActiveView) => void;
  navigateTo: (view: ActiveView, caseId?: string, patternId?: PatternKey) => void;
  startNewCase: (initialData?: Partial<ContextualCase>) => void;
  createRelatedCase: (parentCaseId: string) => void;
  editCase: (id: string) => void;
  duplicateCase: (id: string) => string;
  deleteCase: (id: string) => void;
  updateCaseStatus: (id: string, status: CaseStatus) => void;
  saveCase: (caseData: ContextualCase) => void;
  saveDraft: (partial: Partial<ContextualCase>) => void;
  clearDraft: () => void;
  setSelectedPatternId: (id: PatternKey | null) => void;
  setActivePlaybookChapter: (chapterId: string) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  resetToDemoCases: () => void;
}

const CasesContext = createContext<CasesContextType | undefined>(undefined);

const STORAGE_KEY_CASES = 'cp_cases_v2';
const STORAGE_KEY_DRAFT = 'cp_draft_v2';

export const CasesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<ContextualCase[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CASES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].moment) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading cases', e);
    }
    return DEMO_CASES;
  });

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedPatternId, setSelectedPatternId] = useState<PatternKey | null>(null);
  const [activePlaybookChapter, setActivePlaybookChapter] = useState<string>('que-es-interfaz-contextual');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [draftCase, setDraftCase] = useState<Partial<ContextualCase> | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading draft', e);
    }
    return null;
  });

  // Persist cases
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CASES, JSON.stringify(cases));
    } catch (e) {
      console.error('Error saving cases', e);
    }
  }, [cases]);

  // Persist draft
  useEffect(() => {
    try {
      if (draftCase) {
        localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draftCase));
      } else {
        localStorage.removeItem(STORAGE_KEY_DRAFT);
      }
    } catch (e) {
      console.error('Error saving draft', e);
    }
  }, [draftCase]);

  // Keyboard shortcut for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (view: ActiveView, caseId?: string, patternId?: PatternKey) => {
    setActiveView(view);
    if (caseId !== undefined) setSelectedCaseId(caseId);
    if (patternId !== undefined) setSelectedPatternId(patternId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startNewCase = (initialData?: Partial<ContextualCase>) => {
    const blankCase: Partial<ContextualCase> = {
      title: initialData?.title || '',
      journey: initialData?.journey || '',
      moment: initialData?.moment || '',
      job: initialData?.job || '',
      status: 'Borrador',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      signal: {
        type: initialData?.signal?.type || 'Error',
        description: initialData?.signal?.description || '',
        source: initialData?.signal?.source || 'Analytics / logs',
        evidenceType: initialData?.signal?.evidenceType || 'OBSERVADA',
      },

      interpretation: {
        context: initialData?.interpretation?.context || '',
        intention: initialData?.interpretation?.intention || '',
        confidence: initialData?.interpretation?.confidence || 'Media',
      },

      decision: {
        userValue: initialData?.decision?.userValue || 'Alto',
        errorRisk: initialData?.decision?.errorRisk || 'Bajo',
        possibleImpact: initialData?.decision?.possibleImpact || 'Fricción',
        intervention: initialData?.decision?.intervention || 'SUGERIR',
        rationale: initialData?.decision?.rationale || '',
      },

      response: {
        patterns: initialData?.response?.patterns || ['orientar'],
        description: initialData?.response?.description || '',
        fallback: initialData?.response?.fallback || 'Continuar normalmente con el flujo estándar',
        before: initialData?.response?.before || '',
        after: initialData?.response?.after || '',
      },

      validation: {
        outcome: initialData?.validation?.outcome || 'Finalización',
        method: initialData?.validation?.method || 'Prueba de usabilidad',
        primaryMetric: initialData?.validation?.primaryMetric || '',
        secondaryMetric: initialData?.validation?.secondaryMetric || '',
        expectedResult: initialData?.validation?.expectedResult || '',
      },
    };

    setDraftCase(blankCase);
    setSelectedCaseId(null);
    setActiveView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createRelatedCase = (parentCaseId: string) => {
    const parent = cases.find((c) => c.id === parentCaseId);
    if (!parent) return;

    startNewCase({
      journey: parent.journey,
      title: `Oportunidad en ${parent.journey}`,
    });
  };

  const editCase = (id: string) => {
    const existing = cases.find((c) => c.id === id);
    if (existing) {
      setDraftCase({ ...existing });
      setSelectedCaseId(id);
      setActiveView('wizard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const duplicateCase = (id: string): string => {
    const original = cases.find((c) => c.id === id);
    if (!original) return '';
    const newId = `case-${Date.now()}`;
    const duplicated: ContextualCase = {
      ...original,
      id: newId,
      title: `${original.title} (Copia)`,
      status: 'Borrador',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCases((prev) => [duplicated, ...prev]);
    return newId;
  };

  const deleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    if (selectedCaseId === id) {
      setSelectedCaseId(null);
      setActiveView('my-cases');
    }
  };

  const updateCaseStatus = (id: string, status: CaseStatus) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      )
    );
  };

  const saveCase = (caseData: ContextualCase) => {
    const id = caseData.id || `case-${Date.now()}`;
    const preparedCase: ContextualCase = {
      ...caseData,
      id,
      updatedAt: new Date().toISOString(),
    };

    setCases((prev) => {
      const exists = prev.some((c) => c.id === id);
      if (exists) {
        return prev.map((c) => (c.id === id ? preparedCase : c));
      }
      return [preparedCase, ...prev];
    });

    clearDraft();
    setSelectedCaseId(id);
    setActiveView('case-detail');
  };

  const saveDraft = (partial: Partial<ContextualCase>) => {
    setDraftCase((prev) => ({
      ...prev,
      ...partial,
      updatedAt: new Date().toISOString(),
    }));
  };

  const clearDraft = () => {
    setDraftCase(null);
    localStorage.removeItem(STORAGE_KEY_DRAFT);
  };

  const resetToDemoCases = () => {
    setCases(DEMO_CASES);
    localStorage.setItem(STORAGE_KEY_CASES, JSON.stringify(DEMO_CASES));
  };

  return (
    <CasesContext.Provider
      value={{
        cases,
        activeView,
        selectedCaseId,
        selectedPatternId,
        draftCase,
        activePlaybookChapter,
        isSearchOpen,
        setActiveView,
        navigateTo,
        startNewCase,
        createRelatedCase,
        editCase,
        duplicateCase,
        deleteCase,
        updateCaseStatus,
        saveCase,
        saveDraft,
        clearDraft,
        setSelectedPatternId,
        setActivePlaybookChapter,
        setIsSearchOpen,
        resetToDemoCases,
      }}
    >
      {children}
    </CasesContext.Provider>
  );
};

export const useCases = () => {
  const context = useContext(CasesContext);
  if (!context) {
    throw new Error('useCases must be used within a CasesProvider');
  }
  return context;
};
