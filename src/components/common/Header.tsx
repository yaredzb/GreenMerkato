import React from 'react';
import { BrandLogo } from './BrandLogo';
import { OfflineIndicator } from './OfflineIndicator';
import { PWAInstallButton } from './PWAInstallButton';
import { LanguageToggle } from './LanguageToggle';
import { RoleSwitcher } from './RoleSwitcher';
import { TibebStripe, AddisAbabaSeal } from './EthiopicElements';
import { useApp } from '../../context/AppContext';
import { Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { currentUser, t, setViewMode } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#DFD9CE] shadow-2xs">
      {/* Authentic Ethiopian Tibeb (ጥበብ) Woven Ribbon on top edge */}
      <TibebStripe height={5} />

      <div className="px-3 sm:px-5 lg:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Brand & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-2 rounded-lg border border-[#DFD9CE] bg-white text-stone-700 hover:bg-[#F3EFE6] transition shadow-2xs"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-[#B94726]" /> : <Menu className="w-5 h-5 text-[#1C462C]" />}
              </button>
            )}
            <BrandLogo size="md" showSubtitle={true} />
          </div>

          {/* Center-Right: Addis Ababa City Project Authority Badge (Desktop) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#1C462C]/5 border border-[#1C462C]/15 text-xs text-[#1C462C]">
            <AddisAbabaSeal size="sm" />
            <div className="leading-tight">
              <div className="font-bold text-[11px] text-[#1C462C]">የአዲስ አበባ ከተማ ጽዳት አስተዳደር</div>
              <div className="text-[9px] text-stone-500 font-medium">Addis Ababa Cleansing & Compost Service</div>
            </div>
          </div>

          {/* Right: Operational Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Switch to Public Website Button */}
            <button
              onClick={() => setViewMode('public')}
              className="px-2.5 py-1.5 rounded-lg border border-[#DFD9CE] bg-white text-stone-700 hover:bg-[#FAF7F0] text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
              title={t('View Public Website', 'ወደ ዋናው ድረ-ገጽ ተመለስ')}
            >
              <Globe className="w-3.5 h-3.5 text-[#1C462C]" />
              <span className="hidden sm:inline">{t('Public Website', 'ድረ-ገጽ')}</span>
            </button>

            {/* Offline Sync State */}
            <div className="hidden sm:block">
              <OfflineIndicator />
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Language Switcher EN | አማ */}
            <LanguageToggle />

            {/* Role Switcher Pill */}
            <RoleSwitcher />
          </div>
        </div>

        {/* Small screen offline indicator sub-row */}
        <div className="sm:hidden pt-2 mt-2 border-t border-[#DFD9CE]/60 flex justify-between items-center text-[10px]">
          <span className="text-[#1C462C] font-bold">መርካቶ • አዲስ አበባ</span>
          <OfflineIndicator />
        </div>
      </div>
    </header>
  );
};

