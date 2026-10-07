import React, { useState } from 'react';
import { 
  PlusCircle, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  SlidersHorizontal,
  TableProperties,
  X,
  Compass,
  Radio,
  HelpCircle,
  Scale,
  Palette,
  CheckCircle2
} from 'lucide-react';
import { useCases } from '../context/CasesContext';
import { EvidenceBadge, StatusBadge, DecisionGateBadge, DemoBadge } from '../components/ui/Badges';
import { ContextualCase, ActiveView } from '../types';

const MODEL_STAGES = [
  {
    step: 1,
    title: 'Momento',
    question: '¿En qué punto del journey?',
    desc: 'Identifica el journey, el paso específico y el job del usuario ("Quiero _____ para poder _____"). Sin entender el momento, cualquier personalización es mero azar.',
    icon: <Compass className="w-4 h-4 text-neutral-800" />,
  },
  {
    step: 2,
    title: 'Señal',
    question: '¿Qué observaste?',
    desc: 'Una señal es algo detectable: errores, repetición, abandono, tiempo, etc. Conectada a su fuente (logs, research, hipótesis) clasifica la evidencia como OBSERVADA [●], INFERIDA [△] o HIPOTÉTICA [?].',
    icon: <Radio className="w-4 h-4 text-emerald-700" />,
  },
  {
    step: 3,
    title: 'Interpretación',
    question: 'Contexto ≠ Certeza',
    desc: 'Infiere qué situación vive la persona y qué intenta resolver, asignando un nivel explícito de confianza (Baja, Media o Alta). No asumas certeza matemática donde hay incertidumbre humana.',
    icon: <HelpCircle className="w-4 h-4 text-amber-700" />,
  },
  {
    step: 4,
    title: 'Decisión',
    question: 'Decision Gate',
    desc: 'Cruza confianza, valor para el usuario y riesgo de error para definir la postura ética de diseño: ADAPTAR, SUGERIR, PREGUNTAR o NO ADAPTAR, evaluando la madurez de implementación.',
    icon: <Scale className="w-4 h-4 text-indigo-700" />,
  },
  {
    step: 5,
    title: 'Respuesta',
    question: 'Patrón + Fallback',
    desc: 'Selecciona hasta 3 patrones contextuales (Priorizar, Simplificar, Orientar...), describe el cambio Antes/Después y garantiza siempre una vía de escape para proteger la autonomía del usuario.',
    icon: <Palette className="w-4 h-4 text-purple-700" />,
  },
  {
    step: 6,
    title: 'Validación',
    question: '¿Cómo sabremos si ayudó?',
    desc: 'Define outcomes clave (comprensión, errores, tiempo, confianza), método de comprobación (usabilidad, prototipo, A/B) y métricas cuantitativas o cualitativas sin forzar números ficticios.',
    icon: <CheckCircle2 className="w-4 h-4 text-teal-700" />,
  },
];

interface EntryPoint {
  id: string;
  title: string;
  description: string;
  actionText: string;
  preset?: Partial<ContextualCase>;
  toView?: ActiveView;
}

const ENTRY_POINTS: EntryPoint[] = [
  {
    id: 'journey-problem',
    title: '1. Tengo un problema en el journey',
    description: 'Sabes en qué pantalla o trámite se traban las personas, pero aún no has formulado la hipótesis.',
    actionText: 'Definir momento y job',
    preset: { journey: 'Pago de obligaciones', moment: 'Validación de cuenta destino' },
  },
  {
    id: 'has-signal',
    title: '2. Tengo una señal observada',
    description: 'Detectaste un error, abandono o conducta repetida en telemetría, grabaciones o tickets de soporte.',
    actionText: 'Construir desde la señal',
    preset: {
      journey: 'Checkout y Pago',
      moment: 'Ingreso de datos',
      signal: {
        type: 'Error',
        description: 'El usuario corrigió tres veces el número de cuenta.',
        source: 'Analytics / logs',
        evidenceType: 'OBSERVADA',
      },
    },
  },
  {
    id: 'has-solution',
    title: '3. Tengo una idea de respuesta',
    description: 'Tienes una propuesta de componente o intervención y necesitas encuadrarla con Decision Gate y Fallback.',
    actionText: 'Diseñar respuesta contextual',
    preset: {
      response: {
        patterns: ['orientar'],
        description: 'Mostrar la entidad y titular detectado para resolver la duda inmediatamente.',
        fallback: 'Permitir ingresar cualquier número y continuar manualmente sin bloqueo.',
      },
    },
  },
  {
    id: 'prioritize-map',
    title: '4. Quiero priorizar oportunidades',
    description: 'Tienes varios momentos de un journey y quieres comparar valor vs. riesgo para decidir qué prototipar primero.',
    actionText: 'Abrir mapa del journey',
    toView: 'opportunity-matrix',
  },
];

