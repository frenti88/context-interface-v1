import React, { useState } from 'react';
import { useCases } from '../context/CasesContext';
import { Search, PlusCircle } from 'lucide-react';
import { EvidenceBadge, StatusBadge, DecisionGateBadge } from '../components/ui/Badges';
import { PATTERNS_DATA } from '../data/patterns';
import { PatternKey, EvidenceType, DecisionGateOutcome } from '../types';

export const CasesView: React.FC = () => {
  const { cases, navigateTo, startNewCase } = useCases();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterJourney, setFilterJourney] = useState('todos');
  const [filterPattern, setFilterPattern] = useState('todos');
  const [filterEvidence, setFilterEvidence] = useState('todos');
  const [filterGate, setFilterGate] = useState('todos');

  // Extract unique journeys
  const journeys = Array.from(new Set(cases.map((c) => c.journey).filter(Boolean)));

  const filteredCases = cases.filter((c) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.journey.toLowerCase().includes(q) ||
        c.moment.toLowerCase().includes(q) ||
        c.job.toLowerCase().includes(q) ||
        c.signal.description.toLowerCase().includes(q) ||
        c.response.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterJourney !== 'todos' && c.journey !== filterJourney) return false;
    if (filterPattern !== 'todos' && !c.response.patterns.includes(filterPattern as PatternKey)) return false;
    if (filterEvidence !== 'todos' && c.signal.evidenceType !== filterEvidence) return false;
    if (filterGate !== 'todos' && c.decision.intervention !== filterGate) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Repositorio de Referencia
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Casos Contextuales de Ejemplo
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed mt-1">
            Ejemplos prácticos documentados con el modelo Momento → Señal → Interpretación → Decisión → Respuesta → Validación.
          </p>
        </div>

        <button
          type="button"
          onClick={() => startNewCase()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm min-h-[44px] shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Crear nueva hipótesis</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-neutral-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por momento, señal, job o texto..."
            className="w-full pl-10 pr-4 py-2.5 rounded-input border border-neutral-300 text-xs sm:text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[44px]"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-neutral-100">
          <div>
            <label className="block font-semibold text-neutral-600 mb-1">Journey</label>
            <select
              value={filterJourney}
              onChange={(e) => setFilterJourney(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[40px]"
            >
              <option value="todos">Todos los journeys</option>
              {journeys.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-600 mb-1">Patrón de respuesta</label>
            <select
              value={filterPattern}
              onChange={(e) => setFilterPattern(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[40px]"
            >
              <option value="todos">Cualquier patrón</option>
              {PATTERNS_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-600 mb-1">Tipo de evidencia</label>
            <select
              value={filterEvidence}
              onChange={(e) => setFilterEvidence(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[40px]"
            >
              <option value="todos">Todos los tipos</option>
              <option value="OBSERVADA">OBSERVADA (Directa)</option>
              <option value="INFERIDA">INFERIDA (Indicios)</option>
              <option value="HIPOTÉTICA">HIPOTÉTICA (Por validar)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-600 mb-1">Decision Gate</label>
            <select
              value={filterGate}
              onChange={(e) => setFilterGate(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[40px]"
            >
              <option value="todos">Todas las decisiones</option>
              <option value="ADAPTAR">ADAPTAR</option>
              <option value="SUGERIR">SUGERIR</option>
              <option value="PREGUNTAR">PREGUNTAR</option>
              <option value="NO ADAPTAR">NO ADAPTAR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => navigateTo('case-detail', c.id)}
            className="p-5 sm:p-6 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-100 px-2.5 py-0.5 rounded">
                  {c.journey}
                </span>
                <StatusBadge status={c.status} />
              </div>

              <div className="text-[11px] text-neutral-500 font-medium">
                Momento: <span className="text-neutral-800">{c.moment}</span>
              </div>

              <h2 className="text-lg font-bold text-neutral-900 group-hover:text-black leading-snug">
                {c.title}
              </h2>

              <div className="space-y-1.5 text-xs text-neutral-700 bg-neutral-50/70 p-3 rounded-lg border border-neutral-100">
                <p>
                  <strong className="text-neutral-900 font-semibold">Señal:</strong> {c.signal.description}
                </p>
                <p>
                  <strong className="text-neutral-900 font-semibold">Job:</strong> {c.job}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <EvidenceBadge type={c.signal.evidenceType} size="sm" />
                  <DecisionGateBadge outcome={c.decision.intervention} size="sm" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-400">
                {new Date(c.updatedAt).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
              </span>
              <span className="text-neutral-900 font-semibold group-hover:underline">
                Ver Ficha de Hipótesis →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
