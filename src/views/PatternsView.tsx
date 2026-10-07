import React, { useState } from 'react';
import { PATTERNS_DATA } from '../data/patterns';
import { Pattern, PatternKey } from '../types';
import { useCases } from '../context/CasesContext';
import { BeforeAfterView } from '../components/card/BeforeAfterView';
import { Modal } from '../components/ui/Modal';
import { 
  Layers, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  PlusCircle,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react';

export const PatternsView: React.FC = () => {
  const { selectedPatternId, setSelectedPatternId, startNewCase, cases, navigateTo } = useCases();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterJourney, setFilterJourney] = useState<string>('todos');
  const [filterRisk, setFilterRisk] = useState<string>('todos');
  const [filterIntervention, setFilterIntervention] = useState<string>('todos');

  const activePattern = PATTERNS_DATA.find((p) => p.id === selectedPatternId);

  // Filter patterns
  const filteredPatterns = PATTERNS_DATA.filter((pat) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        pat.name.toLowerCase().includes(q) ||
        pat.shortDescription.toLowerCase().includes(q) ||
        pat.definition.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterJourney !== 'todos' && pat.journeyMoment !== filterJourney) return false;
    if (filterRisk !== 'todos' && pat.risk !== filterRisk) return false;
    if (filterIntervention !== 'todos' && pat.interventionType !== filterIntervention) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Biblioteca de Interfaz
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Patrones contextuales
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Formas recurrentes en las que una interfaz puede responder al contexto del usuario.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-neutral-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar patrones por nombre, señal o palabra clave..."
              className="w-full pl-10 pr-4 py-2.5 rounded-input border border-neutral-300 text-xs sm:text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {(searchQuery || filterJourney !== 'todos' || filterRisk !== 'todos' || filterIntervention !== 'todos') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterJourney('todos');
                setFilterRisk('todos');
                setFilterIntervention('todos');
              }}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline px-2 py-1 min-h-[44px] flex items-center"
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {/* Filter selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-100 text-xs">
          <div>
            <label className="block font-semibold text-neutral-600 mb-1">
              Momento del journey
            </label>
            <select
              value={filterJourney}
              onChange={(e) => setFilterJourney(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="todos">Todos los momentos</option>
              <option value="Descubrimiento">Descubrimiento</option>
              <option value="Ejecución">Ejecución</option>
              <option value="Error">Error</option>
              <option value="Retorno">Retorno</option>
              <option value="Cierre">Cierre</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-600 mb-1">
              Nivel de riesgo
            </label>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="todos">Cualquier nivel de riesgo</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-600 mb-1">
              Tipo de intervención
            </label>
            <select
              value={filterIntervention}
              onChange={(e) => setFilterIntervention(e.target.value)}
              className="w-full p-2 rounded-btn border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="todos">Todas las intervenciones</option>
              <option value="Acompañar">Acompañar</option>
              <option value="Adaptar">Adaptar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPatterns.map((pat) => {
          const associatedCases = cases.filter((c) =>
            c.response.selectedPatterns.includes(pat.id)
          );

          return (
            <div
              key={pat.id}
              onClick={() => setSelectedPatternId(pat.id)}
              className="p-5 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    {pat.journeyMoment}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    pat.interventionType === 'Acompañar' ? 'bg-sky-50 text-sky-700' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {pat.interventionType}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-black mb-1.5">
                  {pat.name}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                  {pat.shortDescription}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Riesgo: <strong>{pat.risk}</strong></span>
                <span className="text-neutral-900 font-semibold group-hover:underline flex items-center gap-1">
                  Ver guía →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pattern Deep Modal / Detail Viewer */}
      <Modal
        isOpen={Boolean(activePattern)}
        onClose={() => setSelectedPatternId(null)}
        title={activePattern ? `Patrón: ${activePattern.name}` : ''}
        description={activePattern?.shortDescription}
        maxWidth="2xl"
      >
        {activePattern && (
          <div className="space-y-6 text-sm text-neutral-700">
            {/* Metadata pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 font-medium text-neutral-800">
                Intervención: <strong>{activePattern.interventionType}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 font-medium text-neutral-800">
                Momento: <strong>{activePattern.journeyMoment}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 font-medium text-neutral-800">
                Riesgo: <strong>{activePattern.risk}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 font-medium text-neutral-800">
                Nivel de datos: <strong>{activePattern.dataLevel}</strong>
              </span>
            </div>

            {/* Definition */}
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Definición
              </h4>
              <p className="text-sm leading-relaxed text-neutral-800">
                {activePattern.definition}
              </p>
            </div>

            {/* When to use vs When to avoid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-card bg-emerald-50/60 border border-emerald-200">
                <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cuándo usarlo</span>
                </span>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {activePattern.whenToUse.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-card bg-rose-50/60 border border-rose-200">
                <span className="font-bold text-xs text-rose-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Cuándo evitarlo</span>
                </span>
                <ul className="space-y-1.5 text-xs text-rose-950">
                  {activePattern.whenToAvoid.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Frequent Signals */}
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-2">
                Señales frecuentes que lo activan
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activePattern.frequentSignals.map((sig, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-medium"
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Example: Antes vs Después */}
            <div>
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Ejemplo de aplicación: {activePattern.example.title}
              </h4>
              <BeforeAfterView
                before={activePattern.example.before}
                after={activePattern.example.after}
              />
            </div>

            {/* Risks & Recommended Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
              <div>
                <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Riesgos principales</span>
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activePattern.risksDescription}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Métricas recomendadas</span>
                </h4>
                <ul className="text-xs text-neutral-600 space-y-1">
                  {activePattern.recommendedMetrics.map((met, idx) => (
                    <li key={idx}>• {met}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPatternId(null)}
                className="px-4 py-2 text-xs font-medium rounded-btn border border-neutral-300 text-neutral-700 hover:bg-neutral-50 min-h-[44px]"
              >
                Cerrar
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPatternId(null);
                  startNewCase({
                    response: {
                      selectedPatterns: [activePattern.id],
                      description: `Intervención aplicando el patrón ${activePattern.name}: ${activePattern.shortDescription}`,
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm min-h-[44px]"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Crear hipótesis con este patrón</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
