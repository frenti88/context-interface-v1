import React, { useState } from 'react';
import { useCases } from '../context/CasesContext';
import { 
  Table, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  PlusCircle, 
  MapPin, 
  Compass, 
  ListFilter,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  DecisionGateBadge, 
  EvidenceBadge, 
  ValueBadge, 
  RiskBadge, 
  ConfidenceBadge,
  PriorityBadge,
  DemoBadge
} from '../components/ui/Badges';
import { OpportunityPriority } from '../types';

export const OpportunityMatrixView: React.FC = () => {
  const { cases, navigateTo, startNewCase } = useCases();
  const [selectedJourney, setSelectedJourney] = useState<string>('todos');
  const [activeTab, setActiveTab] = useState<'map' | 'table'>('map');

  const journeys = Array.from(new Set(cases.map((c) => c.journey)));

  const filteredCases = cases.filter((c) => {
    if (selectedJourney !== 'todos' && c.journey !== selectedJourney) return false;
    return true;
  });

  // Calculate transparent multi-factor priority
  const calculateOpportunityPriority = (
    val: string, 
    conf: string, 
    risk: string, 
    evidence: string
  ): OpportunityPriority => {
    if (val === 'Bajo') return 'NO PRIORIZAR';
    if (risk === 'Alto' && (conf === 'Alta' || val === 'Alto')) return 'DISEÑAR CON SALVAGUARDAS';
    if (evidence === 'HIPOTÉTICA' || conf === 'Baja') return 'INVESTIGAR PRIMERO';
    if (val === 'Alto' && (risk === 'Bajo' || risk === 'Medio')) return 'PROTOTIPAR PRIMERO';
    if (val === 'Medio' && risk === 'Bajo') return 'PROTOTIPAR PRIMERO';
    return 'EXPLORATORIA';
  };

  // Group cases by moment for Journey Map
  const momentsGrouped = filteredCases.reduce((acc, c) => {
    const key = c.moment || 'Momento general';
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {} as Record<string, typeof filteredCases>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Herramienta de Priorización & Journey
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Mapa de Oportunidades del Journey
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed mt-1">
            Visualiza y compara todas las oportunidades a lo largo del proceso para responder con rigor: <em>"¿Cuáles conviene prototipar primero?"</em>
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

      {/* View Switcher and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 rounded-card border border-neutral-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-2 rounded-btn text-xs sm:text-sm font-semibold transition-colors min-h-[40px] flex items-center gap-2 ${
              activeTab === 'map'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Mapa del Journey</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`px-3.5 py-2 rounded-btn text-xs sm:text-sm font-semibold transition-colors min-h-[40px] flex items-center gap-2 ${
              activeTab === 'table'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Tabla de Priorización</span>
          </button>
        </div>

        {/* Journey Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
          <span className="text-xs font-semibold text-neutral-700">Journey:</span>
          <select
            value={selectedJourney}
            onChange={(e) => setSelectedJourney(e.target.value)}
            className="text-xs sm:text-sm font-medium rounded-btn border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[40px]"
          >
            <option value="todos">Todos los journeys ({cases.length})</option>
            {journeys.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prioritization Criteria Legend */}
      <div className="p-4 rounded-card bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-800 space-y-2">
        <span className="font-bold text-neutral-900 text-xs uppercase tracking-wider block">
          Criterios de Priorización Multifactor:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div className="bg-white p-2.5 rounded border border-neutral-200">
            <span className="font-bold text-emerald-900 block text-xs">PROTOTIPAR PRIMERO</span>
            <span className="text-neutral-600 text-[11px]">Alto valor, confianza sólida y bajo riesgo de error.</span>
          </div>
          <div className="bg-white p-2.5 rounded border border-neutral-200">
            <span className="font-bold text-amber-900 block text-xs">INVESTIGAR PRIMERO</span>
            <span className="text-neutral-600 text-[11px]">Valor potencial alto, pero evidencia hipotética o confianza baja.</span>
          </div>
          <div className="bg-white p-2.5 rounded border border-neutral-200">
            <span className="font-bold text-purple-900 block text-xs">DISEÑAR CON SALVAGUARDAS</span>
            <span className="text-neutral-600 text-[11px]">Alto riesgo de error: requiere confirmación explícita y reversibilidad.</span>
          </div>
          <div className="bg-white p-2.5 rounded border border-neutral-200">
            <span className="font-bold text-neutral-700 block text-xs">NO PRIORIZAR</span>
            <span className="text-neutral-600 text-[11px]">Bajo valor percibido o impacto insignificante para el usuario.</span>
          </div>
        </div>
      </div>

      {/* TAB 1: Visual Journey Map */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600">
            <span>{Object.keys(momentsGrouped).length} momentos identificados</span>
            <span>Total de oportunidades: {filteredCases.length}</span>
          </div>

          <div className="space-y-6">
            {Object.entries(momentsGrouped).map(([momentTitle, momentCases], idx) => (
              <div 
                key={momentTitle}
                className="bg-white rounded-card border border-neutral-200 shadow-sm p-5 sm:p-6 space-y-4"
              >
                {/* Moment Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h2 className="font-bold text-base sm:text-lg text-neutral-900">
                      {momentTitle}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                    {momentCases.length} {momentCases.length === 1 ? 'oportunidad' : 'oportunidades'}
                  </span>
                </div>

                {/* Cards Grid under this moment */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {momentCases.map((c) => {
                    const priority = calculateOpportunityPriority(
                      c.decision.userValue,
                      c.interpretation.confidence,
                      c.decision.errorRisk,
                      c.signal.evidenceType
                    );

                    return (
                      <div
                        key={c.id}
                        className="p-4 rounded-card border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-900 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <PriorityBadge priority={priority} />
                            {c.isDemo && <DemoBadge text={c.demoBadge || 'DEMO'} />}
                          </div>

                          <h3 
                            onClick={() => navigateTo('case-detail', c.id)}
                            className="font-bold text-sm sm:text-base text-neutral-900 hover:underline cursor-pointer leading-snug line-clamp-2"
                          >
                            {c.title}
                          </h3>

                          <p className="text-xs text-neutral-600 line-clamp-2 italic">
                            "{c.signal.description}"
                          </p>

                          <div className="flex flex-wrap items-center gap-1 text-xs pt-1">
                            <EvidenceBadge type={c.signal.evidenceType} size="sm" />
                            <DecisionGateBadge outcome={c.decision.intervention} size="sm" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">
                            Patrón: {c.response.patterns[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigateTo('case-detail', c.id)}
                            className="font-bold text-neutral-900 hover:underline p-1 min-h-[44px] flex items-center"
                          >
                            Ver Ficha →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Comparison Table */}
      {activeTab === 'table' && (
        <div className="bg-white rounded-card border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/90 text-neutral-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5">Momento & Caso</th>
                  <th className="p-3.5">Señal Observable</th>
                  <th className="p-3.5">Evidencia</th>
                  <th className="p-3.5">Valor / Riesgo</th>
                  <th className="p-3.5">Decisión Gate</th>
                  <th className="p-3.5">Prioridad Sugerida</th>
                  <th className="p-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {filteredCases.map((c) => {
                  const priority = calculateOpportunityPriority(
                    c.decision.userValue,
                    c.interpretation.confidence,
                    c.decision.errorRisk,
                    c.signal.evidenceType
                  );

                  return (
                    <tr key={c.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-neutral-900 text-sm">{c.moment}</div>
                        <div className="text-xs text-neutral-600 font-medium mt-0.5">{c.title}</div>
                        <div className="text-[11px] text-neutral-400">{c.journey}</div>
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
                        <PriorityBadge priority={priority} />
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => navigateTo('case-detail', c.id)}
                          className="text-xs font-semibold text-neutral-900 hover:underline p-2 min-h-[44px]"
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
      )}
    </div>
  );
};
