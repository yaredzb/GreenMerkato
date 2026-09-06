import React from 'react';
import { useApp } from '../../context/AppContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useApp();

  return (
    <div className="inline-flex items-center rounded-lg border border-[#DDD8CD] bg-[#F8F6F0] p-0.5 text-xs font-semibold shadow-xs">
      <button
        id="lang-en-btn"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-md transition-colors ${
          language === 'en'
            ? 'bg-[#1A3D2F] text-white shadow-xs'
            : 'text-stone-600 hover:text-stone-900'
        }`}
      >
        EN
      </button>
      <span className="text-stone-300">|</span>
      <button
        id="lang-am-btn"
        onClick={() => setLanguage('am')}
        className={`px-2 py-1 rounded-md transition-colors font-medium ${
          language === 'am'
            ? 'bg-[#1A3D2F] text-white shadow-xs'
            : 'text-stone-600 hover:text-stone-900'
        }`}
      >
        አማ
      </button>
    </div>
  );
};
