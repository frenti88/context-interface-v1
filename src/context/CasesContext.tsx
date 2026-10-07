import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ContextualCase, 
  ActiveView, 
  CaseStatus, 
  PatternKey, 
  ValidationRecord 
} from '../types';
import { DEMO_CASES } from '../data/demoCases';

export interface MissingRequirement {
  field: string;
  label: string;
  step: number;
}

export function checkCaseCompleteness(caseData: Partial<ContextualCase> | null): MissingRequirement[] {
  if (!caseData) return [{ field: 'all', label: 'Datos básicos', step: 1 }];

  const missing: MissingRequirement[] = [];

  // Step 1: Momento
  if (!caseData.journey?.trim()) {
    missing.push({ field: 'journey', label: 'Journey', step: 1 });
  }
  if (!caseData.moment?.trim()) {
    missing.push({ field: 'moment', label: 'Momento específico', step: 1 });
  }
  if (!caseData.job?.trim()) {
    missing.push({ field: 'job', label: 'Job del usuario', step: 1 });
  }

  // Step 2: Señal
  if (!caseData.signal?.type) {
    missing.push({ field: 'signal.type', label: 'Tipo de señal', step: 2 });
  }
  if (!caseData.signal?.description?.trim()) {
    missing.push({ field: 'signal.description', label: 'Descripción de lo observado', step: 2 });
  }
  if (!caseData.signal?.source) {
    missing.push({ field: 'signal.source', label: 'Fuente de la señal', step: 2 });
  }
  if (!caseData.signal?.evidenceType) {
    missing.push({ field: 'signal.evidenceType', label: 'Clasificación de evidencia', step: 2 });
  }

  // Step 3: Interpretación
  if (!caseData.interpretation?.context?.trim()) {
    missing.push({ field: 'interpretation.context', label: 'Interpretación del contexto', step: 3 });
  }
  if (!caseData.interpretation?.intention?.trim()) {
    missing.push({ field: 'interpretation.intention', label: 'Intención estimada', step: 3 });
  }
  if (!caseData.interpretation?.confidence) {
    missing.push({ field: 'interpretation.confidence', label: 'Nivel de confianza', step: 3 });
  }

  // Step 4: Decisión
  if (!caseData.decision?.userValue) {
    missing.push({ field: 'decision.userValue', label: 'Valor para el usuario', step: 4 });
  }
  if (!caseData.decision?.errorRisk) {
    missing.push({ field: 'decision.errorRisk', label: 'Riesgo de error', step: 4 });
  }
  if (!caseData.decision?.intervention) {
    missing.push({ field: 'decision.intervention', label: 'Decisión de diseño', step: 4 });
  }

  // Step 5: Respuesta
  if (!caseData.response?.patterns || caseData.response.patterns.length === 0) {
    missing.push({ field: 'response.patterns', label: 'Al menos un patrón contextual', step: 5 });
  }
  if (!caseData.response?.description?.trim()) {
    missing.push({ field: 'response.description', label: 'Descripción de la respuesta de interfaz', step: 5 });
  }
  if (!caseData.response?.fallback?.trim()) {
    missing.push({ field: 'response.fallback', label: 'Mecanismo de fallback', step: 5 });
  }
  if (!caseData.response?.before?.trim()) {
    missing.push({ field: 'response.before', label: 'Experiencia estándar (Antes)', step: 5 });
  }
  if (!caseData.response?.after?.trim()) {
    missing.push({ field: 'response.after', label: 'Experiencia contextual (Después)', step: 5 });
  }

  // Step 6: Validación
  if (!caseData.validation?.outcome) {
    missing.push({ field: 'validation.outcome', label: 'Outcome principal', step: 6 });
  }
  if (!caseData.validation?.method) {
    missing.push({ field: 'validation.method', label: 'Método de validación', step: 6 });
  }
  if (!caseData.validation?.primaryMetric?.trim()) {
    missing.push({ field: 'validation.primaryMetric', label: 'Métrica u objetivo de éxito', step: 6 });
  }

  return missing;
}

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
  updateCaseStatus: (id: string, status: CaseStatus, validationRecord?: ValidationRecord) => void;
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
    // SIN DEFAULTS INVENTADOS: Estado inicial completamente limpio
    const blankCase: Partial<ContextualCase> = {
      title: initialData?.title || '',
      journey: initialData?.journey || '',
      moment: initialData?.moment || '',
      job: initialData?.job || '',
      status: 'Borrador',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      signal: {
        type: initialData?.signal?.type as any,
        description: initialData?.signal?.description || '',
        source: initialData?.signal?.source as any,
        evidenceType: initialData?.signal?.evidenceType as any,
      },

      interpretation: {
        context: initialData?.interpretation?.context || '',
        intention: initialData?.interpretation?.intention || '',
        confidence: initialData?.interpretation?.confidence as any,
      },

      decision: {
        userValue: initialData?.decision?.userValue as any,
        errorRisk: initialData?.decision?.errorRisk as any,
        possibleImpact: initialData?.decision?.possibleImpact || 'Ninguno relevante',
        intervention: initialData?.decision?.intervention as any,
        readiness: initialData?.decision?.readiness as any,
        rationale: initialData?.decision?.rationale || '',
      },

      response: {
        patterns: initialData?.response?.patterns || [],
        selectedMechanisms: initialData?.response?.selectedMechanisms || [],
        description: initialData?.response?.description || '',
        fallback: initialData?.response?.fallback || '',
        before: initialData?.response?.before || '',
        after: initialData?.response?.after || '',
      },

      dataRequirements: initialData?.dataRequirements || {
        neededSignal: '',
        source: '',
        availability: 'No sabemos',
        requiredMaturity: 'M1 Sesión',
      },

      validation: {
        outcome: initialData?.validation?.outcome as any,
        method: initialData?.validation?.method as any,
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

  const duplicateCase = (id: string) => {
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

  const updateCaseStatus = (id: string, status: CaseStatus, validationRecord?: ValidationRecord) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status,
            validationRecord: validationRecord || c.validationRecord,
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  const saveCase = (caseData: ContextualCase) => {
    setCases((prev) => {
      const idx = prev.findIndex((c) => c.id === caseData.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...caseData, updatedAt: new Date().toISOString() };
        return updated;
      }
      return [{ ...caseData, updatedAt: new Date().toISOString() }, ...prev];
    });

    setDraftCase(null);
    setSelectedCaseId(caseData.id);
    setActiveView('case-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveDraft = (partial: Partial<ContextualCase>) => {
    setDraftCase((prev) => {
      const next = { ...(prev || {}), ...partial, updatedAt: new Date().toISOString() };
      return next;
    });
  };

  const clearDraft = () => {
    setDraftCase(null);
  };

  const resetToDemoCases = () => {
    setCases(DEMO_CASES);
    setDraftCase(null);
    localStorage.removeItem(STORAGE_KEY_DRAFT);
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
