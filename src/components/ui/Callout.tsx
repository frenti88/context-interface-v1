import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  title?: string;
  text: string;
  children?: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, text, children }) => {
  const configs = {
    info: {
      bg: 'bg-slate-50 border-slate-200 text-slate-800',
      icon: <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />,
      titleColor: 'text-slate-900',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      titleColor: 'text-amber-950',
    },
    tip: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-950',
    },
  };

  const c = configs[type];

  return (
    <aside aria-label={title || "Nota"} className={`rounded-card border p-4 my-4 flex gap-3 ${c.bg}`}>
      {c.icon}
      <div className="text-sm leading-relaxed">
        {title && <h4 className={`font-semibold mb-1 ${c.titleColor}`}>{title}</h4>}
        <p>{text}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </aside>
  );
};

export const DoDont: React.FC<{ doText: string; dontText: string }> = ({ doText, dontText }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
      <div className="rounded-card border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2 mb-2 text-emerald-800 font-semibold text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>RECOMENDADO (DO)</span>
        </div>
        <p className="text-sm text-emerald-950 leading-relaxed">{doText}</p>
      </div>

      <div className="rounded-card border border-rose-200 bg-rose-50/50 p-4">
        <div className="flex items-center gap-2 mb-2 text-rose-800 font-semibold text-sm">
          <XCircle className="w-4 h-4 text-rose-600" />
          <span>EVITAR (DON'T)</span>
        </div>
        <p className="text-sm text-rose-950 leading-relaxed">{dontText}</p>
      </div>
    </div>
  );
};
