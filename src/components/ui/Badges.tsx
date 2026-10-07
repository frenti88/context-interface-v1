import React from 'react';
import { 
  EvidenceType, 
  ConfidenceLevel, 
  UserValueLevel, 
  ErrorRiskLevel, 
  DecisionGateOutcome, 
  ImplementationReadiness,
  OpportunityPriority,
  CaseStatus 
} from '../../types';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRightCircle, 
  Layers, 
  MessageSquare, 
  Ban,
  Clock,
  ShieldCheck, 
  XCircle,
  FlaskConical,
  Wrench,
  Rocket,
  Compass,
  AlertTriangle,
  FileCode
} from 'lucide-react';

/* ==========================================================================
   EVIDENCE BADGE (WCAG 2.2 AA: icon + text + shape + label)
   Shape:
   - OBSERVADA: pill redondeado completo [●]
   - INFERIDA: caja bordes redondeados con borde sólido [△]
   - HIPOTÉTICA: tag con borde discontinuo [?]
   ========================================================================== */
export const EvidenceBadge: React.FC<{ type: EvidenceType; size?: 'sm' | 'md' }> = ({
  type,
  size = 'md',
}) => {
  const configs = {
    OBSERVADA: {
      symbol: '●',
      label: 'Evidencia observada',
      shortLabel: 'Observada',
      hint: 'Existe evidencia directa registrada en analítica, logs o pruebas con usuarios.',
      icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-800" aria-hidden="true" />,
      style: 'bg-emerald-50 text-emerald-950 border-emerald-400 rounded-full font-semibold',
    },
    INFERIDA: {
      symbol: '△',
      label: 'Evidencia inferida',
      shortLabel: 'Inferida',
      hint: 'Tenemos indicios y heurísticas previas, pero no mediciones directas en producción.',
      icon: <HelpCircle className="w-4 h-4 shrink-0 text-amber-800" aria-hidden="true" />,
      style: 'bg-amber-50 text-amber-950 border-amber-400 rounded-lg font-semibold',
    },
    HIPOTÉTICA: {
      symbol: '?',
      label: 'Hipótesis por validar',
      shortLabel: 'Hipotética',
      hint: 'No existe evidencia aún. Es una suposición que requiere validarse con prototipo.',
      icon: <Sparkles className="w-4 h-4 shrink-0 text-indigo-800" aria-hidden="true" />,
      style: 'bg-indigo-50 text-indigo-950 border-indigo-400 border-dashed rounded-md font-semibold',
    },
  };

  const c = configs[type] || configs.HIPOTÉTICA;

  return (
    <span
      className={`inline-flex items-center gap-1.5 border shadow-sm ${c.style} ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      }`}
      title={c.hint}
      role="status"
    >
      <span className="font-mono text-xs opacity-70" aria-hidden="true">[{c.symbol}]</span>
      {c.icon}
      <span>{size === 'sm' ? c.shortLabel : c.label}</span>
    </span>
  );
};

/* ==========================================================================
   DECISION GATE BADGE (ADAPTAR, SUGERIR, PREGUNTAR, NO ADAPTAR)
   ========================================================================== */