export const HomeView: React.FC = () => {
  const { cases, navigateTo, startNewCase } = useCases();
  const [activeModelStage, setActiveModelStage] = useState<number | null>(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(() => {
    return localStorage.getItem('ci_dismiss_welcome') !== 'true';
  });

  const dismissWelcome = () => {
    setShowWelcomeBanner(false);
    localStorage.setItem('ci_dismiss_welcome', 'true');
  };

  const recentCases = cases.slice(0, 3);

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Welcome Banner (Dismissible) */}
      {showWelcomeBanner && (
        <section
          aria-label="Bienvenida al Framework"
          className="relative p-6 sm:p-7 rounded-card bg-neutral-900 text-white shadow-md border border-neutral-800 overflow-hidden"
        >
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
              Una herramienta que piensa contigo mientras diseñas
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              No necesitas tener todos los datos para empezar. Empieza con lo que sabes hoy, deja explícito qué estás suponiendo y genera fichas de hipótesis listas para prototipar.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => startNewCase()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-white text-neutral-900 font-semibold text-xs sm:text-sm hover:bg-neutral-100 transition-colors shadow-sm min-h-[44px]"
              >
                <span>Crear primera hipótesis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('case-detail', cases[0]?.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn border border-neutral-700 bg-neutral-800/80 text-white font-medium text-xs sm:text-sm hover:bg-neutral-700 transition-colors min-h-[44px]"
              >
                <span>Ver ficha de ejemplo</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Header / Workspace Dashboard */}
      <section aria-labelledby="home-header" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Context Interface
            </span>
            <h1
              id="home-header"
              className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight"
            >
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

        {/* 6-Step Model Progression */}
        <section aria-labelledby="model-title" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 id="model-title" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Metodología en 6 Pasos (Haz clic en cada paso para ver qué resuelve)
            </h2>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              Momento → Señal → Interpretación → Decisión → Respuesta → Validación
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
            {MODEL_STAGES.map((st, idx) => {
              const isSelected = activeModelStage === idx;
              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setActiveModelStage(isSelected ? null : idx)}
                  className={`text-left p-3.5 rounded-card border transition-all flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                        Paso {st.step} de 6
                      </span>
                      <span className={isSelected ? 'text-amber-300' : 'text-neutral-600'}>
                        {st.icon}
                      </span>
                    </div>
                    <div className="font-bold text-sm">{st.title}</div>
                  </div>
                  <div className={`text-[11px] mt-2 leading-tight ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {st.question}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Callout */}
          {activeModelStage !== null && (
            <div className="p-4 rounded-card bg-neutral-100 border border-neutral-300 text-xs text-neutral-800 flex items-start justify-between gap-4 animate-in fade-in">
              <div>
                <span className="font-bold text-neutral-900 uppercase tracking-wider block mb-1">
                  Paso {MODEL_STAGES[activeModelStage].step}: {MODEL_STAGES[activeModelStage].title} — {MODEL_STAGES[activeModelStage].question}
                </span>
                <p className="text-neutral-700 leading-relaxed text-sm">
                  {MODEL_STAGES[activeModelStage].desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModelStage(null)}
                className="text-neutral-400 hover:text-neutral-900 p-1 text-sm font-bold min-h-[36px] min-w-[36px]"
                aria-label="Cerrar detalle"
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
            No todos los proyectos comienzan con los mismos datos. Elige el punto de partida que mejor describa tu situación:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENTRY_POINTS.map((ep) => (
            <div
              key={ep.id}
              className="p-5 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 transition-all flex flex-col justify-between group shadow-sm min-h-[170px]"
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 mb-1.5 group-hover:text-black">
                  {ep.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
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
                  className="w-full text-left text-xs sm:text-sm font-semibold text-neutral-900 group-hover:underline flex items-center justify-between min-h-[44px]"
                >
                  <span>{ep.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Callout Banner: Matriz de Oportunidades & Simulador */}
      <section aria-label="Herramientas del framework" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div
          onClick={() => navigateTo('opportunity-matrix')}
          className="p-5 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 hover:shadow-sm transition-all cursor-pointer flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
            <TableProperties className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:underline">
                Mapa de Oportunidades del Journey
              </h3>
              <span className="text-xs text-neutral-500 group-hover:text-neutral-900">Abrir →</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Mapea los momentos de tu proceso, compara valor vs riesgo y prioriza qué hipótesis prototipar primero.
            </p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('simulator')}
          className="p-5 rounded-card border border-neutral-200 bg-white hover:border-neutral-900 hover:shadow-sm transition-all cursor-pointer flex items-start gap-4 group"
        >
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:underline">
                Simulador de Escenarios (Laboratorio)
              </h3>
              <span className="text-xs text-neutral-500 group-hover:text-neutral-900">Abrir →</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Calibra cómo respondería la interfaz ante 0 errores, 2 errores, usuario recurrente o abandono.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Cases & Principles */}
      <section aria-labelledby="recent-cases-title" className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Recent Cases Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="recent-cases-title" className="text-base sm:text-lg font-bold text-neutral-900">
                Casos Recientes & Fichas Listas
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Oportunidades estructuradas con el modelo simplificado de 6 pasos
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('my-cases')}
              className="text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900 underline min-h-[44px] flex items-center"
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
                    <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded">
                      {c.journey}
                    </span>
                    <StatusBadge status={c.status} />
                    {c.isDemo && (
                      <DemoBadge text={c.demoBadge || 'CASO DEMOSTRATIVO'} />
                    )}
                    <EvidenceBadge type={c.signal.evidenceType} size="sm" />
                    <DecisionGateBadge outcome={c.decision.intervention} size="sm" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 truncate">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-1">
                    Señal: "{c.signal.description}" → Respuesta: {c.response.patterns.join(' + ')}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs sm:text-sm font-semibold text-neutral-900 underline sm:no-underline sm:text-neutral-500 sm:group-hover:text-neutral-900">
                    Ver ficha →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Principios Rectores */}
        <aside aria-label="Principios rectores" className="space-y-4 bg-white rounded-card border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <ShieldCheck className="w-4 h-4 text-neutral-900" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Principios Fundamentales
            </h3>
          </div>

          <ul className="space-y-3 text-xs text-neutral-700 divide-y divide-neutral-100">
            <li className="pt-2">
              <span className="font-bold text-neutral-900 block mb-0.5">1. Contexto ≠ Certeza</span>
              Toda inferencia tiene margen de error. Cuanto mayor sea el riesgo de la tarea, más reversible debe ser la respuesta de la interfaz.
            </li>
            <li className="pt-2">
              <span className="font-bold text-neutral-900 block mb-0.5">2. Autonomía y Fallback siempre</span>
              La interfaz nunca toma decisiones irrevocables por el usuario. Siempre incluye un mecanismo explícito para continuar normalmente.
            </li>
            <li className="pt-2">
              <span className="font-bold text-neutral-900 block mb-0.5">3. Evidencia clara y honesta</span>
              Distingue lo que está observado en datos de lo que es una hipótesis por validar con prototipos. No necesitas certeza total para diseñar.
            </li>
          </ul>

          <div className="pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => navigateTo('playbook')}
              className="w-full text-center py-2.5 rounded-btn bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold transition-colors min-h-[44px]"
            >
              Leer principios en el Playbook
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};
