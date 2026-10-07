import React from 'react';
import { EvidenceLevel, ContextConfidence, ErrorCost, MaturityLevelNumber, CaseStatus } from '../../types';

export const EvidenceBadge: React.FC<{ level: EvidenceLevel; size?: 'sm' | 'md' }> = ({
  level,
  size = 'md',
}) => {
  const configs = {
    'nivel-1': {
      label: 'Nivel 1 • Evidencia existente',
      shortLabel: 'N1 • Existente',
      description: 'Respaldada por datos duros: logs, analítica de comportamiento real o errores cuantificados.',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-600',
    },
    'nivel-2': {
      label: 'Nivel 2 • Evidencia aproximada',
      shortLabel: 'N2 • Aproximada',
      description: 'Soportada por heurísticas, investigación previa cualitativa o conocimiento de negocio.',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      dot: 'bg-amber-600',
    },
    'nivel-3': {
      label: 'Nivel 3 • Hipótesis contextual',
      shortLabel: 'N3 • Hipótesis',
      description: 'Requiere validación mediante prototipo o experimento antes de ser desplegada en producción.',
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      dot: 'bg-indigo-600',
    },
  };

  const config = configs[level] || configs['nivel-3'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${config.bg} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
      }`}
      title={config.description}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{size === 'sm' ? config.shortLabel : config.label}</span>
    </span>
  );
};

export const ConfidenceBadge: React.FC<{ confidence: ContextConfidence }> = ({ confidence }) => {
  const configs = {
    Alta: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    Media: { bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    Baja: { bg: 'bg-slate-100 text-slate-700 border-slate-300' },
  };
  const config = configs[confidence] || configs.Media;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg}`}>
      Confianza: {confidence}
    </span>
  );
};

export const RiskBadge: React.FC<{ cost: ErrorCost; labelPrefix?: string }> = ({
  cost,
  labelPrefix = 'Costo de error: ',
}) => {
  const configs = {
    Bajo: { bg: 'bg-slate-100 text-slate-700 border-slate-200' },
    Medio: { bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    Alto: { bg: 'bg-rose-50 text-rose-800 border-rose-200' },
  };
  const config = configs[cost] || configs.Bajo;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg}`}>
      {labelPrefix}
      {cost}
    </span>
  );
};

export const MaturityBadge: React.FC<{ level: MaturityLevelNumber }> = ({ level }) => {
  const names = ['Estática', 'Sesión', 'Journey', 'Historial', 'Predictiva'];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-300">
      <span className="font-semibold text-neutral-900">M{level}</span>
      <span className="text-neutral-500">•</span>
      <span>{names[level]}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: CaseStatus }> = ({ status }) => {
  const configs = {
    Borrador: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    'En validación': 'bg-sky-50 text-sky-700 border-sky-200',
    Validado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Archivado: 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${configs[status]}`}>
      {status}
    </span>
  );
};