export const DecisionGateBadge: React.FC<{ outcome: DecisionGateOutcome; size?: 'sm' | 'md' }> = ({
  outcome,
  size = 'md',
}) => {
  const configs: Record<DecisionGateOutcome, { label: string; icon: React.ReactNode; style: string }> = {
    ADAPTAR: {
      label: 'Adaptar',
      icon: <ArrowRightCircle className="w-4 h-4 shrink-0 text-emerald-800" aria-hidden="true" />,
      style: 'bg-emerald-50 text-emerald-950 border-emerald-400 rounded-full',
    },
    SUGERIR: {
      label: 'Sugerir',
      icon: <Layers className="w-4 h-4 shrink-0 text-sky-800" aria-hidden="true" />,
      style: 'bg-sky-50 text-sky-950 border-sky-400 rounded-lg',
    },
    PREGUNTAR: {
      label: 'Preguntar',
      icon: <MessageSquare className="w-4 h-4 shrink-0 text-amber-800" aria-hidden="true" />,
      style: 'bg-amber-50 text-amber-950 border-amber-400 rounded-md',
    },
    'NO ADAPTAR': {
      label: 'No adaptar',
      icon: <Ban className="w-4 h-4 shrink-0 text-neutral-700" aria-hidden="true" />,
      style: 'bg-neutral-100 text-neutral-900 border-neutral-350 rounded-md',
    },
  };

  const c = configs[outcome] || configs.SUGERIR;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold border uppercase tracking-wider ${c.style} ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
      }`}
    >
      {c.icon}
      <span>{c.label}</span>
    </span>
  );
};

/* ==========================================================================
   READINESS BADGE (EXPLORAR, PROTOTIPAR, PREPARAR IMPLEMENTACIÓN, IMPLEMENTABLE)
   ========================================================================== */
export const ReadinessBadge: React.FC<{ readiness: ImplementationReadiness; size?: 'sm' | 'md' }> = ({
  readiness,
  size = 'md',
}) => {
  const configs: Record<ImplementationReadiness, { label: string; icon: React.ReactNode; style: string }> = {
    EXPLORAR: {
      label: 'Explorar',
      icon: <Compass className="w-3.5 h-3.5 text-indigo-800" aria-hidden="true" />,
      style: 'bg-indigo-50 text-indigo-950 border-indigo-300',
    },
    PROTOTIPAR: {
      label: 'Prototipar',
      icon: <FlaskConical className="w-3.5 h-3.5 text-sky-800" aria-hidden="true" />,
      style: 'bg-sky-50 text-sky-950 border-sky-300',
    },
    'PREPARAR IMPLEMENTACIÓN': {
      label: 'Preparar implementación',
      icon: <Wrench className="w-3.5 h-3.5 text-emerald-800" aria-hidden="true" />,
      style: 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold',
    },
    IMPLEMENTABLE: {
      label: 'Implementable',
      icon: <Rocket className="w-3.5 h-3.5 text-emerald-900" aria-hidden="true" />,
      style: 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold',
    },
  };

  const c = configs[readiness] || configs.PROTOTIPAR;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border font-medium ${c.style} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      {c.icon}
      <span>Readiness: {c.label}</span>
    </span>
  );
};

/* ==========================================================================
   PRIORITY BADGE (Para Journey Opportunity Map)
   ========================================================================== */
export const PriorityBadge: React.FC<{ priority: OpportunityPriority; size?: 'sm' | 'md' }> = ({
  priority,
  size = 'md',
}) => {
  const configs: Record<OpportunityPriority, { label: string; icon: React.ReactNode; style: string }> = {
    'PROTOTIPAR PRIMERO': {
      label: 'Prototipar primero',
      icon: <Rocket className="w-3.5 h-3.5 text-emerald-800" aria-hidden="true" />,
      style: 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold',
    },
    'INVESTIGAR PRIMERO': {
      label: 'Investigar primero',
      icon: <Compass className="w-3.5 h-3.5 text-indigo-800" aria-hidden="true" />,
      style: 'bg-indigo-50 text-indigo-950 border-indigo-300 font-semibold',
    },
    'DISEÑAR CON SALVAGUARDAS': {
      label: 'Diseñar con salvaguardas',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-800" aria-hidden="true" />,
      style: 'bg-amber-50 text-amber-950 border-amber-300 font-semibold',
    },
    'NO PRIORIZAR': {
      label: 'No priorizar',
      icon: <Ban className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />,
      style: 'bg-neutral-100 text-neutral-700 border-neutral-300 font-medium',
    },
    'EXPLORATORIA': {
      label: 'Exploratoria',
      icon: <Compass className="w-3.5 h-3.5 text-slate-700" aria-hidden="true" />,
      style: 'bg-slate-100 text-slate-800 border-slate-300 font-medium',
    },
  };

  const c = configs[priority] || configs['INVESTIGAR PRIMERO'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${c.style} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      {c.icon}
      <span>{c.label}</span>
    </span>
  );
};

/* ==========================================================================
   DEMO BADGE
   ========================================================================== */
export const DemoBadge: React.FC<{ text?: string }> = ({ text = 'Ejemplo simulado' }) => {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300"
      title="Este caso es un ejemplo pedagógico para ilustrar la metodología, no una validación real en producción."
    >
      <FileCode className="w-3 h-3 text-neutral-600" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
};

/* ==========================================================================
   CONFIDENCE, VALUE & RISK BADGES
   ========================================================================== */
export const ConfidenceBadge: React.FC<{ level: ConfidenceLevel }> = ({ level }) => {
  const configs = {
    Alta: 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold',
    Media: 'bg-sky-50 text-sky-950 border-sky-300 font-semibold',
    Baja: 'bg-neutral-100 text-neutral-800 border-neutral-300 font-medium',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm border ${configs[level]}`}>
      Confianza: {level}
    </span>
  );
};

export const ValueBadge: React.FC<{ level: UserValueLevel }> = ({ level }) => {
  const configs = {
    Alto: 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold',
    Medio: 'bg-neutral-100 text-neutral-900 border-neutral-300 font-medium',
    Bajo: 'bg-neutral-50 text-neutral-700 border-neutral-200 font-medium',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm border ${configs[level]}`}>
      Valor: {level}
    </span>
  );
};

export const RiskBadge: React.FC<{ level: ErrorRiskLevel }> = ({ level }) => {
  const configs = {
    Bajo: 'bg-neutral-100 text-neutral-900 border-neutral-300 font-medium',
    Medio: 'bg-amber-50 text-amber-950 border-amber-300 font-semibold',
    Alto: 'bg-rose-50 text-rose-950 border-rose-300 font-semibold',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm border ${configs[level]}`}>
      Riesgo: {level}
    </span>
  );
};

/* ==========================================================================
   STATUS BADGE
   ========================================================================== */
export const StatusBadge: React.FC<{ status: CaseStatus }> = ({ status }) => {
  const configs: Record<CaseStatus, { icon: React.ReactNode; style: string }> = {
    Borrador: {
      icon: <Clock className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />,
      style: 'bg-neutral-100 text-neutral-800 border-neutral-300 font-medium',
    },
    'Lista para prototipar': {
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-700" aria-hidden="true" />,
      style: 'bg-indigo-50 text-indigo-950 border-indigo-300 font-semibold',
    },
    'En validación': {
      icon: <Layers className="w-3.5 h-3.5 text-sky-700" aria-hidden="true" />,
      style: 'bg-sky-50 text-sky-950 border-sky-300 font-semibold',
    },
    Validada: {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" aria-hidden="true" />,
      style: 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold',
    },
    Descartada: {
      icon: <XCircle className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />,
      style: 'bg-neutral-100 text-neutral-600 border-neutral-300 font-medium',
    },
  };

  const c = configs[status] || configs.Borrador;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm border ${c.style}`}>
      {c.icon}
      <span>{status}</span>
    </span>
  );
};
