import React from 'react';
import { 
  EvidenceType, 
  ConfidenceLevel, 
  UserValueLevel, 
  ErrorRiskLevel, 
  DecisionGateOutcome, 
  CaseStatus 
} from '../../types';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRightCircle, 
  MessageSquare, 
  Ban,
  Clock,
  Layers,
  Archive,
  XCircle
} from 'lucide-react';

/* ==========================================================================
   EVIDENCE BADGE (WCAG 2.2 AA compliant: icon + shape + text + color)
   ========================================================================== */
export const EvidenceBadge: React.FC<{ type: EvidenceType; size?: 'sm' | 'md' }> = ({
  type,
  size = 'md',
}) => {
  const configs = {
    OBSERVADA: {
      label: 'Evidencia observada',
      shortLabel: 'Observada',
      hint: 'Existe evidencia directa registrada en analítica, logs o pruebas con usuarios.',
      icon: <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-700" />,
      style: 'bg-emerald-50 text-emerald-900 border-emerald-300 rounded-full',
    },
    INFERIDA: {
      label: 'Evidencia inferida',
      shortLabel: 'Inferida',
      hint: 'Tenemos indicios y heurísticas previas, pero no mediciones directas en producción.',
      icon: <HelpCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />,
      style: 'bg-amber-50 text-amber-900 border-amber-300 rounded-lg',
    },
    HIPOTÉTICA: {
      label: 'Hipótesis por validar',
      shortLabel: 'Hipotética',
      hint: 'No existe evidencia aún. Es una suposición que requiere validarse con prototipo.',
      icon: <Sparkles className="w-3.5 h-3.5 shrink-0 text-indigo-700" />,
      style: 'bg-indigo-50 text-indigo-900 border-indigo-300 border-dashed rounded-md',
    },
  };

  const c = configs[type] || configs.HIPOTÉTICA;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border ${c.style} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
      }`}
      title={c.hint}
    >
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
      icon: <ArrowRightCircle className="w-3.5 h-3.5 shrink-0 text-emerald-700" />,
      style: 'bg-emerald-50 text-emerald-900 border-emerald-300 rounded-full',
    },
    SUGERIR: {
      label: 'Sugerir',
      icon: <Layers className="w-3.5 h-3.5 shrink-0 text-sky-700" />,
      style: 'bg-sky-50 text-sky-900 border-sky-300 rounded-lg',
    },
    PREGUNTAR: {
      label: 'Preguntar',
      icon: <MessageSquare className="w-3.5 h-3.5 shrink-0 text-amber-700" />,
      style: 'bg-amber-50 text-amber-900 border-amber-300 rounded-md',
    },
    'NO ADAPTAR': {
      label: 'No adaptar',
      icon: <Ban className="w-3.5 h-3.5 shrink-0 text-slate-700" />,
      style: 'bg-slate-100 text-slate-800 border-slate-300 rounded-md',
    },
  };

  const c = configs[outcome] || configs.SUGERIR;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold border uppercase tracking-wider text-[11px] ${c.style} ${
        size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'
      }`}
    >
      {c.icon}
      <span>{c.label}</span>
    </span>
  );
};

/* ==========================================================================
   CONFIDENCE BADGE
   ========================================================================== */
export const ConfidenceBadge: React.FC<{ level: ConfidenceLevel }> = ({ level }) => {
  const configs = {
    Alta: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Media: 'bg-sky-50 text-sky-800 border-sky-200',
    Baja: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${configs[level]}`}>
      Confianza: {level}
    </span>
  );
};

/* ==========================================================================
   VALUE & RISK BADGES
   ========================================================================== */
export const ValueBadge: React.FC<{ level: UserValueLevel }> = ({ level }) => {
  const configs = {
    Alto: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Medio: 'bg-slate-100 text-slate-700 border-slate-200',
    Bajo: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${configs[level]}`}>
      Valor: {level}
    </span>
  );
};

export const RiskBadge: React.FC<{ level: ErrorRiskLevel }> = ({ level }) => {
  const configs = {
    Bajo: 'bg-slate-100 text-slate-700 border-slate-200',
    Medio: 'bg-amber-50 text-amber-800 border-amber-200',
    Alto: 'bg-rose-50 text-rose-800 border-rose-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${configs[level]}`}>
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
      icon: <Clock className="w-3 h-3 text-neutral-500" />,
      style: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    },
    'Lista para prototipar': {
      icon: <Sparkles className="w-3 h-3 text-indigo-600" />,
      style: 'bg-indigo-50 text-indigo-800 border-indigo-200 font-semibold',
    },
    'En validación': {
      icon: <Layers className="w-3 h-3 text-sky-600" />,
      style: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    Validada: {
      icon: <ShieldCheck className="w-3 h-3 text-emerald-600" />,
      style: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    },
    Descartada: {
      icon: <XCircle className="w-3 h-3 text-slate-400" />,
      style: 'bg-slate-100 text-slate-500 border-slate-200',
    },
  };

  const c = configs[status] || configs.Borrador;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.style}`}>
      {c.icon}
      <span>{status}</span>
    </span>
  );
};
