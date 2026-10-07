import React, { useState } from 'react';
import { PLAYBOOK_CHAPTERS } from '../data/playbookData';
import { useCases } from '../context/CasesContext';
import { Callout, DoDont } from '../components/ui/Callout';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Menu,
  ChevronDown
} from 'lucide-react';

export const PlaybookView: React.FC = () => {
  const { activePlaybookChapter, setActivePlaybookChapter, startNewCase } = useCases();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentChapter =
    PLAYBOOK_CHAPTERS.find((c) => c.id === activePlaybookChapter) || PLAYBOOK_CHAPTERS[0];

  const handleSelectChapter = (id: string) => {
    setActivePlaybookChapter(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Mobile Chapter Picker Drawer/Dropdown */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between p-3.5 rounded-card border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 shadow-sm min-h-[48px]"
        >
          <div className="flex items-center gap-2 truncate">
            <BookOpen className="w-4 h-4 text-neutral-500" />
            <span className="truncate">{currentChapter.title}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
        </button>

        {mobileMenuOpen && (
          <div className="mt-2 bg-white rounded-card border border-neutral-200 shadow-xl p-2 space-y-1">
            {PLAYBOOK_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => handleSelectChapter(ch.id)}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between min-h-[44px] ${
                  currentChapter.id === ch.id
                    ? 'bg-neutral-900 text-white font-bold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>{ch.title}</span>
                <span className="text-[10px] opacity-75">{ch.badge}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Fixed Left Navigation */}
        <nav aria-label="Capítulos del Playbook" className="hidden lg:block lg:col-span-3 space-y-2 sticky top-24 max-h-[85vh] overflow-y-auto pr-2">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 px-2">
            Capítulos del Playbook
          </div>
          <div className="space-y-1">
            {PLAYBOOK_CHAPTERS.map((ch, idx) => {
              const isSelected = currentChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`w-full text-left p-3 rounded-card text-xs transition-all flex items-start gap-2.5 min-h-[44px] ${
                    isSelected
                      ? 'bg-neutral-900 text-white font-bold shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 mt-0.5 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}>
                    0{idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="truncate">{ch.title}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                      {ch.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-200 px-2">
            <button
              type="button"
              onClick={() => startNewCase()}
              className="w-full py-2.5 px-3 rounded-btn bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Aplicar al wizard</span>
            </button>
          </div>
        </nav>

        {/* Center Editorial Reader (max-w-3xl) */}
        <article className="lg:col-span-7 bg-white rounded-card border border-neutral-200/90 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Chapter Header */}
          <div className="border-b border-neutral-100 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold">
              <span>{currentChapter.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-snug">
              {currentChapter.title}
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed font-serif">
              {currentChapter.summary}
            </p>
          </div>

          {/* Chapter Content Sections */}
          <div className="space-y-8">
            {currentChapter.sections.map((section, sIdx) => (
              <section key={sIdx} id={`section-${sIdx}`} className="space-y-3 scroll-mt-24">
                <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {section.content}
                </p>

                {/* Callouts */}
                {section.callout && (
                  <Callout
                    type={section.callout.type}
                    title={section.callout.title}
                    text={section.callout.text}
                  />
                )}

                {/* Do / Don't */}
                {section.doDont && (
                  <DoDont
                    doText={section.doDont.doText}
                    dontText={section.doDont.dontText}
                  />
                )}

                {/* Checklists */}
                {section.checklist && (
                  <div className="my-4 p-4 rounded-card bg-neutral-50 border border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                      Criterios Clave
                    </span>
                    <ul className="space-y-2">
                      {section.checklist.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Example Box */}
                {section.exampleBox && (
                  <div className="my-4 p-4 rounded-card bg-neutral-900 text-white space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                      {section.exampleBox.title}
                    </span>
                    <p className="text-xs text-neutral-300">
                      <strong>Situación:</strong> {section.exampleBox.situation}
                    </p>
                    <p className="text-xs text-neutral-100">
                      <strong>Resolución:</strong> {section.exampleBox.resolution}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Chapter Footer Navigation */}
          <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
            <span className="text-xs text-neutral-500">
              Capítulo del Contextual Experience Playbook
            </span>
            <button
              type="button"
              onClick={() => {
                const nextIdx =
                  (PLAYBOOK_CHAPTERS.findIndex((c) => c.id === currentChapter.id) + 1) %
                  PLAYBOOK_CHAPTERS.length;
                handleSelectChapter(PLAYBOOK_CHAPTERS[nextIdx].id);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline min-h-[44px]"
            >
              <span>Siguiente capítulo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </article>

        {/* Right Lateral Table of Contents on Desktop */}
        <aside aria-label="Tabla de contenidos del capítulo" className="hidden lg:block lg:col-span-2 sticky top-24 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-1">
            En esta página
          </div>
          <ul className="space-y-2 text-xs text-neutral-600 border-l border-neutral-200 pl-3">
            {currentChapter.sections.map((s, idx) => (
              <li key={idx}>
                <a
                  href={`#section-${idx}`}
                  className="hover:text-neutral-900 line-clamp-2 transition-colors block py-0.5"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};
