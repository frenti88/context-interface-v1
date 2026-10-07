import React from 'react';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  BarChart2, 
  FolderGit2, 
  Scale, 
  PlusCircle, 
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { ActiveView } from '../../types';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  casesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  casesCount,
}) => {
  const navItems: { view: ActiveView; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { view: 'home', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { view: 'playbook', label: 'Playbook', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'patterns', label: 'Patrones', icon: <Layers className="w-4 h-4" /> },
    { view: 'evidence', label: 'Evidencia', icon: <ShieldCheck className="w-4 h-4" /> },
    { view: 'maturity', label: 'Madurez Contextual', icon: <Scale className="w-4 h-4" /> },
    { view: 'cases', label: 'Ejemplos de Casos', icon: <Lightbulb className="w-4 h-4" /> },
    { view: 'measurement', label: 'Medición', icon: <BarChart2 className="w-4 h-4" /> },
    { view: 'my-cases', label: 'Mis Casos', icon: <FolderGit2 className="w-4 h-4" />, badge: casesCount },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-neutral-200 transition-all duration-200 select-none z-20 sticky top-0 h-screen ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Brand logo header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-100">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
              CP
            </div>
            <div className="truncate">
              <span className="font-bold text-sm tracking-tight text-neutral-900 block truncate leading-tight">
                Contextual Playbook
              </span>
              <span className="text-[11px] text-neutral-400 block truncate">
                Framework de Interfaces
              </span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
            CP
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded hover:bg-neutral-100 transition-colors"
          title={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Creation CTA in Sidebar */}
      <div className="p-3">
        <button
          type="button"
          onClick={() => onNavigate('wizard')}
          className={`w-full flex items-center justify-center gap-2 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 transition-colors shadow-sm min-h-[44px] ${
            collapsed ? 'px-2' : 'px-4'
          }`}
          title="Crear nueva hipótesis contextual"
        >
          <PlusCircle className="w-4 h-4 text-amber-300 shrink-0" />
          {!collapsed && <span>Crear Hipótesis</span>}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto">
        <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 ${collapsed ? 'hidden' : 'block'}`}>
          Navegación
        </div>

        {navItems.map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => onNavigate(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-colors min-h-[40px] ${
                isActive
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              } ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`shrink-0 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                {item.icon}
              </span>

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-neutral-200 text-neutral-700">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-card bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5 font-bold text-neutral-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Metodología activa</span>
          </div>
          <p className="text-[11px] leading-tight text-neutral-500">
            Señal → Contexto → Intención → Decisión → Respuesta → Evidencia.
          </p>
        </div>
      )}
    </aside>
  );
};
