import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../data/mockData';
import { UserRole } from '../../types';
import { Shield, ChevronDown, UserCheck, Sparkles } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, switchUserRole, language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const roleLabels: Record<UserRole, { en: string; am: string; badgeColor: string }> = {
    COLLECTION_WORKER: {
      en: 'Collection Worker (Mobile)',
      am: 'ቆሻሻ ሰብሳቢ (ተንቀሳቃሽ)',
      badgeColor: 'bg-[#C85A32] text-white'
    },
    COMPOST_OPERATOR: {
      en: 'Compost Facility Operator',
      am: 'የማዳበሪያ ማቀነባበሪያ ኦፕሬተር',
      badgeColor: 'bg-[#1A3D2F] text-white'
    },
    SALES_OFFICER: {
      en: 'Sales & Distribution Officer',
      am: 'የሽያጭና ስርጭት ባለሙያ',
      badgeColor: 'bg-[#D4A017] text-stone-900'
    },
    OPERATIONS_MANAGER: {
      en: 'Operations Manager',
      am: 'የስራ አስኪያጅ (ማኔጀር)',
      badgeColor: 'bg-stone-900 text-white'
    },
    ADMINISTRATOR: {
      en: 'Administrator / Authority',
      am: 'ሲስተም አድሚን / ባለስልጣን',
      badgeColor: 'bg-emerald-900 text-white'
    }
  };

  return (
    <div className="relative">
      <button
        id="role-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#DDD8CD] bg-[#F8F6F0] hover:bg-[#EFECE3] transition text-left"
      >
        <div className="w-7 h-7 rounded-full bg-[#1A3D2F] text-[#F8F6F0] flex items-center justify-center text-xs font-bold shrink-0">
          {currentUser.avatarInitials}
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-bold text-stone-900 leading-tight">
            {language === 'am' ? currentUser.amharicName : currentUser.name}
          </span>
          <span className="text-[10px] text-stone-500 font-medium leading-tight">
            {language === 'am' ? roleLabels[currentUser.role].am : roleLabels[currentUser.role].en}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-[#DDD8CD] shadow-xl z-50 p-2 divide-y divide-[#EFECE3]">
          <div className="px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A3D2F]">
              <Shield className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>{t('Role-Based Operational Accounts', 'የተፈቀዱ የስራ ሚናዎች')}</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {t(
                'Switch persona to test tailored permissions and field interfaces.', 
                'የተለያዩ የስራ ኃላፊነቶችን በይነገጽ ለመፈተሽ ይምረጡ።'
              )}
            </p>
          </div>

          <div className="py-1 space-y-1">
            {(Object.keys(DEMO_USERS) as UserRole[]).map((roleKey) => {
              const u = DEMO_USERS[roleKey];
              const isCurrent = currentUser.role === roleKey;
              return (
                <button
                  key={roleKey}
                  onClick={() => {
                    switchUserRole(roleKey);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition ${
                    isCurrent 
                      ? 'bg-[#1A3D2F]/10 border border-[#1A3D2F]/30' 
                      : 'hover:bg-[#F8F6F0]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {u.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 truncate">
                        {language === 'am' ? u.amharicName : u.name}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-[#1A3D2F] flex items-center gap-0.5">
                          <UserCheck className="w-3 h-3" /> {t('Active', 'አሁን ላይ')}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-600 font-medium">
                      {language === 'am' ? roleLabels[roleKey].am : roleLabels[roleKey].en}
                    </div>
                    <div className="text-[10px] text-stone-400 truncate">
                      {u.assignedZone}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
