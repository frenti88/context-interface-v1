import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Download, 
  Edit3, 
  Sparkles, 
  Check, 
  ExternalLink, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  FileText,
  Target,
  Activity,
  PlusCircle,
  HelpCircle,
  CornerDownRight,
  ShieldCheck
} from 'lucide-react';
import { ContextualCase, CaseStatus } from '../../types';
import { 
  EvidenceBadge, 
  DecisionGateBadge, 
  ConfidenceBadge, 
  ValueBadge, 
  RiskBadge, 
  StatusBadge 
} from '../ui/Badges';
import { BeforeAfterView } from './BeforeAfterView';
import { Modal } from '../ui/Modal';
import { PATTERNS_DATA } from '../../data/patterns';

interface HypothesisCardProps {
  caseData: ContextualCase;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onStatusChange?: (newStatus: CaseStatus) => void;
  onCreateRelated?: () => void;
  compact?: boolean;
}

export const HypothesisCard: React.FC<HypothesisCardProps> = ({
  caseData,
  onEdit,
  onDuplicate,
  onStatusChange,
  onCreateRelated,
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isProtoModalOpen, setIsProtoModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleCopyMarkdown = () => {
    const md = `### FICHA DE HIPÓTESIS CONTEXTUAL: ${caseData.title}
**Journey:** ${caseData.journey} | **Momento:** ${caseData.moment} | **Estado:** ${caseData.status}

- **Job:** ${caseData.job}
- **Señal:** ${caseData.signal.description} (Tipo: ${caseData.signal.type}, Fuente: ${caseData.signal.source})
- **Evidencia:** ${caseData.signal.evidenceType}
- **Contexto:** ${caseData.interpretation.context} (Confianza: ${caseData.interpretation.confidence})
- **Intención:** ${caseData.interpretation.intention}
- **Decisión Gate:** ${caseData.decision.intervention} (Valor: ${caseData.decision.userValue}, Riesgo: ${caseData.decision.errorRisk}, Impacto: ${caseData.decision.possibleImpact})
- **Patrones:** ${caseData.response.patterns.join(' + ')}
- **Respuesta:** ${caseData.response.description}
- **Fallback:** ${caseData.response.fallback}
- **Métrica:** ${caseData.validation.primaryMetric}
- **Validación:** ${caseData.validation.method} (Outcome: ${caseData.validation.outcome})

*Contextual Experience Playbook*`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(caseData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hipotesis-${caseData.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const matchedPatterns = PATTERNS_DATA.filter((p) =>
    caseData.response.patterns.includes(p.id)
  );

  return (
    <article className="bg-white rounded-card border border-neutral-300 shadow-sm overflow-hidden transition-all text-[#0F172A]">
      {/* Header bar: Clean & Editorial */}
      <div className="p-5 sm:p-7 border-b border-neutral-200 bg-[#FCFCFD]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
              {caseData.journey} • {caseData.moment}
            </span>
            <StatusBadge status={caseData.status} />
          </div>

          <div className="flex items-center gap-2">
            <EvidenceBadge type={caseData.signal.evidenceType} size="sm" />
            <DecisionGateBadge outcome={caseData.decision.intervention} size="sm" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
          {caseData.title}
        </h1>

        {/* Job sentence */}
        <div className="mt-2.5 text-sm text-neutral-700 font-serif italic bg-white p-3 rounded border border-neutral-200/80">
          "{caseData.job}"
        </div>
      </div>

      {/* Main Matrix Grid (Scannable, clean fields, no excessive nesting) */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* 1. SEÑAL & EVIDENCIA */}
        <section aria-labelledby={`signal-${caseData.id}`} className="space-y-1.5 border-l-2 border-neutral-900 pl-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                1. SEÑAL ({caseData.signal.type})
              </span>
              <span className="text-xs text-neutral-400">• Fuente: {caseData.signal.source}</span>
            </div>
            <EvidenceBadge type={caseData.signal.evidenceType} size="sm" />
          </div>
          <p className="text-base font-semibold text-neutral-900 leading-relaxed">
            "{caseData.signal.description}"
          </p>
        </section>

        {/* 2. INTERPRETACIÓN: CONTEXTO + INTENCIÓN + CONFIANZA */}
        <section aria-labelledby={`interp-${caseData.id}`} className="space-y-2 border-l-2 border-neutral-400 pl-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              2. INTERPRETACIÓN (Contexto ≠ Certeza)
            </span>
            <ConfidenceBadge level={caseData.interpretation.confidence} />
          </div>
          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            <strong>Contexto:</strong> {caseData.interpretation.context}
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            <strong>Intención inferida:</strong> {caseData.interpretation.intention}
          </p>
        </section>

        {/* 3. DECISIÓN (DECISION GATE) */}
        <section aria-labelledby={`decision-${caseData.id}`} className="space-y-2.5 border-l-2 border-neutral-900 pl-4 bg-neutral-50/60 -mx-2 px-4 py-3 rounded-r-lg">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              3. DECISIÓN GATE
            </span>
            <div className="flex items-center gap-2">
              <ValueBadge level={caseData.decision.userValue} />
              <RiskBadge level={caseData.decision.errorRisk} />
              <DecisionGateBadge outcome={caseData.decision.intervention} size="md" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
            {caseData.decision.rationale || `Intervención clasificada como "${caseData.decision.intervention}" sopesando riesgo ${caseData.decision.errorRisk.toLowerCase()} y valor ${caseData.decision.userValue.toLowerCase()}.`}
          </p>
          <div className="text-xs text-neutral-500 flex items-center gap-1.5 pt-0.5">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
            <span>Impacto ante falso positivo: <strong>{caseData.decision.possibleImpact}</strong></span>
          </div>
        </section>

        {/* 4. RESPUESTA & FALLBACK */}
        <section aria-labelledby={`resp-${caseData.id}`} className="space-y-3 border-l-2 border-neutral-900 pl-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              4. RESPUESTA DE INTERFAZ
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {matchedPatterns.map((pat) => (
                <span
                  key={pat.id}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-900 text-white font-medium"
                >
                  {pat.name}
                </span>
              ))}
            </div>
          </div>

          <p className="text-base text-neutral-900 font-medium leading-relaxed">
            {caseData.response.description}
          </p>

          {/* Fallback component */}
          <div className="p-3 rounded-lg bg-neutral-100/80 border border-neutral-200 text-xs text-neutral-800 flex items-start gap-2">
            <CornerDownRight className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900">Vía de escape (Fallback): </strong>
              <span>{caseData.response.fallback}</span>
            </div>
          </div>

          {/* Optional Before & After Comparison */}
          {(caseData.response.before || caseData.response.after) && (
            <BeforeAfterView
              before={caseData.response.before}
              after={caseData.response.after}
            />
          )}
        </section>

        {/* 5. VALIDACIÓN & MÉTRICA */}
        <section aria-labelledby={`val-${caseData.id}`} className="space-y-2 border-l-2 border-emerald-600 pl-4 bg-emerald-50/30 -mx-2 px-4 py-3 rounded-r-lg">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              5. VALIDACIÓN & MÉTRICAS
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
              {caseData.validation.method}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm mt-1">
            <div>
              <span className="text-neutral-500 block text-xs">Métrica u objetivo principal</span>
              <span className="font-semibold text-neutral-900">{caseData.validation.primaryMetric}</span>
            </div>
            {caseData.validation.secondaryMetric && (
              <div>
                <span className="text-neutral-500 block text-xs">Métrica secundaria</span>
                <span className="text-neutral-700">{caseData.validation.secondaryMetric}</span>
              </div>
            )}
          </div>

          {caseData.validation.expectedResult && (
            <div className="mt-2 text-xs text-neutral-800 pt-2 border-t border-emerald-200/50">
              <strong className="text-emerald-900">Resultado esperado: </strong>
              "{caseData.validation.expectedResult}"
            </div>
          )}
        </section>
      </div>

      {/* Action Footer Bar */}
      <footer className="px-5 sm:px-7 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsProtoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Crear prototipo</span>
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Editar</span>
            </button>
          )}

          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Duplicar</span>
            </button>
          )}

          {onCreateRelated && (
            <button
              type="button"
              onClick={onCreateRelated}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
              title="Crear caso relacionado en el mismo journey"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden md:inline">Caso relacionado</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onStatusChange && (
            <select
              value={caseData.status}
              aria-label="Cambiar estado de la hipótesis"
              onChange={(e) => onStatusChange(e.target.value as CaseStatus)}
              className="text-xs font-semibold rounded-btn border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[44px]"
            >
              <option value="Borrador">Borrador</option>
              <option value="Lista para prototipar">Lista para prototipar</option>
              <option value="En validación">En validación</option>
              <option value="Validada">Validada</option>
              <option value="Descartada">Descartada</option>
            </select>
          )}

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            title="Copiar resumen en Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Compartir'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            title="Exportar caso"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </footer>

      {/* Modal Guía de Prototipado */}
      <Modal
        isOpen={isProtoModalOpen}
        onClose={() => setIsProtoModalOpen(false)}
        title="Plan de Prototipado & Validación"
        description={`Hipótesis: "${caseData.title}"`}
        maxWidth="lg"
      >
        <div className="space-y-4 text-sm text-neutral-700">
          <div className="p-3.5 rounded-lg bg-neutral-100 border border-neutral-200 text-xs">
            <strong>Método: {caseData.validation.method}</strong> • Decisión: {caseData.decision.intervention}
          </div>

          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <span>Recrea el momento: <strong>{caseData.moment}</strong> en tu herramienta de prototipado.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <span>Dispara la señal: <em>"{caseData.signal.description}"</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <span>Muestra la respuesta con los patrones {matchedPatterns.map((p) => p.name).join(' + ')}.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <span>Verifica el fallback: <em>"{caseData.response.fallback}"</em>.</span>
            </li>
          </ul>

          <div className="pt-3 border-t border-neutral-200 flex justify-end">
            <button
              type="button"
              onClick={() => setIsProtoModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-btn bg-neutral-900 text-white"
            >
              Listo para diseñar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Exportar */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Exportar Ficha de Hipótesis"
        maxWidth="sm"
      >
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              handleDownloadJSON();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-xs sm:text-sm">Descargar como JSON</div>
              <div className="text-[11px] text-neutral-500">Datos estructurados compatibles</div>
            </div>
            <Download className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              handleCopyMarkdown();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-xs sm:text-sm">Copiar en Markdown</div>
              <div className="text-[11px] text-neutral-500">Para Notion, Figma o Jira</div>
            </div>
            <Copy className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              window.print();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-xs sm:text-sm">Imprimir o Guardar PDF</div>
              <div className="text-[11px] text-neutral-500">Formato de una sola página</div>
            </div>
            <FileText className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </Modal>
    </article>
  );
};
