import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { t } = useApp();

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-2 rounded-lg bg-[#1A3D2F] px-3 py-1.5 text-xs font-semibold text-[#F8F6F0] border border-[#2A5743] shadow-sm hover:bg-[#12281F] transition active:scale-95"
        title={t('Install GreenMerkato PWA', 'ግሪን መርካቶን በስልክዎ ላይ ይጫኑ')}
      >
        <Download className="w-3.5 h-3.5 text-[#D4A017]" />
        <span>{t('Install PWA', 'መተግበሪያውን ጫን')}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-ios-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-[#DDD8CD] bg-[#F8F6F0] px-2.5 py-1 text-xs font-medium text-[#1E231F] hover:bg-[#EFECE3] transition"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#1A3D2F]" />
          <span>{t('Install on iOS', 'በ iOS ላይ ጫን')}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-xl bg-[#F8F6F0] p-6 shadow-2xl border border-[#DDD8CD]">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
                <h3 className="text-base font-bold text-[#1A3D2F]">
                  {t('Install GreenMerkato on iPhone', 'ግሪን መርካቶን በአይፎን ላይ ለመጫን')}
                </h3>
                <button 
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-md text-stone-500 hover:text-stone-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#1E231F]">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white">1</span>
                  <p>{t('Tap the Safari Share button in the toolbar below.', 'ከስር ባለው የሳፋሪ መፈለጊያ ላይ የማጋሪያ ምልክቱን (Share) ይንኩ።')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white">2</span>
                  <p>{t('Scroll down and select "Add to Home Screen".', 'ወደ ታች ዝቅ ብለው "Add to Home Screen" የሚለውን ይምረጡ።')}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white">3</span>
                  <p>{t('Open GreenMerkato directly from your home screen for rapid offline access.', 'ከስልክዎ ስክሪን ላይ በቀጥታ በመክፈት ያለኢንተርኔት ፈጣን አገልግሎት ያግኙ።')}</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg bg-[#1A3D2F] py-2 text-sm font-semibold text-[#F8F6F0] hover:bg-[#12281F]"
              >
                {t('Got It', 'ተረድቻለሁ')}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic fallback trigger button for browser install instructions or mobile inspection
  return (
    <button
      id="pwa-install-generic"
      onClick={() => setShowIOSGuide(true)}
      className="hidden md:flex items-center gap-1.5 rounded-lg border border-[#DDD8CD] bg-[#F8F6F0] px-2.5 py-1 text-xs font-medium text-[#1E231F] hover:bg-[#EFECE3] transition"
      title={t('PWA Ready: Add to device home screen', 'PWA ዝግጁ፡ ወደ ስልክዎ ስክሪን ይጫኑ')}
    >
      <Smartphone className="w-3.5 h-3.5 text-[#1A3D2F]" />
      <span>{t('PWA Ready', 'PWA ዝግጁ')}</span>
    </button>
  );
};
