import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-300 bg-emerald-50/95',
    warning: 'border-amber-300 bg-amber-50/95',
    error: 'border-rose-300 bg-rose-50/95',
    info: 'border-sky-300 bg-sky-50/95'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-xl shadow-xl border ${borderColors[toast.type]} backdrop-blur-sm flex items-start gap-3`}>
        {icons[toast.type]}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-stone-900 leading-tight">
            {toast.title}
          </h4>
          <p className="text-xs text-stone-600 mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>
        <button
          onClick={dismissToast}
          className="p-1 rounded text-stone-400 hover:text-stone-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
