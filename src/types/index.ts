export type EvidenceLevel = 'nivel-1' | 'nivel-2' | 'nivel-3';

export type SignalType = 
  | 'Error'
  | 'Abandono'
  | 'Repetición'
  | 'Búsqueda'
  | 'Navegación'
  | 'Tiempo'
  | 'Historial'
  | 'Preferencia'
  | 'Estado del journey'
  | 'Producto'
  | 'Transacción'
  | 'Evento externo'
  | 'Otra señal';

export type SignalSource =
  | 'Analítica'
  | 'Logs'
  | 'Research'
  | 'Observación'
  | 'Negocio'
  | 'Hipótesis';

export type ContextConfidence = 'Baja' | 'Media' | 'Alta';

export type InterventionDecision = 'No intervenir' | 'Acompañar' | 'Adaptar';

export type ErrorImpact =
  | 'Sin impacto significativo'
  | 'Confusión'
  | 'Fricción adicional'
  | 'Decisión incorrecta'
  | 'Riesgo financiero'
  | 'Riesgo de privacidad'
  | 'Riesgo operativo';

export type ErrorCost = 'Bajo' | 'Medio' | 'Alto';

export type PatternKey =
  | 'priorizar'
  | 'simplificar'
  | 'orientar'
  | 'prevenir'
  | 'recuperar'
  | 'recordar'
  | 'continuar'
  | 'confirmar';

export interface Pattern {
  id: PatternKey;
  name: string;
  shortDescription: string;
  interventionType: 'Acompañar' | 'Adaptar' | 'Mixto';
  risk: 'Bajo' | 'Medio' | 'Alto';
  dataLevel: 'Bajo' | 'Medio' | 'Alto';
  journeyMoment: 'Descubrimiento' | 'Ejecución' | 'Error' | 'Retorno' | 'Cierre';
  definition: string;
  whenToUse: string[];
  whenToAvoid: string[];
  frequentSignals: string[];
  example: {
    title: string;
    before: string;
    after: string;
  };
  risksDescription: string;
  recommendedMetrics: string[];
  associatedCasesCount?: number;
}

export type ExpectedOutcome =
  | 'Finalización'
  | 'Comprensión'
  | 'Tiempo'
  | 'Reducción de errores'
  | 'Menos abandono'
  | 'Menos esfuerzo'
  | 'Mayor confianza'
  | 'Menos pasos'
  | 'Menos contactos de soporte'
  | 'Otro';

export type ValidationMethod =
  | 'Prueba de usabilidad'
  | 'Entrevista'
  | 'Prototipo'
  | 'A/B test'
  | 'Analítica'
  | 'Logs'
  | 'Encuesta'
  | 'Experimento'
  | 'Implementación';

export type MaturityLevelNumber = 0 | 1 | 2 | 3 | 4;

export type CaseStatus = 'Borrador' | 'En validación' | 'Validado' | 'Archivado';

export interface ContextualCase {
  id: string;
  title: string;
  journey: string;
  isCustom?: boolean; // true if created/edited by user, false if built-in demo
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  
  signal: {
    type: SignalType;
    description: string;
    source: SignalSource;
    evidenceLevel: EvidenceLevel;
  };
  
  context: {
    interpretation: string;
    confidence: ContextConfidence;
    helperTag?: string;
  };
  
  intention: {
    when: string;
    want: string;
    inOrderTo: string;
    jobToBeDone: string;
  };
  
  decision: {
    intervention: InterventionDecision;
    possibleMisinterpretation: ErrorImpact;
    errorCost: ErrorCost;
    rationale?: string;
  };
  
  response: {
    selectedPatterns: PatternKey[];
    description: string;
    currentInterface?: string;
    proposedInterface?: string;
  };
  
  evidence: {
    outcome: ExpectedOutcome;
    validationMethod: ValidationMethod;
    primaryMetric: string;
    secondaryMetric?: string;
    expectedResult: string;
  };
  
  maturityLevel: MaturityLevelNumber;
}

export type ActiveView = 
  | 'home'
  | 'wizard'
  | 'playbook'
  | 'patterns'
  | 'evidence'
  | 'maturity'
  | 'cases'
  | 'measurement'
  | 'my-cases'
  | 'case-detail';
