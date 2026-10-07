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
  | 'Analytics / logs'
  | 'Investigación'
  | 'Prueba de usuario'
  | 'Observación'
  | 'Contact center'
  | 'Conocimiento del negocio'
  | 'Hipótesis';

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
  | 'Tiempo'
  | 'Errores'
  | 'Recuperación'
  | 'Abandono'
  | 'Esfuerzo'
  | 'Confianza'
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
    rationale?: string;
  };

  response: {
    patterns: PatternKey[];
    description: string;
    fallback: string;
    before?: string;
    after?: string;
  };

  validation: {
    outcome: ValidationOutcome;
    method: ValidationMethod;
    primaryMetric: string;
    secondaryMetric?: string;
    expectedResult?: string;
  };

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
