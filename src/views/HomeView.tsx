import React, { useState } from 'react';
import { 
  PlusCircle, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Lightbulb, 
  Activity, 
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useCases } from '../context/CasesContext';
import { EvidenceBadge, StatusBadge, MaturityBadge } from '../components/ui/Badges';

const MODEL_STAGES = [
  {
    key: 'signal',
    title: 'Señal',
    sub: '¿Qué está ocurriendo?',
    desc: 'Un dato observable del usuario, sistema o entorno (errores, tiempos, abandono, hábitos).',
  },
  {
    key: 'context',
    title: 'Contexto',
    sub: '¿Qué podría estar pasando?',
    desc: 'Inferencia provisional con nivel de confianza. Recuerda: Contexto ≠ Certeza.',
  },
  {
    key: 'intention',
    title: 'Intención',
    sub: '¿Qué busca conseguir?',
    desc: 'El Job To Be Done: Cuando [situación], quiero [necesidad] para poder [objetivo].',
  },
  {
    key: 'decision',
    title: 'Decisión',
    sub: '¿Intervenir o no?',
    desc: 'Tres posturas: No intervenir, Acompañar o Adaptar, sopesando el costo del error.',
  },
  {
    key: 'response',
    title: 'Respuesta',
    sub: '¿Cómo cambia la interfaz?',
    desc: 'Catálogo de patrones (Priorizar, Simplificar, Orientar...) y contraste Antes vs. Después.',
  },
  {
    key: 'evidence',
    title: 'Evidencia',
    sub: '¿Cómo sabremos si ayudó?',
    desc: 'Outcomes, métricas de éxito y método de validación (A/B test, usabilidad, analítica).',
  },
];

const ENTRY_POINTS = [
  {
    id: 'journey-problem',
    title: 'Tengo un problema del journey',
    description: 'Sabes en qué punto se traban los usuarios pero aún no has formulado la señal.',
    actionText: 'Definir señal desde journey',
    preset: { journey: 'Embudo de conversión' },
  },
  {
    id: 'has-signal',
    title: 'Tengo una señal',
    description: 'Detectaste un error, abandono o conducta repetida en logs o analítica.',
    actionText: 'Construir desde la señal',
    preset: { signal: { type: 'Error' as const, description: '', source: 'Logs' as const, evidenceLevel: 'nivel-1' as const } },
  },
  {
    id: 'has-hypothesis',
    title: 'Tengo una hipótesis',
    description: 'Tienes una idea de lo que el usuario necesita resolver y deseas estructurarla.',
    actionText: 'Estructurar intención',
    preset: { intention: { when: '', want: '', inOrderTo: '', jobToBeDone: '' } },
  },
  {
    id: 'has-interface',
    title: 'Tengo una interfaz',
    description: 'Tienes una pantalla actual y quieres evaluar qué patrón contextual le conviene.',
    actionText: 'Comparar Antes / Después',
    preset: { response: { selectedPatterns: ['priorizar' as const], description: '', currentInterface: '', proposedInterface: '' } },
  },
  {
    id: 'want-to-measure',
    title: 'Quiero medir una solución',
    description: 'Ya tienes un diseño propuesto y necesitas definir el plan de validación.',
    actionText: 'Explorar métricas y validación',
    toView: 'measurement' as const,
  },
];

