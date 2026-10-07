import React, { useState } from 'react';
import { useCases } from '../context/CasesContext';
import { Table, Sparkles, ArrowRight, Filter, PlusCircle, ArrowUpDown } from 'lucide-react';
import { DecisionGateBadge, EvidenceBadge, ValueBadge, RiskBadge, ConfidenceBadge } from '../components/ui/Badges';

export const OpportunityMatrixView: React.FC = () => {
  const { cases, navigateTo, startNewCase } = useCases();
  const [selectedJourney, setSelectedJourney] = useState<string>('todos');

  const journeys = Array.from(new Set(cases.map((c) => c.journey)));

  const filteredCases = cases.filter((c) => {
    if (selectedJourney !== 'todos' && c.journey !== selectedJourney) return false;
    return true;
  });

  // Calculate priority score for prototyping (High Value + High/Medium Confidence + Low/Medium Risk)
  const calculatePriority = (val: string, conf: string, risk: string): { label: string; style: string } => {
    if (val === 'Alto' && risk === 'Bajo') return { label: 'P1 • Inmediata', style: 'bg-emerald-100 text-emerald-900 font-bold' };
    if (val === 'Alto' && risk === 'Medio') return { label: 'P2 • Alta', style: 'bg-sky-100 text-sky-900 font-bold' };
    if (val === 'Medio' && risk === 'Bajo') return { label: 'P3 • Media', style: 'bg-amber-100 text-amber-900' };
    return { label: 'P4 • Exploratoria', style: 'bg-slate-100 text-slate-700' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Herramienta de Priorización
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Matriz de Oportunidades Contextuales
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed mt-1">
            Compara todas las oportunidades de tu journey para responder con rigor: <em>"¿Cuáles vale la pena prototipar primero?"</em>
          </p>
        </div>

        <button
          type="button"
          onClick={() => startNewCase()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm min-h-[44px] shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Nueva oportunidad</span>
        </button>
      </div>

      {/* Journey Filter */}
      <div className="flex items-center gap-3 bg-white p-3.5 rounded-card border border-neutral-200">
        <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
        <span className="text-xs font-semibold text-neutral-700">Filtrar por Journey:</span>
        <select
          value={selectedJourney}
          onChange={(e) => setSelectedJourney(e.target.value)}
          className="text-xs font-medium rounded-btn border border-neutral-300 bg-white px-3 py-1.5 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
        >
          <option value="todos">Todos los journeys ({cases.length})</option>
          {journeys.map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-card border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Momento & Caso</th>
                <th className="p-3.5">Señal</th>
                <th className="p-3.5">Evidencia</th>
                <th className="p-3.5">Valor / Riesgo</th>
                <th className="p-3.5">Decisión Gate</th>
                <th className="p-3.5">Patrón</th>
                <th className="p-3.5">Prioridad</th>
                <th className="p-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-800">
              {filteredCases.map((c) => {
                const priority = calculatePriority(c.decision.userValue, c.interpretation.confidence, c.decision.errorRisk);
                return (
                  <tr key={c.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-neutral-900">{c.moment}</div>
                      <div className="text-xs text-neutral-500 font-medium">{c.title}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">{c.journey}</div>
                    </td>

                    <td className="p-3.5 max-w-[200px]">
                      <div className="text-xs font-semibold text-neutral-900">{c.signal.type}</div>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-snug mt-0.5">
                        "{c.signal.description}"
                      </p>
                    </td>

                    <td className="p-3.5">
                      <EvidenceBadge type={c.signal.evidenceType} size="sm" />
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col gap-1">
                        <ValueBadge level={c.decision.userValue} />
                        <RiskBadge level={c.decision.errorRisk} />
                      </div>
                    </td>

                    <td className="p-3.5">
                      <DecisionGateBadge outcome={c.decision.intervention} size="sm" />
                    </td>

                    <td className="p-3.5">
                      <div className="text-xs font-semibold text-neutral-900">
                        {c.response.patterns.join(' + ')}
                      </div>
                      <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                        Fallback: {c.response.fallback}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${priority.style}`}>
                        {priority.label}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => navigateTo('case-detail', c.id)}
                        className="text-xs font-semibold text-neutral-900 hover:underline p-1 min-h-[36px]"
                      >
                        Ver Ficha →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
