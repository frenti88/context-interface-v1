import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, HelpCircle, FileCheck2 } from 'lucide-react';
import { EvidenceBadge } from '../components/ui/Badges';
import { useCases } from '../context/CasesContext';

export const EvidenceView: React.FC = () => {
  const { startNewCase } = useCases();
  const [testSource, setTestSource] = useState<string>('logs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Metodología de Validación
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Niveles de Evidencia
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Diseña con rigor sin paralizar la innovación. Documenta claramente qué sabes con certeza y qué debes probar antes de implementar.
        </p>
      </div>

      {/* Core Principle Callout */}
      <div className="p-5 sm:p-6 rounded-card bg-neutral-900 text-white space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Principio Fundacional</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold">
          El Nivel 3 no es negativo: es una invitación a investigar
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
          La herramienta no exige tener millones de eventos de analítica para empezar a diseñar. Si tu idea surge de una observación o corazonada, clasifícala como <strong>Nivel 3 (Hipótesis)</strong> y define qué prueba de usabilidad o prototipo necesitas para elevarla a Nivel 1.
        </p>
      </div>

      {/* The 3 Evidence Levels Breakdown */}
      <section aria-labelledby="levels-breakdown" className="space-y-4">
        <h2 id="levels-breakdown" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Clasificación de Evidencia del Playbook
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nivel 1 */}
          <div className="p-6 rounded-card border border-emerald-200 bg-emerald-50/30 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <EvidenceBadge type="OBSERVADA" />
                <span className="text-xs font-mono font-bold text-emerald-800">Alta certeza</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Evidencia observada
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Datos duros y reproducibles registrados directamente en el comportamiento real del usuario en producción.
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Fuentes típicas:
                </span>
                <ul className="text-xs text-neutral-700 space-y-1">
                  <li>• Logs de errores de API y base de datos</li>
                  <li>• Embudos de analítica cuantitativa (Mixpanel, GA4)</li>
                  <li>• Registros de contact center y tickets categorizados</li>
                  <li>• Tasa de rebote o abandono en pantallas específicas</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-200/60 text-xs text-emerald-900 font-medium">
              Vía libre para intervenciones de acompañamiento o adaptación directa con A/B testing.
            </div>
          </div>

          {/* Nivel 2 */}
          <div className="p-6 rounded-card border border-amber-200 bg-amber-50/30 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <EvidenceBadge type="INFERIDA" />
                <span className="text-xs font-mono font-bold text-amber-800">Certeza media</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Evidencia inferida
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Conocimiento cualitativo o heurístico previo que indica una alta probabilidad de que la señal exista.
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Fuentes típicas:
                </span>
                <ul className="text-xs text-neutral-700 space-y-1">
                  <li>• Entrevistas de usuarios y pruebas de usabilidad previas</li>
                  <li>• Conocimiento experto del equipo de negocio</li>
                  <li>• Heurísticas de Nielsen y benchmarks de la industria</li>
                  <li>• Observación en sesiones grabadas (Hotjar, FullStory)</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-200/60 text-xs text-amber-900 font-medium">
              Recomendado: Prototipo funcional o prueba cualitativa con 5 usuarios antes de desarrollar.
            </div>
          </div>

          {/* Nivel 3 */}
          <div className="p-6 rounded-card border border-indigo-200 bg-indigo-50/30 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <EvidenceBadge type="HIPOTÉTICA" />
                <span className="text-xs font-mono font-bold text-indigo-800">Por validar</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Hipótesis por validar
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                No existe todavía evidencia suficiente y se propone validar mediante prototipo o investigación.
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Fuentes típicas:
                </span>
                <ul className="text-xs text-neutral-700 space-y-1">
                  <li>• Intuición o idea de diseño no contrastada</li>
                  <li>• Nueva funcionalidad o producto sin usuarios activos</li>
                  <li>• Solicitudes ad-hoc de stakeholders sin datos</li>
                  <li>• Hipótesis exploratoria para un test de concepto</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-indigo-200/60 text-xs text-indigo-900 font-medium">
              Debe probarse con prototipo de baja o media fidelidad antes de escribir una sola línea de código.
            </div>
          </div>
        </div>
      </section>

      {/* Matrix: Evidencia vs Costo de Error */}
      <section aria-labelledby="matrix-title" className="bg-white rounded-card border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 id="matrix-title" className="text-lg font-bold text-neutral-900 tracking-tight">
            Matriz de Decisión: Evidencia vs. Costo de Error
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Utiliza esta matriz para decidir si tu equipo debe implementar de inmediato o pausar para investigar.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-700 font-bold">
                <th className="p-3">Nivel de Evidencia</th>
                <th className="p-3">Costo de Error Bajo</th>
                <th className="p-3">Costo de Error Medio</th>
                <th className="p-3">Costo de Error Alto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-800">
              <tr>
                <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/20">
                  Nivel 1 (Existente)
                </td>
                <td className="p-3">Implementar y monitorear</td>
                <td className="p-3">Adaptar con A/B test</td>
                <td className="p-3 font-medium text-amber-800">Acompañar con confirmación previa</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-800 bg-amber-50/20">
                  Nivel 2 (Aproximada)
                </td>
                <td className="p-3">Acompañar sin alterar flujo</td>
                <td className="p-3">Probar con prototipo cualitativo</td>
                <td className="p-3 font-medium text-rose-800">No adaptar hasta tener Nivel 1</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-indigo-800 bg-indigo-50/20">
                  Nivel 3 (Hipótesis)
                </td>
                <td className="p-3">Prototipo rápido de concepto</td>
                <td className="p-3">Prueba de usabilidad obligatoria</td>
                <td className="p-3 font-medium text-rose-900 bg-rose-50/30">Peligro: Prohibido adaptar sin datos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA to start a case */}
      <div className="p-6 rounded-card bg-neutral-100 border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-neutral-900 text-base">
            ¿Listo para clasificar tu oportunidad?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600">
            Abre el constructor de hipótesis y asigna el nivel de evidencia correspondiente a tu fuente.
          </p>
        </div>
        <button
          type="button"
          onClick={() => startNewCase()}
          className="px-5 py-2.5 rounded-btn bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-sm min-h-[44px] shrink-0"
        >
          Crear hipótesis con evidencia
        </button>
      </div>
    </div>
  );
};
