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
  Compass, 
  ShieldAlert, 
  Layers, 
  FileText,
  Target,
  Activity,
  Workflow
} from 'lucide-react';
import { ContextualCase, CaseStatus } from '../../types';
import { EvidenceBadge, ConfidenceBadge, RiskBadge, MaturityBadge, StatusBadge } from '../ui/Badges';
import { BeforeAfterView } from './BeforeAfterView';
import { Modal } from '../ui/Modal';
import { PATTERNS_DATA } from '../../data/patterns';

interface HypothesisCardProps {
  caseData: ContextualCase;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onStatusChange?: (newStatus: CaseStatus) => void;
  compact?: boolean;
}

export const HypothesisCard: React.FC<HypothesisCardProps> = ({
  caseData,
  onEdit,
  onDuplicate,
  onStatusChange,
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isProtoModalOpen, setIsProtoModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleCopyMarkdown = () => {
    const md = `### Contextual Hypothesis Card: ${caseData.title}
**Journey:** ${caseData.journey} | **Estado:** ${caseData.status} | **Madurez:** M${caseData.maturityLevel}

1. **SEÑAL:** ${caseData.signal.description} (Tipo: ${caseData.signal.type}, Fuente: ${caseData.signal.source}, Evidencia: ${caseData.signal.evidenceLevel})
2. **CONTEXTO:** ${caseData.context.interpretation} (Confianza: ${caseData.context.confidence})
3. **INTENCIÓN:** ${caseData.intention.jobToBeDone || `Cuando ${caseData.intention.when} quiero ${caseData.intention.want} para poder ${caseData.intention.inOrderTo}`}
4. **DECISIÓN:** ${caseData.decision.intervention} (Costo de error: ${caseData.decision.errorCost}, Riesgo: ${caseData.decision.possibleMisinterpretation})
5. **RESPUESTA:** Patrones [${caseData.response.selectedPatterns.join(', ')}] - ${caseData.response.description}
6. **EVIDENCIA:** Outcome: ${caseData.evidence.outcome} | Métrica: ${caseData.evidence.primaryMetric} | Validación: ${caseData.evidence.validationMethod}
*Generado con Contextual Experience Playbook*`;

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
    caseData.response.selectedPatterns.includes(p.id)
  );

  return (
    <article className="bg-white rounded-card border border-neutral-200/90 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Header bar */}
      <div className="p-5 sm:p-6 border-b border-neutral-100 bg-[#FCFCFD]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
              {caseData.journey || 'Journey General'}
            </span>
            <StatusBadge status={caseData.status} />
            <EvidenceBadge level={caseData.signal.evidenceLevel} size="sm" />
          </div>

          <div className="flex items-center gap-2">
            <MaturityBadge level={caseData.maturityLevel} />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
          {caseData.title}
        </h2>

        {/* Badges summary row */}
        <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-3 border-t border-neutral-100 text-xs">
          <span className="text-neutral-500">Parámetros clave:</span>
          <ConfidenceBadge confidence={caseData.context.confidence} />
          <RiskBadge cost={caseData.decision.errorCost} />
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
            Decisión: {caseData.decision.intervention}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
            Validación: {caseData.evidence.validationMethod}
          </span>
        </div>
      </div>

      {/* 6 Framework Stages Grid */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Stage 1: SEÑAL */}
        <section aria-labelledby={`signal-${caseData.id}`} className="relative pl-4 sm:pl-5 border-l-2 border-neutral-300">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <h3 id={`signal-${caseData.id}`} className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                SEÑAL • {caseData.signal.type}
              </h3>
            </div>
            <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
              Fuente: {caseData.signal.source}
            </span>
          </div>
          <p className="text-base font-medium text-neutral-900 leading-relaxed">
            "{caseData.signal.description}"
          </p>
        </section>

        {/* Stage 2: CONTEXTO */}
        <section aria-labelledby={`context-${caseData.id}`} className="relative pl-4 sm:pl-5 border-l-2 border-neutral-300">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <h3 id={`context-${caseData.id}`} className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                CONTEXTO • INFERENCIA
              </h3>
            </div>
            <span className="text-xs text-neutral-500 italic">
              Contexto ≠ certeza
            </span>
          </div>
          <p className="text-base text-neutral-800 leading-relaxed">
            {caseData.context.interpretation}
          </p>
          {caseData.context.helperTag && (
            <span className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
              Situación: {caseData.context.helperTag}
            </span>
          )}
        </section>

        {/* Stage 3: INTENCIÓN */}
        <section aria-labelledby={`intent-${caseData.id}`} className="relative pl-4 sm:pl-5 border-l-2 border-neutral-300">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <h3 id={`intent-${caseData.id}`} className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              INTENCIÓN • JOB TO BE DONE
            </h3>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3.5 border border-neutral-200/80 text-sm sm:text-base text-neutral-900 font-serif italic leading-relaxed">
            "{caseData.intention.jobToBeDone || `Cuando ${caseData.intention.when}, quiero ${caseData.intention.want} para poder ${caseData.intention.inOrderTo}.`}"
          </div>
        </section>

        {/* Stage 4: DECISIÓN */}
        <section aria-labelledby={`decision-${caseData.id}`} className="relative pl-4 sm:pl-5 border-l-2 border-neutral-300">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <h3 id={`decision-${caseData.id}`} className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                DECISIÓN • INTERVENCIÓN
              </h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-900 text-white">
              {caseData.decision.intervention}
            </span>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {caseData.decision.rationale || `Intervención de tipo "${caseData.decision.intervention}" seleccionada considerando un costo de error ${caseData.decision.errorCost.toLowerCase()}.`}
          </p>
          <div className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
            <span>Riesgo ante mala interpretación: <strong>{caseData.decision.possibleMisinterpretation}</strong></span>
          </div>
        </section>

        {/* Stage 5: RESPUESTA */}
        <section aria-labelledby={`response-${caseData.id}`} className="relative pl-4 sm:pl-5 border-l-2 border-neutral-900">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                5
              </span>
              <h3 id={`response-${caseData.id}`} className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                RESPUESTA DE INTERFAZ
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              {matchedPatterns.map((pat) => (
                <span
                  key={pat.id}
                  className="text-xs px-2 py-0.5 rounded-full bg-neutral-900 text-white font-medium"
                >
                  {pat.name}
                </span>
              ))}
            </div>
          </div>
          <p className="text-base text-neutral-900 font-medium leading-relaxed mt-2">
            {caseData.response.description}
          </p>

          {/* Before & After comparison */}
          {(caseData.response.currentInterface || caseData.response.proposedInterface) && (
            <BeforeAfterView
              before={caseData.response.currentInterface}
              after={caseData.response.proposedInterface}
            />
          )}
        </section>

        {/* Stage 6: EVIDENCIA & VALIDACIÓN */}
        <section aria-labelledby={`evidence-${caseData.id}`} className="relative pl-4 sm:pl-5 border-l-2 border-emerald-500 bg-emerald-50/20 -mx-2 px-4 py-3 rounded-r-lg">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                6
              </span>
              <h3 id={`evidence-${caseData.id}`} className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                EVIDENCIA • VALIDACIÓN Y MÉTRICAS
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Outcome: {caseData.evidence.outcome}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-2">
            <div>
              <span className="text-xs text-neutral-500 block">Métrica Principal</span>
              <span className="font-semibold text-neutral-900">{caseData.evidence.primaryMetric}</span>
            </div>
            {caseData.evidence.secondaryMetric && (
              <div>
                <span className="text-xs text-neutral-500 block">Métrica Secundaria</span>
                <span className="text-neutral-700">{caseData.evidence.secondaryMetric}</span>
              </div>
            )}
          </div>

          <div className="mt-3 text-sm text-neutral-800 bg-white/80 p-3 rounded border border-emerald-200/60">
            <span className="text-xs font-semibold text-emerald-800 block mb-0.5 uppercase tracking-wider">
              Hipótesis falsable esperada:
            </span>
            "{caseData.evidence.expectedResult}"
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsProtoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Crear prototipo</span>
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Editar</span>
            </button>
          )}

          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Duplicar</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onStatusChange && (
            <select
              value={caseData.status}
              aria-label="Cambiar estado del caso"
              onChange={(e) => onStatusChange(e.target.value as CaseStatus)}
              className="text-xs font-medium rounded-btn border border-neutral-300 bg-white px-2.5 py-2 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[44px]"
            >
              <option value="Borrador">Borrador</option>
              <option value="En validación">En validación</option>
              <option value="Validado">Validado</option>
              <option value="Archivado">Archivado</option>
            </select>
          )}

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            title="Copiar resumen en Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Compartir'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[44px]"
            title="Exportar caso"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Modal Crear Prototipo */}
      <Modal
        isOpen={isProtoModalOpen}
        onClose={() => setIsProtoModalOpen(false)}
        title="Guía de Prototipado y Validación Rápida"
        description={`Plan de acción para probar la hipótesis: "${caseData.title}"`}
        maxWidth="xl"
      >
        <div className="space-y-4 text-sm text-neutral-700">
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-1">
              Método sugerido: {caseData.evidence.validationMethod}
            </h4>
            <p className="text-xs text-neutral-600">
              Para validar {caseData.evidence.outcome.toLowerCase()} frente a la métrica "{caseData.evidence.primaryMetric}".
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider">
              Checklist para el prototipo
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Prototipar la pantalla en estado inicial (Antes) y el detonante de la señal (ej. fallo o tiempo).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Construir la respuesta contextual ({matchedPatterns.map((p) => p.name).join(' + ')}).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Incluir siempre una vía de escape reversible ("No gracias" / cerrar sugerencia).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-neutral-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Preparar guion de test con 5 usuarios recreando el escenario de la señal.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsProtoModalOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Exportar */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Exportar Hipótesis Contextual"
        description="Elige el formato en el que deseas documentar o compartir este caso."
        maxWidth="md"
      >
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              handleDownloadJSON();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-sm">Archivo JSON estructurado</div>
              <div className="text-xs text-neutral-500">Compatible con el Playbook para reimportar o integrar en APIs</div>
            </div>
            <Download className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              handleCopyMarkdown();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-sm">Copiar en Markdown</div>
              <div className="text-xs text-neutral-500">Ideal para Notion, GitHub, Jira o documentación en Slite</div>
            </div>
            <Copy className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              window.print();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-sm">Imprimir o Guardar en PDF</div>
              <div className="text-xs text-neutral-500">Formato de una sola página para revisiones de diseño o sprint reviews</div>
            </div>
            <FileText className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </Modal>
    </article>
  );
};
