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
  ShieldCheck,
  Server,
  Database,
  Calendar,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock
} from 'lucide-react';
import { ContextualCase, CaseStatus, ValidationRecord, ValidationFinding } from '../../types';
import { 
  EvidenceBadge, 
  DecisionGateBadge, 
  ConfidenceBadge, 
  ValueBadge, 
  RiskBadge, 
  StatusBadge,
  DemoBadge 
} from '../ui/Badges';
import { BeforeAfterView } from './BeforeAfterView';
import { Modal } from '../ui/Modal';
import { PATTERNS_DATA } from '../../data/patterns';

interface HypothesisCardProps {
  caseData: ContextualCase;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onStatusChange?: (newStatus: CaseStatus, validationRecord?: ValidationRecord) => void;
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
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

  // Validation Form State for modal
  const [valMethod, setValMethod] = useState<string>(caseData.validation.method || 'Prueba de usabilidad');
  const [valDate, setValDate] = useState(new Date().toISOString().split('T')[0]);
  const [valSample, setValSample] = useState('5 usuarios representativos');
  const [valFinding, setValFinding] = useState<ValidationFinding>('Apoyada');
  const [valLearning, setValLearning] = useState('');

  const handleCopyMarkdown = () => {
    const md = `### FICHA DE HIPÓTESIS CONTEXTUAL: ${caseData.title}
**Journey:** ${caseData.journey} | **Momento:** ${caseData.moment} | **Estado:** ${caseData.status}
${caseData.isDemo ? `*(${caseData.demoBadge || 'CASO DEMOSTRATIVO'})*\n` : ''}

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

  const handleStatusSelectChange = (newStatus: CaseStatus) => {
    if (newStatus === 'Validada') {
      setIsValidationModalOpen(true);
    } else {
      onStatusChange?.(newStatus);
    }
  };

  const handleSaveValidationRecord = () => {
    const record: ValidationRecord = {
      method: valMethod,
      date: valDate,
      sampleOrParticipants: valSample,
      finding: valFinding,
      learning: valLearning.trim() || 'Hipótesis validada empíricamente.',
    };

    onStatusChange?.('Validada', record);
    setIsValidationModalOpen(false);
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
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full">
              {caseData.journey} • {caseData.moment}
            </span>
            <StatusBadge status={caseData.status} />
            {caseData.isDemo && (
              <DemoBadge text={caseData.demoBadge || 'CASO DEMOSTRATIVO'} />
            )}
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
        <div className="mt-2.5 text-sm sm:text-base text-neutral-700 font-serif italic bg-white p-3.5 rounded border border-neutral-200/90 leading-relaxed">
          "{caseData.job}"
        </div>
      </div>

      {/* Main Matrix Grid (Scannable, clean fields) */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* 1. SEÑAL & EVIDENCIA */}
        <section aria-labelledby={`signal-${caseData.id}`} className="space-y-1.5 border-l-2 border-neutral-900 pl-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                1. SEÑAL OBSERVABLE ({caseData.signal.type})
              </span>
              <span className="text-xs text-neutral-500">• Fuente: {caseData.signal.source}</span>
            </div>
            <EvidenceBadge type={caseData.signal.evidenceType} size="sm" />
          </div>
          <p className="text-base sm:text-lg font-semibold text-neutral-900 leading-relaxed">
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
            <strong>Contexto inferido:</strong> {caseData.interpretation.context}
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
            <strong>Intención estimada:</strong> {caseData.interpretation.intention}
          </p>
        </section>

        {/* 3. DECISIÓN (DECISION GATE) */}
        <section aria-labelledby={`decision-${caseData.id}`} className="space-y-2.5 border-l-2 border-neutral-900 pl-4 bg-neutral-50 -mx-2 px-4 py-3.5 rounded-r-lg">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              3. DECISIÓN GATE & POSTURA DE INTERVENCIÓN
            </span>
            <div className="flex items-center gap-2">
              <ValueBadge level={caseData.decision.userValue} />
              <RiskBadge level={caseData.decision.errorRisk} />
              <DecisionGateBadge outcome={caseData.decision.intervention} size="md" />
            </div>
          </div>
          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
            {caseData.decision.rationale || `Intervención clasificada como "${caseData.decision.intervention}" sopesando riesgo ${caseData.decision.errorRisk.toLowerCase()} y valor ${caseData.decision.userValue.toLowerCase()}.`}
          </p>
          <div className="text-xs text-neutral-600 flex items-center gap-1.5 pt-0.5">
            <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>Impacto ante falso positivo: <strong>{caseData.decision.possibleImpact}</strong></span>
          </div>
        </section>

        {/* 4. RESPUESTA & FALLBACK */}
        <section aria-labelledby={`resp-${caseData.id}`} className="space-y-3 border-l-2 border-neutral-900 pl-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              4. RESPUESTA DE INTERFAZ & MECANISMOS
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {matchedPatterns.map((pat) => (
                <span
                  key={pat.id}
                  className="text-xs px-2.5 py-1 rounded-full bg-neutral-900 text-white font-semibold"
                >
                  {pat.name}
                </span>
              ))}
            </div>
          </div>

          <p className="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed">
            {caseData.response.description}
          </p>

          {/* Selected UI Mechanisms */}
          {caseData.response.selectedMechanisms && caseData.response.selectedMechanisms.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-neutral-500 font-semibold">Componentes de UI:</span>
              {caseData.response.selectedMechanisms.map((mech) => (
                <span key={mech} className="bg-neutral-100 border border-neutral-300 text-neutral-800 px-2.5 py-0.5 rounded font-medium">
                  {mech}
                </span>
              ))}
            </div>
          )}

          {/* Fallback component */}
          <div className="p-3.5 rounded-lg bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-800 flex items-start gap-2.5">
            <CornerDownRight className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-900">Vía de escape (Fallback): </strong>
              <span>{caseData.response.fallback}</span>
            </div>
          </div>

          {/* Before & After Comparison */}
          {(caseData.response.before || caseData.response.after) && (
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Comparación visual: Experiencia Estándar vs. Respuesta Contextual
              </span>
              <BeforeAfterView
                before={caseData.response.before}
                after={caseData.response.after}
              />
            </div>
          )}
        </section>

        {/* 5. REQUERIMIENTOS DE DATOS E INTEGRACIÓN */}
        {caseData.dataRequirements && (
          <section aria-labelledby={`data-${caseData.id}`} className="space-y-2 border-l-2 border-slate-700 pl-4 bg-slate-50/70 -mx-2 px-4 py-3.5 rounded-r-lg">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-slate-700" />
                <span>5. REQUERIMIENTOS DE DATOS & FACTIBILIDAD</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                Madurez: {caseData.dataRequirements.contextualMaturity || caseData.dataRequirements.requiredMaturity || 'M1'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm pt-1">
              <div>
                <span className="text-slate-500 block text-xs">Señal requerida</span>
                <span className="font-semibold text-slate-900">{caseData.dataRequirements.signalNeeded || caseData.dataRequirements.neededSignal || 'Por definir'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">Fuente técnica</span>
                <span className="font-medium text-slate-800">{caseData.dataRequirements.sourceType || caseData.dataRequirements.source || 'Por definir'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">Disponibilidad de datos</span>
                <span className="font-medium text-slate-800">{caseData.dataRequirements.availability}</span>
              </div>
            </div>
          </section>
        )}

        {/* 6. VALIDACIÓN & MÉTRICA */}
        <section aria-labelledby={`val-${caseData.id}`} className="space-y-2.5 border-l-2 border-emerald-600 pl-4 bg-emerald-50/40 -mx-2 px-4 py-3.5 rounded-r-lg">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              6. VALIDACIÓN & CRITERIO FALSABLE
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
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
            <div className="mt-2 text-xs sm:text-sm text-neutral-800 pt-2 border-t border-emerald-200">
              <strong className="text-emerald-900">Criterio de éxito: </strong>
              "{caseData.validation.expectedResult}"
            </div>
          )}

          {/* Validation Record display if case is validated */}
          {caseData.validationRecord && (
            <div className="mt-3 p-3.5 rounded bg-white border border-emerald-300 space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Resultado de la Validación: {caseData.validationRecord.finding}</span>
                </span>
                <span className="text-neutral-500">
                  {caseData.validationRecord.date} • {caseData.validationRecord.sampleOrParticipants}
                </span>
              </div>
              <p className="text-neutral-800 italic pt-1">
                "{caseData.validationRecord.learning}"
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Action Footer Bar */}
      <footer className="px-5 sm:px-7 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsProtoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Preparar prototipo</span>
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              <Edit3 className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Editar</span>
            </button>
          )}

          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              <Copy className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Duplicar</span>
            </button>
          )}

          {onCreateRelated && (
            <button
              type="button"
              onClick={onCreateRelated}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors min-h-[44px]"
              title="Crear caso relacionado en el mismo journey"
            >
              <PlusCircle className="w-4 h-4 text-neutral-500" />
              <span className="hidden md:inline">Caso relacionado</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onStatusChange && (
            <select
              value={caseData.status}
              aria-label="Cambiar estado de la hipótesis"
              onChange={(e) => handleStatusSelectChange(e.target.value as CaseStatus)}
              className="text-xs sm:text-sm font-semibold rounded-btn border border-neutral-300 bg-white px-3 py-2 text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 min-h-[44px]"
            >
              <option value="Borrador">Borrador</option>
              <option value="Lista para prototipar">Lista para prototipar</option>
              <option value="En validación">En validación</option>
              <option value="Validada">Validada...</option>
              <option value="Descartada">Descartada</option>
            </select>
          )}

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors min-h-[44px]"
            title="Copiar resumen en Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-neutral-500" />}
            <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Compartir'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-btn bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors min-h-[44px]"
            title="Exportar caso"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </footer>

      {/* Modal Guía de Prototipado en 7 Pasos */}
      <Modal
        isOpen={isProtoModalOpen}
        onClose={() => setIsProtoModalOpen(false)}
        title="Plan de Prototipado en 7 Pasos"
        description={`Hipótesis: "${caseData.title}"`}
        maxWidth="xl"
      >
        <div className="space-y-4 text-sm text-[#0F172A]">
          <div className="p-3.5 rounded-lg bg-neutral-100 border border-neutral-200 text-xs sm:text-sm flex items-center justify-between">
            <span><strong>Decisión Gate: {caseData.decision.intervention}</strong></span>
            <span><strong>Método sugerido: {caseData.validation.method}</strong></span>
          </div>

          <ol className="space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="block text-neutral-900">Momento y Disparador:</strong>
                <span>Recrea la pantalla base en <strong>{caseData.moment}</strong>. Define qué acción o evento desencadena el estado adaptativo.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="block text-neutral-900">Simulación de la Señal:</strong>
                <span>Configura en tu prototipo la simulación de: <em>"{caseData.signal.description}"</em> (ej. clic erróneo o timer en Figma/ProtoPie).</span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="block text-neutral-900">Regla del Decision Gate:</strong>
                <span>Aplica la postura <strong>{caseData.decision.intervention}</strong>: {caseData.decision.intervention === 'ADAPTAR' ? 'Adapta la pantalla directamente.' : caseData.decision.intervention === 'SUGERIR' ? 'Muestra sugerencia opcional no bloqueante.' : caseData.decision.intervention === 'PREGUNTAR' ? 'Muestra diálogo de confirmación explícito.' : 'Mantén la pantalla estándar.'}</span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <strong className="block text-neutral-900">Mecanismo de UI:</strong>
                <span>Diseña los patrones {matchedPatterns.map((p) => p.name).join(' + ')} con respuesta: <em>"{caseData.response.description}"</em>.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">5</span>
              <div>
                <strong className="block text-neutral-900">Vía de escape (Fallback):</strong>
                <span>Asegura que el usuario pueda descartar o continuar normalmente: <em>"{caseData.response.fallback}"</em>.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">6</span>
              <div>
                <strong className="block text-neutral-900">Tarea para el Test de Usabilidad:</strong>
                <span>Redacta una consigna neutral para los participantes: "Intenta completar el trámite como lo harías normalmente".</span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-2.5 rounded bg-neutral-50 border border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0">7</span>
              <div>
                <strong className="block text-neutral-900">Criterio de Falsabilidad:</strong>
                <span>Observa si el usuario nota la ayuda, si la utiliza, o si genera confusión. Métrica: <strong>{caseData.validation.primaryMetric}</strong>.</span>
              </div>
            </li>
          </ol>

          <div className="pt-3 border-t border-neutral-200 flex justify-end">
            <button
              type="button"
              onClick={() => setIsProtoModalOpen(false)}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-btn bg-neutral-900 text-white hover:bg-neutral-800 min-h-[44px]"
            >
              Listo para prototipar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Registro Real de Validación */}
      <Modal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        title="Registrar Validación de la Hipótesis"
        description="Para marcar una hipótesis como Validada, documenta los hallazgos empíricos y aprendizajes del test."
        maxWidth="md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-[#0F172A]">
          <div className="space-y-1">
            <label className="block font-semibold text-neutral-900">Método de validación utilizado</label>
            <input
              type="text"
              value={valMethod}
              onChange={(e) => setValMethod(e.target.value)}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
              placeholder="Ej: Prueba de usabilidad moderada"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-semibold text-neutral-900">Fecha del test</label>
              <input
                type="date"
                value={valDate}
                onChange={(e) => setValDate(e.target.value)}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-neutral-900">Muestra / Participantes</label>
              <input
                type="text"
                value={valSample}
                onChange={(e) => setValSample(e.target.value)}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
                placeholder="Ej: 5 usuarios perfil recurrente"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-neutral-900">Resultado del test</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Apoyada', 'Parcialmente apoyada', 'No apoyada', 'Inconclusa'] as ValidationFinding[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setValFinding(f)}
                  className={`p-2 rounded border text-xs font-semibold text-left min-h-[40px] flex items-center justify-between ${
                    valFinding === f
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <span>{f}</span>
                  {valFinding === f && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-neutral-900">Aprendizajes clave & siguientes pasos</label>
            <textarea
              rows={3}
              value={valLearning}
              onChange={(e) => setValLearning(e.target.value)}
              placeholder="¿Qué observamos en los usuarios? ¿Qué ajustes de diseño se requieren antes de implementar?"
              className="w-full border border-neutral-300 rounded p-2.5 text-sm"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsValidationModalOpen(false)}
              className="px-4 py-2 border border-neutral-300 rounded text-neutral-700 min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveValidationRecord}
              className="px-5 py-2 bg-emerald-700 text-white rounded font-semibold min-h-[44px] hover:bg-emerald-800"
            >
              Guardar Validación
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
            className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between min-h-[52px]"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-xs sm:text-sm">Descargar como JSON</div>
              <div className="text-[11px] text-neutral-500">Datos estructurados compatibles</div>
            </div>
            <Download className="w-4 h-4 text-neutral-500" />
          </button>

          <button
            type="button"
            onClick={() => {
              handleCopyMarkdown();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between min-h-[52px]"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-xs sm:text-sm">Copiar en Markdown</div>
              <div className="text-[11px] text-neutral-500">Para Notion, Figma o Jira</div>
            </div>
            <Copy className="w-4 h-4 text-neutral-500" />
          </button>

          <button
            type="button"
            onClick={() => {
              window.print();
              setIsExportModalOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-between min-h-[52px]"
          >
            <div>
              <div className="font-semibold text-neutral-900 text-xs sm:text-sm">Imprimir o Guardar PDF</div>
              <div className="text-[11px] text-neutral-500">Formato de una sola página</div>
            </div>
            <FileText className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </Modal>
    </article>
  );
};