export const HomeView: React.FC = () => {
  const { cases, navigateTo, startNewCase } = useCases();
  const [activeModelStage, setActiveModelStage] = useState<number | null>(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(() => {
    return localStorage.getItem('cp_dismiss_welcome') !== 'true';
  });

  const dismissWelcome = () => {
    setShowWelcomeBanner(false);
    localStorage.setItem('cp_dismiss_welcome', 'true');
  };

  const recentCases = cases.slice(0, 3);

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* First Time Experience / Welcome Card (Dismissible) */}
      {showWelcomeBanner && (
        <section aria-label="Bienvenida al Playbook" className="relative p-6 sm:p-7 rounded-card bg-neutral-900 text-white shadow-md border border-neutral-800 overflow-hidden">
          <button
            type="button"
            onClick={dismissWelcome}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Descartar mensaje de bienvenida"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Metodología de diseño contextual</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Construye tu primera hipótesis contextual
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              No necesitas tener todos los datos para empezar. Empieza con lo que sabes y deja explícito lo que todavía necesitas validar.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => startNewCase()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-white text-neutral-900 font-semibold text-xs sm:text-sm hover:bg-neutral-100 transition-colors shadow-sm min-h-[44px]"
              >
                <span>Empezar ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('case-detail', cases[0]?.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn border border-neutral-700 bg-neutral-800/80 text-white font-medium text-xs sm:text-sm hover:bg-neutral-700 transition-colors min-h-[44px]"
              >
                <span>Ver un ejemplo real</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Header / Tool Workspace Dashboard */}
      <section aria-labelledby="home-header" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Contextual Experience Playbook
            </span>
            <h1 id="home-header" className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Diseña interfaces que respondan al contexto.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Convierte señales del usuario en decisiones de interfaz que puedan explicarse, probarse y medirse.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => startNewCase()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-btn bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold transition-colors shadow-sm min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Crear hipótesis contextual</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('playbook')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-btn border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-medium transition-colors min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-neutral-500" />
              <span>Explorar el playbook</span>
            </button>
          </div>
        </div>

        {/* The 6-Stage Core Interactive Model Breakdown */}
        <section aria-labelledby="model-title" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 id="model-title" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              El Modelo Contextual en 6 Eslabones (Haz clic para explorar cada etapa)
            </h2>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              Señal → Contexto → Intención → Decisión → Respuesta → Evidencia
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
            {MODEL_STAGES.map((st, idx) => {
              const isSelected = activeModelStage === idx;
              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setActiveModelStage(isSelected ? null : idx)}
                  className={`text-left p-3.5 rounded-card border transition-all flex flex-col justify-between min-h-[100px] ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                        Paso {idx + 1}
                      </span>
                      {idx < 5 && (
                        <span className={`text-xs ${isSelected ? 'text-neutral-500' : 'text-neutral-300'} hidden md:inline`}>
                          →
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm">{st.title}</div>
                  </div>
                  <div className={`text-[11px] mt-2 leading-tight ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {st.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive detail callout when a model stage is clicked */}
          {activeModelStage !== null && (
            <div className="p-4 rounded-card bg-neutral-100 border border-neutral-300 text-xs text-neutral-800 flex items-start justify-between gap-4 animate-in fade-in">
              <div>
                <span className="font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                  Paso {activeModelStage + 1}: {MODEL_STAGES[activeModelStage].title} — {MODEL_STAGES[activeModelStage].sub}
                </span>
                <p className="text-neutral-700 leading-relaxed text-sm">
                  {MODEL_STAGES[activeModelStage].desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModelStage(null)}
                className="text-neutral-400 hover:text-neutral-900 p-1 text-sm font-bold min-h-[36px] min-w-[36px]"
              >
                ✕
              </button>
            </div>
          )}
        </section>
      </section>

      {/* "Empieza desde donde estés" Entry Points */}
      <section aria-labelledby="entry-points-title" className="space-y-4 pt-4">
        <div>
          <h2 id="entry-points-title" className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
            Empieza desde donde estés
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            No todos los proyectos comienzan con los mismos datos. Elige el punto de entrada que mejor describa tu situación:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ENTRY_POINTS.map((ep) => (
            <div
              key={ep.id}
              className="p-4 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <h3 className="font-bold text-sm text-neutral-900 mb-1.5 group-hover:text-black">
                  {ep.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {ep.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    if (ep.toView) {
                      navigateTo(ep.toView);
                    } else if (ep.preset) {
                      startNewCase(ep.preset);
                    }
                  }}
                  className="w-full text-left text-xs font-semibold text-neutral-900 group-hover:underline flex items-center justify-between min-h-[44px]"
                >
                  <span>{ep.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Summary Grid: Recent Cases & Playbook Highlights */}
      <section aria-labelledby="recent-cases-title" className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Recent Cases Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="recent-cases-title" className="text-base sm:text-lg font-bold text-neutral-900">
                Casos Recientes & Demostraciones
              </h2>
              <p className="text-xs text-neutral-500">
                Hipótesis preparadas para explorar el framework en acción
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('my-cases')}
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 underline min-h-[44px] flex items-center"
            >
              Ver todos ({cases.length})
            </button>
          </div>

          <div className="space-y-3">
            {recentCases.map((c) => (
              <div
                key={c.id}
                onClick={() => navigateTo('case-detail', c.id)}
                className="p-4 sm:p-5 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded">
                      {c.journey}
                    </span>
                    <StatusBadge status={c.status} />
                    <EvidenceBadge level={c.signal.evidenceLevel} size="sm" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 truncate">
                    {c.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-1">
                    Señal: "{c.signal.description}" → Respuesta: {c.response.selectedPatterns.join(' + ')}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <MaturityBadge level={c.maturityLevel} />
                  <span className="text-xs font-semibold text-neutral-900 underline sm:no-underline sm:text-neutral-400 sm:group-hover:text-neutral-900">
                    Abrir →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info Box: Contextual Principles Quick Reference */}
        <aside aria-label="Principios rectores" className="space-y-4 bg-white rounded-card border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <ShieldCheck className="w-4 h-4 text-neutral-900" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Principios Rectores
            </h3>
          </div>

          <ul className="space-y-3 text-xs text-neutral-700 divide-y divide-neutral-100">
            <li className="pt-2">
              <span className="font-bold text-neutral-900 block mb-0.5">Contexto ≠ Certeza</span>
              Toda inferencia tiene margen de error. Cuanto más incierta sea la señal, más reversible debe ser la respuesta.
            </li>
            <li className="pt-2">
              <span className="font-bold text-neutral-900 block mb-0.5">Autonomía del usuario</span>
              La interfaz no toma decisiones irrevocables en nombre del usuario. Propone, sugiere y acompaña.
            </li>
            <li className="pt-2">
              <span className="font-bold text-neutral-900 block mb-0.5">Mayor madurez ≠ Mejor UX</span>
              No todas las pantallas requieren Nivel 4 (Predictivo). Una simple regla de sesión (Nivel 1) suele ser suficiente.
            </li>
          </ul>

          <div className="pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => navigateTo('playbook')}
              className="w-full text-center py-2.5 rounded-btn bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold transition-colors min-h-[44px]"
            >
              Leer principios completos en el Playbook
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};
