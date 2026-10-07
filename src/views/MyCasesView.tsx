import React, { useState } from 'react';
import { useCases } from '../context/CasesContext';
import { CaseStatus } from '../types';
import { 
  FolderGit2, 
  PlusCircle, 
  Search, 
  Copy, 
  Trash2, 
  Edit3, 
  Sparkles, 
  FileText, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { EvidenceBadge, StatusBadge, MaturityBadge } from '../components/ui/Badges';

export const MyCasesView: React.FC = () => {
  const { cases, startNewCase, editCase, duplicateCase, deleteCase, updateCaseStatus, navigateTo } = useCases();

  const [activeTab, setActiveTab] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs: { id: string; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: cases.length },
    { id: 'Borrador', label: 'Borradores', count: cases.filter((c) => c.status === 'Borrador').length },
    { id: 'En validación', label: 'En validación', count: cases.filter((c) => c.status === 'En validación').length },
    { id: 'Validado', label: 'Validados', count: cases.filter((c) => c.status === 'Validado').length },
    { id: 'Archivado', label: 'Archivados', count: cases.filter((c) => c.status === 'Archivado').length },
  ];

  const filteredCases = cases.filter((c) => {
    if (activeTab !== 'todos' && c.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.journey.toLowerCase().includes(q) ||
        c.signal.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Espacio de Trabajo Personal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Mis Casos & Hipótesis
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed mt-1">
            Gestiona, edita, comparte y da seguimiento al estado de validación de tus oportunidades de diseño contextual.
          </p>
        </div>

        <button
          type="button"
          onClick={() => startNewCase()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm min-h-[44px] shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Nuevo caso</span>
        </button>
      </div>

      {/* Tabs and Search Bar */}
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 border-b border-neutral-200 overflow-x-auto pb-1 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 min-h-[44px] ${
                  isActive
                    ? 'border-b-2 border-neutral-900 text-neutral-900 font-bold bg-neutral-100/50'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar entre tus casos por título, journey o señal..."
            className="w-full pl-10 pr-4 py-2.5 rounded-input border border-neutral-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Cases List / Grid */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-card border border-neutral-200 p-5 shadow-sm hover:border-neutral-900 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded truncate max-w-[140px]">
                    {c.journey}
                  </span>
                  <StatusBadge status={c.status} />
                </div>

                <h3
                  onClick={() => navigateTo('case-detail', c.id)}
                  className="font-bold text-base text-neutral-900 hover:text-black hover:underline cursor-pointer leading-snug line-clamp-2"
                >
                  {c.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2">
                  "{c.signal.description}"
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                  <EvidenceBadge level={c.signal.evidenceLevel} size="sm" />
                  <MaturityBadge level={c.maturityLevel} />
                </div>

                <div className="text-xs text-neutral-500 pt-1">
                  Patrones:{' '}
                  <span className="font-medium text-neutral-800">
                    {c.response.selectedPatterns.join(', ')}
                  </span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-400">
                  {new Date(c.updatedAt).toLocaleDateString('es-ES', { dateStyle: 'short' })}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => editCase(c.id)}
                    className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Editar caso en el wizard"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => duplicateCase(c.id)}
                    className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Duplicar caso"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCase(c.id)}
                    className="p-1.5 rounded text-neutral-400 hover:text-rose-700 hover:bg-rose-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Eliminar caso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('case-detail', c.id)}
                    className="ml-1 text-neutral-900 font-bold hover:underline p-1 text-xs"
                  >
                    Ver →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State That Teaches (Section 23 of prompt) */
        <div className="p-8 sm:p-12 text-center bg-white rounded-card border border-neutral-200 space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-700 mx-auto flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Aún no tienes casos con este filtro
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-md mx-auto leading-relaxed">
              No necesitas tener todos los datos para empezar. Crea una hipótesis y define qué necesitarías validar con prototipos o investigación.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => startNewCase()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-sm min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Crear primer caso</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
