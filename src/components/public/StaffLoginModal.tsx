import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../data/mockData';
import { UserRole } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { AddisAbabaSeal, TibebStripe } from '../common/EthiopicElements';
import { 
  X, 
  ShieldCheck, 
  Scale, 
  Layers, 
  ShoppingBag, 
  LayoutDashboard, 
  ArrowRight, 
  Lock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({ isOpen, onClose }) => {
  const { switchUserRole, setViewMode, showToast, t, language } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('OPERATIONS_MANAGER');
  const [passcode, setPasscode] = useState('2026');

  if (!isOpen) return null;

  const staffProfiles = [
    {
      role: 'OPERATIONS_MANAGER' as UserRole,
      name: 'Wubshet Hailu',
      nameAm: 'ውብሸት ሀይሉ',
      title: 'Operations Director',
      titleAm: 'የስራ አመራር ዳይሬክተር',
      zone: 'Merkato Hub & Repi Curing Yard',
      icon: LayoutDashboard,
      color: 'text-[#1C462C] bg-[#1C462C]/10 border-[#1C462C]/25',
      desc: 'Overall intake tracking, municipal compliance, batch oversight, and operational alerts.'
    },
    {
      role: 'COLLECTION_WORKER' as UserRole,
      name: 'Tariku Bekele',
      nameAm: 'ታሪኩ በቀለ',
      title: 'Field Waste Registrar',
      titleAm: 'የመስክ ቆሻሻ መዛኝ',
      zone: 'Atikilt Tera Fruit & Vegetable Stalls',
      icon: Scale,
      color: 'text-[#B94726] bg-[#B94726]/10 border-[#B94726]/25',
      desc: 'Mobile-first offline weighing scale, stall QR badge scanning, and contamination checks.'
    },
    {
      role: 'COMPOST_OPERATOR' as UserRole,
      name: 'Alemayehu Tadesse',
      nameAm: 'አለማየሁ ታደሰ',
      title: 'Facility Lead & Operator',
      titleAm: 'የማዳበሪያ ማዕከል ኃላፊ',
      zone: 'Repi (Koshe) Aerobic Windrows',
      icon: Layers,
      color: 'text-[#7A4B29] bg-[#7A4B29]/10 border-[#7A4B29]/25',
      desc: 'Batch recipe mix, pile turning records, temperature & moisture logging, maturation grading.'
    },
    {
      role: 'SALES_OFFICER' as UserRole,
      name: 'Bethlehem Assefa',
      nameAm: 'ቤተልሔም አሰፋ',
      title: 'Sales & Cooperative Officer',
      titleAm: 'የሽያጭና ስርጭት ኃላፊ',
      zone: 'Oromia & Shewa Farmer Grid',
      icon: ShoppingBag,
      color: 'text-[#DF9F28] bg-[#DF9F28]/15 border-[#DF9F28]/35',
      desc: 'Finished compost inventory allocation, farmer union orders, Telebirr & CBE payments.'
    },
    {
      role: 'SUPER_ADMIN' as UserRole,
      name: 'Dr. Meron Gebre',
      nameAm: 'ዶ/ር ሜሮን ገብሬ',
      title: 'Chief Auditor & Agronomist',
      titleAm: 'ዋና ኦዲተርና አግሮኖሚስት',
      zone: 'Addis Ababa City Cleansing Service',
      icon: ShieldCheck,
      color: 'text-stone-800 bg-stone-100 border-stone-300',
      desc: 'Full administrative access, user role provisioning, lab certificates, and immutable audit logs.'
    }
  ];

  const handleLogin = (role: UserRole) => {
    switchUserRole(role);
    setViewMode('app');
    onClose();
    showToast(
      'success',
      t('Operational Session Authenticated', 'የስራ ማዕከል ክፍለ-ጊዜ ተጀምሯል'),
      t(
        `Logged in as ${DEMO_USERS[role]?.name} (${role.replace('_', ' ')}). Welcome to GreenMerkato Operations.`,
        `እንደ ${DEMO_USERS[role]?.name} ገብተዋል። እንኳን ወደ ግሪን መርካቶ ኦፕሬሽንስ በደህና መጡ።`
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-2xl shadow-2xl border border-[#DFD9CE] overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Top Tibeb Stripe */}
        <TibebStripe height={5} />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#DFD9CE] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AddisAbabaSeal size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base sm:text-lg text-[#1C462C]">
                  {t('GreenMerkato Staff Portal', 'የግሪን መርካቶ ሰራተኞች መግቢያ')}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-[10px] font-mono font-bold">
                  SECURE PWA
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {t(
                  'Authenticated operational system for field waste collection, compost monitoring, and distribution.',
                  'ለመስክ ቆሻሻ ምዝገባ፣ ለማዳበሪያ ቁጥጥር እና ለስርጭት ኦፕሬሽንስ የተዘጋጀ የተፈቀደላቸው ሰራተኞች ማዕከል።'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#DFD9CE] text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#1C462C]/5 via-[#DF9F28]/10 to-[#1C462C]/5 border border-[#DF9F28]/30 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#DF9F28] shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700">
              <span className="font-bold text-[#1C462C]">
                {t('Pilot Sandbox Access:', 'የአብራሪ ፕሮጀክት የስራ መግቢያ፡')}
              </span>{' '}
              {t(
                'Select an authenticated operational role below to enter the live field application. All operational offline queues, QR scanner simulations, and batch tracking are active.',
                'የቀጥታ የመስክ ስራ ስርዓቱን ለመጎብኘት ከታች ካሉት የስራ ድርሻዎች አንዱን ይምረጡ። የመስክ መመዘኛ፣ የQR ስካነር እና የባች ቁጥጥር ሙሉ በሙሉ ዝግጁ ናቸው።'
              )}
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center justify-between">
            <span>{t('Select Operational Role', 'የስራ ድርሻዎን ይምረጡ')}</span>
            <span className="text-[10px] text-stone-400 font-mono">5 AUTHENTICATED PROFILES</span>
          </div>

          {/* Role Cards Grid */}
          <div className="space-y-2.5">
            {staffProfiles.map((p) => {
              const IconComponent = p.icon;
              const isCurrent = selectedRole === p.role;

              return (
                <div
                  key={p.role}
                  onClick={() => setSelectedRole(p.role)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-white border-[#1C462C] shadow-md ring-1 ring-[#1C462C]'
                      : 'bg-white/80 border-[#DFD9CE] hover:bg-white hover:border-[#CFC7B9]'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-lg border shrink-0 ${p.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-stone-900">
                          {language === 'am' ? p.nameAm : p.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7F0] border border-[#DFD9CE] text-stone-700">
                          {language === 'am' ? p.titleAm : p.title}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 truncate mt-0.5">
                        {p.zone}
                      </p>
                      <p className="text-[11px] text-stone-600 line-clamp-1 mt-1 font-sans">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isCurrent ? (
                      <CheckCircle2 className="w-5 h-5 text-[#1C462C]" />
                    ) : (
                      <span className="text-xs font-semibold text-stone-400 hover:text-stone-800">
                        {t('Select', 'ምረጥ')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Passcode preview */}
          <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-[#DFD9CE]/60">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#B94726]" />
              <span>{t('Municipal Cleansing Auth Key:', 'የከተማ ጽዳት ፍቃድ ቁልፍ፡')}</span>
              <span className="font-mono font-bold text-stone-700">GM-AA-2026</span>
            </span>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('Station Active', 'ጣቢያው ንቁ ነው')}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#DFD9CE] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#DFD9CE] text-xs font-semibold rounded-lg text-stone-700 hover:bg-[#F3EFE6] transition"
          >
            {t('Cancel / Back to Website', 'ይቅር / ወደ ዋናው ድረ-ገጽ')}
          </button>

          <button
            onClick={() => handleLogin(selectedRole)}
            className="px-5 py-2.5 btn-primary text-xs font-bold flex items-center gap-2 shadow-md transition"
          >
            <span>{t('Launch Operational Platform', 'ወደ ኦፕሬሽናል ሲስተሙ ግባ')}</span>
            <ArrowRight className="w-4 h-4 text-[#DF9F28]" />
          </button>
        </div>
      </div>
    </div>
  );
};
