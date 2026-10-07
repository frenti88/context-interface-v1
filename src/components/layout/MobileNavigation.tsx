import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Plus, 
  FolderGit2, 
  MoreHorizontal, 
  Layers, 
  TableProperties,
  SlidersHorizontal,
  X,
  RotateCcw
} from 'lucide-react';
import { ActiveView } from '../../types';

interface MobileNavigationProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onNewCase: () => void;
  onResetDemo: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeView,
  onNavigate,
  onNewCase,
  onResetDemo,
}) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const handleNav = (view: ActiveView) => {
    onNavigate(view);
    setMoreMenuOpen(false);
  };

  return (
    <>
      {/* Slide-over menu for "Más" */}
      {moreMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
            onClick={() => setMoreMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-t-2xl border-t border-neutral-200 p-6 z-10 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Herramientas & Secciones
              </span>
              <button
                type="button"
                onClick={() => setMoreMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleNav('patterns')}
                className="p-3.5 rounded-card border border-neutral-200 text-left hover:border-neutral-900 transition-colors flex items-center gap-2.5 min-h-[48px]"
              >
                <Layers className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-semibold text-neutral-900">Patrones</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('opportunity-matrix')}
                className="p-3.5 rounded-card border border-neutral-200 text-left hover:border-neutral-900 transition-colors flex items-center gap-2.5 min-h-[48px]"
              >
                <TableProperties className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-semibold text-neutral-900">Matriz Oportunidades</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('simulator')}
                className="p-3.5 rounded-card border border-neutral-200 text-left hover:border-neutral-900 transition-colors flex items-center gap-2.5 min-h-[48px]"
              >
                <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-semibold text-neutral-900">Simulador</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('playbook')}
                className="p-3.5 rounded-card border border-neutral-200 text-left hover:border-neutral-900 transition-colors flex items-center gap-2.5 min-h-[48px]"
              >
                <BookOpen className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-semibold text-neutral-900">Playbook</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onResetDemo();
                  setMoreMenuOpen(false);
                }}
                className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 py-2 min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar 5 casos de demo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Navigation Bar for Mobile */}
      <nav
        aria-label="Navegación móvil inferior"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 md:hidden flex items-center justify-around px-2 py-1 shadow-lg"
      >
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[56px] min-h-[48px] transition-colors ${
            activeView === 'home' ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Inicio</span>
        </button>

        {/* 2. Playbook */}
        <button
          type="button"
          onClick={() => onNavigate('playbook')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[56px] min-h-[48px] transition-colors ${
            activeView === 'playbook' ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Playbook</span>
        </button>

        {/* 3. Crear (Elevated Hierarchy CTA) */}
        <button
          type="button"
          onClick={onNewCase}
          className="flex flex-col items-center justify-center -mt-4 bg-neutral-900 text-white rounded-full w-12 h-12 shadow-lg hover:bg-neutral-800 transition-transform active:scale-95"
          aria-label="Crear nueva hipótesis contextual"
        >
          <Plus className="w-6 h-6 text-amber-300" />
        </button>

        {/* 4. Casos */}
        <button
          type="button"
          onClick={() => onNavigate('my-cases')}
          className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[56px] min-h-[48px] transition-colors ${
            activeView === 'my-cases' || activeView === 'cases'
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <FolderGit2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Casos</span>
        </button>

        {/* 5. Más */}
        <button
          type="button"
          onClick={() => setMoreMenuOpen(true)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[56px] min-h-[48px] transition-colors ${
            ['patterns', 'opportunity-matrix', 'simulator'].includes(activeView)
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Más</span>
        </button>
      </nav>
    </>
  );
};
