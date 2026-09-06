import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageToggle } from '../common/LanguageToggle';
import { TibebStripe, AddisAbabaSeal } from '../common/EthiopicElements';
import { 
  Menu, 
  X, 
  Lock, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Store,
  Tractor,
  TrendingUp,
  HelpCircle,
  Users2,
  Mail
} from 'lucide-react';

interface PublicNavbarProps {
  onOpenStaffLogin: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenStaffLogin }) => {
  const { publicSection, setPublicSection, t, language } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', amLabel: 'መነሻ', icon: Sparkles },
    { id: 'how-it-works', label: 'How It Works', amLabel: 'አሰራሩ', icon: Layers },
    { id: 'impact', label: 'Impact', amLabel: 'ተፅዕኖ', icon: TrendingUp },
    { id: 'vendors', label: 'For Vendors', amLabel: 'ለነጋዴዎች', icon: Store },
    { id: 'farmers', label: 'For Farmers', amLabel: 'ለአርሶ አደሮች', icon: Tractor },
    { id: 'about', label: 'About', amLabel: 'ስለ እኛ', icon: HelpCircle },
    { id: 'partners', label: 'Partners', amLabel: 'አጋሮች', icon: Users2 },
    { id: 'contact', label: 'Contact', amLabel: 'አግኙን', icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    setPublicSection(id);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#DFD9CE] shadow-2xs">
      {/* Top Authentic Ethiopian Tibeb Ribbon */}
      <TibebStripe height={5} />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo & Municipal Project Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-hidden"
            >
              <BrandLogo size="md" showSubtitle={true} />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-stone-700">
            {navLinks.map((item) => {
              const isActive = publicSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg transition-colors relative flex flex-col items-center ${
                    isActive
                      ? 'text-[#1C462C] font-bold bg-[#1C462C]/5'
                      : 'hover:text-[#1C462C] hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span>{language === 'am' ? item.amLabel : item.label}</span>
                  {isActive && (
                    <span className="w-4 h-0.5 bg-[#DF9F28] rounded-full mt-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <LanguageToggle />

            {/* Staff Login / Open Platform CTA */}
            <button
              onClick={onOpenStaffLogin}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#1C462C] to-[#143320] text-[#FAF7F0] text-xs font-bold border border-[#DF9F28]/40 shadow-xs hover:shadow-md hover:border-[#DF9F28] transition flex items-center gap-1.5 group"
            >
              <Lock className="w-3.5 h-3.5 text-[#DF9F28] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">
                {t('Staff Login / Open Platform', 'የሰራተኞች መግቢያ')}
              </span>
              <span className="sm:hidden">
                {t('Staff', 'መግቢያ')}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#DF9F28] opacity-80" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="xl:hidden p-2 rounded-xl border border-[#DFD9CE] bg-white text-stone-700 hover:bg-[#F3EFE6] transition"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-[#B94726]" />
              ) : (
                <Menu className="w-5 h-5 text-[#1C462C]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileOpen && (
        <div className="xl:hidden border-t border-[#DFD9CE] bg-[#FAF7F0] px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#DFD9CE] text-[11px] text-stone-500 font-bold uppercase tracking-wider">
            <span>{t('Menu Navigation', 'የገጾች ዝርዝር')}</span>
            <span className="text-[#DF9F28]">አዲስ አበባ • መርካቶ</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((item) => {
              const IconComp = item.icon;
              const isActive = publicSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-lg text-left text-xs font-semibold flex items-center gap-2 transition ${
                    isActive
                      ? 'bg-[#1C462C] text-[#FAF7F0] shadow-xs font-bold'
                      : 'bg-white border border-[#DFD9CE] text-stone-700 hover:bg-[#F3EFE6]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#DF9F28]' : 'text-[#1C462C]'}`} />
                  <div>
                    <div>{language === 'am' ? item.amLabel : item.label}</div>
                    <div className={`text-[10px] ${isActive ? 'text-white/70' : 'text-stone-400'}`}>
                      {language === 'am' ? item.label : item.amLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-[#DFD9CE] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <AddisAbabaSeal size="sm" />
              <span className="font-bold text-[11px] text-[#1C462C]">
                {t('Addis Cleansing Service', 'የአዲስ አበባ ጽዳት አስተዳደር')}
              </span>
            </div>

            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenStaffLogin();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#1C462C] text-[#FAF7F0] text-xs font-bold flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-[#DF9F28]" />
              <span>{t('Staff Access', 'የሰራተኛ መግቢያ')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
