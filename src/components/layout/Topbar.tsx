import React from 'react';
import { Search, Plus, RotateCcw } from 'lucide-react';
import { ActiveView } from '../../types';

interface TopbarProps {
  activeView: ActiveView;
  onOpenSearch: () => void;
  onNewCase: () => void;
  onResetDemo: () => void;
}

const VIEW_TITLES: Record<ActiveView, { title: string; breadcrumb: string }> = {
  home: { title: 'Diseña interfaces contextuales', breadcrumb: 'Context Interface / Inicio' },
  wizard: { title: 'Constructor de Hipótesis', breadcrumb: 'Context Interface / Nueva hipótesis' },
  playbook: { title: 'Playbook Metodológico', breadcrumb: 'Context Interface / Playbook' },
  patterns: { title: 'Biblioteca de Patrones', breadcrumb: 'Context Interface / Patrones' },
  'opportunity-matrix': { title: 'Matriz de Oportunidades', breadcrumb: 'Context Interface / Matriz' },
  simulator: { title: 'Simulador de Escenarios', breadcrumb: 'Context Interface / Simulador' },
  cases: { title: 'Repositorio de Casos', breadcrumb: 'Context Interface / Ejemplos' },
  'my-cases': { title: 'Mis Casos & Hipótesis', breadcrumb: 'Context Interface / Mis Casos' },
  'case-detail': { title: 'Ficha de Hipótesis Contextual', breadcrumb: 'Context Interface / Tarjeta' },
};

export const Topbar: React.FC<TopbarProps> = ({
  activeView,
  onOpenSearch,
  onNewCase,
  onResetDemo,
}) => {
  const viewInfo = VIEW_TITLES[activeView] || { title: 'Playbook', breadcrumb: 'Context Interface' };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-[11px] font-medium text-neutral-400 truncate hidden sm:block">
            {viewInfo.breadcrumb}
          </span>
          <h1 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight truncate leading-tight">
            {viewInfo.title}
          </h1>
        </div>

        {/* Global Search trigger & Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-input border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-300 text-neutral-500 text-xs transition-colors min-h-[44px]"
            title="Buscar (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span className="hidden md:inline pr-2">Buscar patrones, conceptos o casos...</span>
            <span className="md:hidden">Buscar...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-[10px] font-mono font-semibold text-neutral-500">
              ⌘K
            </kbd>
          </button>

          {/* Quick New Case CTA */}
          {activeView !== 'wizard' && (
            <button
              type="button"
              onClick={onNewCase}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors shadow-sm min-h-[44px]"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Nueva Hipótesis</span>
            </button>
          )}

          {/* Reset Demo data helper */}
          <button
            type="button"
            onClick={onResetDemo}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Restaurar casos de demostración iniciales"
            aria-label="Restaurar casos de demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
