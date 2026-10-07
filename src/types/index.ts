export type EvidenceType = 'OBSERVADA' | 'INFERIDA' | 'HIPOTÉTICA';

export type SignalType = 
  | 'Error'
  | 'Repetición'
  | 'Abandono'
  | 'Búsqueda'
  | 'Navegación'
  | 'Tiempo'
  | 'Historial'
  | 'Preferencia'
  | 'Estado del journey'
  | 'Transacción'
  | 'Evento'
  | 'Otro';

export type SignalSource =
  | 'Analytics'
  | 'Logs'
  | 'Prueba de usuario'
  | 'Research'
  | 'Entrevistas'
  | 'Contact center'
  | 'Soporte'
  | 'Observación'
  | 'Conocimiento del negocio'
  | 'Hipótesis'
  | 'Otra'
  | 'Analytics / logs'
  | 'Investigación';

export type ConfidenceLevel = 'Baja' | 'Media' | 'Alta';

export type UserValueLevel = 'Bajo' | 'Medio' | 'Alto';

export type ErrorRiskLevel = 'Bajo' | 'Medio' | 'Alto';

export type ErrorImpact =
  | 'Confusión'
  | 'Fricción'
  | 'Decisión incorrecta'
  | 'Error operativo'
  | 'Privacidad'
  | 'Impacto financiero'
  | 'Ninguno relevante';

export type DecisionGateOutcome = 'ADAPTAR' | 'SUGERIR' | 'PREGUNTAR' | 'NO ADAPTAR';

export type ImplementationReadiness = 
  | 'EXPLORAR' 
  | 'PROTOTIPAR' 
  | 'PREPARAR IMPLEMENTACIÓN' 
  | 'IMPLEMENTABLE';

export type OpportunityPriority = 
  | 'PROTOTIPAR PRIMERO' 
  | 'INVESTIGAR PRIMERO' 
  | 'DISEÑAR CON SALVAGUARDAS' 
  | 'NO PRIORIZAR'
  | 'EXPLORATORIA';

export type DataAvailability = 
  | 'Disponible' 
  | 'Parcial' 
  | 'No disponible' 
  | 'No sabemos'
  | 'En producción'
  | 'En desarrollo'
  | 'Requiere instrumentación'
  | 'Desconocida';

export type ContextualMaturity = 
  | 'M0 Estática' 
  | 'M1 Sesión' 
  | 'M2 Journey' 
  | 'M3 Historial' 
  | 'M4 Predictiva'
  | 'M0'
  | 'M1'
  | 'M2'
  | 'M3'
  | 'M4'
  | string;

export interface DataRequirements {
  neededSignal?: string;
  signalNeeded?: string;
  source?: string;
  sourceType?: string;
  availability: DataAvailability;
  requiredMaturity?: ContextualMaturity;
  contextualMaturity?: ContextualMaturity;
  technicalNotes?: string;
}

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
  uiMechanisms?: string[];
  example: {
    title: string;
    before: string;
    after: string;
  };
  risksDescription: string;
  recommendedMetrics: string[];
  associatedCasesCount?: number;
}

export type FallbackOption =
  | 'Ignorar recomendación'
  | 'Cerrar ayuda'
  | 'Continuar normalmente'
  | 'Cambiar opción'
  | 'Volver atrás'
  | 'Confirmar manualmente'
  | 'Otro';

export type ValidationOutcome =
  | 'Finalización'
  | 'Comprensión'
  | 'Errores / recuperación'
  | 'Esfuerzo'
  | 'Tiempo / eficiencia'
  | 'Confianza'
  | 'Errores'
  | 'Tiempo'
  | 'Recuperación'
  | 'Abandono'
  | 'Número de pasos'
  | 'Necesidad de soporte';

export type ValidationMethod =
  | 'Prueba de usabilidad'
  | 'Prototipo'
  | 'Entrevista'
  | 'Comparación A/B'
  | 'Analytics'
  | 'Logs'
  | 'Encuesta'
  | 'Implementación piloto';

export type ValidationFinding = 
  | 'Apoyada' 
  | 'Parcialmente apoyada' 
  | 'No apoyada' 
  | 'Inconclusa';

export interface ValidationRecord {
  method: string;
  date: string;
  sampleOrParticipants?: string;
  finding: ValidationFinding;
  learning: string; // "¿Qué aprendimos?"
}

export interface ExperienceImpact {
  directOutcome?: string; // Nivel 1: Menos errores
  journeyIndicator?: string; // Nivel 2: Task success, CES, CSAT
  aggregateIndicator?: string; // Nivel 3: Potencial contribución a NPS / experiencia general
}

export type CaseStatus = 
  | 'Borrador'
  | 'Lista para prototipar'
  | 'En validación'
  | 'Validada'
  | 'Descartada';

export interface ContextualCase {
  id: string;
  title: string;
  journey: string;
  moment: string;
  job: string; // "Quiero ______ para poder ______"
  isDemo?: boolean;
  demoBadge?: 'CASO DEMOSTRATIVO' | 'EJEMPLO SIMULADO';

  signal: {
    type: SignalType;
    description: string;
    source: SignalSource;
    evidenceType: EvidenceType;
  };

  interpretation: {
    context: string; // "¿Qué podría estar pasando?" (Contexto ≠ Certeza)
    intention: string; // "¿Qué creemos que está intentando conseguir?"
    confidence: ConfidenceLevel;
  };

  decision: {
    userValue: UserValueLevel;
    errorRisk: ErrorRiskLevel;
    possibleImpact: ErrorImpact;
    intervention: DecisionGateOutcome; // Decision Gate (ADAPTAR, SUGERIR, PREGUNTAR, NO ADAPTAR)
    readiness?: ImplementationReadiness;
    rationale?: string;
  };

  response: {
    patterns: PatternKey[];
    selectedMechanisms?: string[];
    description: string;
    fallback: string;
    before?: string;
    after?: string;
  };

  dataRequirements?: DataRequirements;

  validation: {
    outcome: ValidationOutcome;
    method: ValidationMethod;
    primaryMetric: string;
    secondaryMetric?: string;
    expectedResult?: string;
  };

  validationRecord?: ValidationRecord;
  experienceImpact?: ExperienceImpact;

  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
}

export type ActiveView = 
  | 'home'
  | 'wizard'
  | 'playbook'
  | 'patterns'
  | 'cases'
  | 'my-cases'
  | 'opportunity-matrix'
  | 'simulator'
  | 'case-detail';
