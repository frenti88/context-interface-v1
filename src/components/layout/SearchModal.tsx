import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, Lightbulb, BarChart2, ArrowRight } from 'lucide-react';
import { ActiveView, ContextualCase, PatternKey } from '../../types';
import { PLAYBOOK_CHAPTERS } from '../../data/playbookData';
import { PATTERNS_DATA } from '../../data/patterns';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cases: ContextualCase[];
  onNavigate: (view: ActiveView, caseId?: string, patternId?: PatternKey) => void;
  onSelectPlaybookChapter: (chapterId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  cases,
  onNavigate,
  onSelectPlaybookChapter,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search in Playbook
  const matchedPlaybook = cleanQ
    ? PLAYBOOK_CHAPTERS.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQ) ||
          c.summary.toLowerCase().includes(cleanQ) ||
          c.sections.some((s) => s.title.toLowerCase().includes(cleanQ) || s.content.toLowerCase().includes(cleanQ))
      )
    : PLAYBOOK_CHAPTERS.slice(0, 3);

  // Search in Patterns
  const matchedPatterns = cleanQ
    ? PATTERNS_DATA.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQ) ||
          p.shortDescription.toLowerCase().includes(cleanQ) ||
          p.definition.toLowerCase().includes(cleanQ)
      )
    : PATTERNS_DATA.slice(0, 4);

  // Search in Cases
  const matchedCases = cleanQ
    ? cases.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQ) ||
          c.journey.toLowerCase().includes(cleanQ) ||
          c.signal.description.toLowerCase().includes(cleanQ) ||
          c.response.description.toLowerCase().includes(cleanQ)
      )
    : cases.slice(0, 3);

  const hasResults =
    matchedPlaybook.length > 0 || matchedPatterns.length > 0 || matchedCases.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda global"
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4 pb-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette container */}
      <div className="relative w-full max-w-2xl bg-white rounded-card shadow-2xl border border-neutral-200 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar patrones, conceptos, hipótesis o casos..."
            className="w-full text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-neutral-400 hover:text-neutral-700 min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-mono text-neutral-500">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-5 text-sm">
          {!hasResults && cleanQ && (
            <div className="py-8 text-center text-neutral-500">
              <p className="font-semibold text-neutral-900">No encontramos resultados para "{query}"</p>
              <p className="text-xs mt-1">Prueba buscando "Priorizar", "Error de pago", "Evidencia" o "Madurez".</p>
            </div>
          )}

          {/* Group 1: Playbook */}
          {matchedPlaybook.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Playbook & Fundamentos</span>
              </div>
              <div className="space-y-1">
                {matchedPlaybook.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      onSelectPlaybookChapter(ch.id);
                      onNavigate('playbook');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all flex items-center justify-between group min-h-[44px]"
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-neutral-900 group-hover:text-black">
                        {ch.title}
                      </div>
                      <div className="text-xs text-neutral-500 line-clamp-1">{ch.summary}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Patterns */}
          {matchedPatterns.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Patrones Contextuales</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedPatterns.map((pat) => (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => {
                      onNavigate('patterns', undefined, pat.id);
                      onClose();
                    }}
                    className="text-left p-2.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all flex flex-col justify-between min-h-[58px]"
                  >
                    <div className="font-semibold text-xs text-neutral-900">{pat.name}</div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">{pat.shortDescription}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Cases */}
          {matchedCases.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Casos & Hipótesis</span>
              </div>
              <div className="space-y-1">
                {matchedCases.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onNavigate('case-detail', c.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all flex items-center justify-between group min-h-[44px]"
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-neutral-900">{c.title}</div>
                      <div className="text-xs text-neutral-500">
                        {c.journey} • {c.decision.intervention}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-900">
                      Ver tarjeta →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
          <span>Navega con enter o clic</span>
          <span>Contextual Experience Playbook</span>
        </div>
      </div>
    </div>
  );
};
