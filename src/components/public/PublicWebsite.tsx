import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';
import { StaffLoginModal } from './StaffLoginModal';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ImpactPage } from './pages/ImpactPage';
import { VendorsPage } from './pages/VendorsPage';
import { FarmersPage } from './pages/FarmersPage';
import { AboutPage } from './pages/AboutPage';
import { PartnersPage } from './pages/PartnersPage';
import { ContactPage } from './pages/ContactPage';
import { Lock, Sparkles } from 'lucide-react';

export const PublicWebsite: React.FC = () => {
  const { publicSection, setPublicSection, setViewMode, t } = useApp();
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (publicSection) {
      case 'home':
        return <HomePage onOpenStaffLogin={() => setIsStaffLoginOpen(true)} />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'impact':
        return <ImpactPage />;
      case 'vendors':
        return <VendorsPage />;
      case 'farmers':
        return <FarmersPage />;
      case 'about':
        return <AboutPage />;
      case 'partners':
        return <PartnersPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onOpenStaffLogin={() => setIsStaffLoginOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-stone-900 flex flex-col font-sans selection:bg-[#DF9F28]/30 selection:text-[#1C462C]">
      {/* Top Municipal Pilot Banner */}
      <div className="bg-[#1C462C] text-[#FAF7F0] text-[11px] font-sans py-1.5 px-4 border-b border-[#DF9F28]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {t(
                'Addis Ababa Municipal Organic Circular Economy Initiative • Pilot Operations in Merkato & Repi',
                'የአዲስ አበባ ከተማ አስተዳደር የኦርጋኒክ ቆሻሻ ክብ-ኢኮኖሚ አብራሪ ፕሮጀክት • በመርካቶና በረጲ'
              )}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsStaffLoginOpen(true)}
              className="text-[#DF9F28] hover:text-white font-bold flex items-center gap-1 transition"
            >
              <Lock className="w-3 h-3" />
              <span>{t('Staff Access', 'የሰራተኞች መግቢያ')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Public Navigation Bar */}
      <PublicNavbar onOpenStaffLogin={() => setIsStaffLoginOpen(true)} />

      {/* Main Public Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Public Footer */}
      <PublicFooter onOpenStaffLogin={() => setIsStaffLoginOpen(true)} />

      {/* Staff Login / Role Switcher Modal */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
      />
    </div>
  );
};
