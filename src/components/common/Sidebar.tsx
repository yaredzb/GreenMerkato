import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Scale, 
  Store, 
  Layers, 
  Warehouse, 
  ShoppingBag, 
  TrendingUp, 
  FileText, 
  Users, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  MapPin,
  Sparkles
} from 'lucide-react';
import { AddisAbabaSeal, TibebStripe } from './EthiopicElements';

interface SidebarProps {
  onSelectTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectTab }) => {
  const { currentUser, activeTab, setActiveTab, alerts, pendingSyncQueue, t } = useApp();

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    if (onSelectTab) onSelectTab(tabId);
  };

  const unresolvedAlertsCount = alerts.filter(a => !a.resolved).length;
  const pendingCollectionsCount = pendingSyncQueue.length;

  // Determine permitted navigation items by role
  const getNavItems = () => {
    const role = currentUser.role;

    if (role === 'COLLECTION_WORKER') {
      return [
        { 
          id: 'worker_home', 
          label: t('Field Collection', 'የመስክ ምዝገባ'),
          amLabel: 'የቆሻሻ መመዘኛ', 
          icon: Scale,
          badge: pendingCollectionsCount > 0 ? `${pendingCollectionsCount} pending` : undefined,
          badgeColor: 'bg-[#B94726] text-white'
        },
        { 
          id: 'worker_history', 
          label: t("Today's Records", 'የዛሬ መዝገቦች'),
          amLabel: 'የተሰበሰበ ቆሻሻ',
          icon: CheckCircle2 
        },
        { 
          id: 'worker_vendors', 
          label: t('Assigned Route / Stalls', 'የተመደቡ ሱቆች'),
          amLabel: 'አትክልት ተራ ሱቆች',
          icon: MapPin 
        },
      ];
    }

    if (role === 'COMPOST_OPERATOR') {
      return [
        { 
          id: 'composting', 
          label: t('Compost Batches', 'የማዳበሪያ ባቾች'),
          amLabel: 'የረጲ ማፍላት ባቾች',
          icon: Layers 
        },
        { 
          id: 'compost_incoming', 
          label: t('Incoming Waste', 'የገባ ኦርጋኒክ ቆሻሻ'),
          amLabel: 'የመርካቶ ቅበላ',
          icon: Scale 
        },
        { 
          id: 'compost_quality', 
          label: t('Quality Checks & Lab', 'የጥራት ምርመራ'),
          amLabel: 'የሙቀትና እርጥበት ልኬት',
          icon: ShieldCheck 
        },
        { 
          id: 'inventory', 
          label: t('Finished Compost Stock', 'የተጠናቀቀ ማዳበሪያ'),
          amLabel: 'የማዳበሪያ ክምችት',
          icon: Warehouse 
        },
      ];
    }

    if (role === 'SALES_OFFICER') {
      return [
        { 
          id: 'inventory', 
          label: t('Compost Inventory', 'የማዳበሪያ ክምችት'),
          amLabel: 'ያለቀለት ማዳበሪያ',
          icon: Warehouse 
        },
        { 
          id: 'sales', 
          label: t('Sales & Distribution', 'ሽያጭና ስርጭት'),
          amLabel: 'የገበሬዎች ትዕዛዝ',
          icon: ShoppingBag 
        },
        { 
          id: 'buyers', 
          label: t('Farmers & Cooperatives', 'አርሶ አደሮችና ኅብረቶች'),
          amLabel: 'የኦሮሚያና ሸዋ ገበሬዎች',
          icon: Users 
        },
        { 
          id: 'reports', 
          label: t('Sales Ledger & Receipts', 'የሽያጭ መዝገብ'),
          amLabel: 'የቴሌብርና ሲቢኢ ደረሰኝ',
          icon: FileText 
        },
      ];
    }

    // Operations Manager and Administrator
    const items = [
      { 
        id: 'overview', 
        label: t('Operations Overview', 'አጠቃላይ የስራ ሁኔታ'),
        amLabel: 'ዋና የቁጥጥር ማዕከል',
        icon: LayoutDashboard,
        badge: unresolvedAlertsCount > 0 ? `${unresolvedAlertsCount} alerts` : undefined,
        badgeColor: 'bg-[#B94726] text-white'
      },
      { 
        id: 'collection', 
        label: t('Collection Operations', 'የቆሻሻ አሰባሰብ'),
        amLabel: 'የመርካቶ የቀን አሰባሰብ',
        icon: Scale 
      },
      { 
        id: 'vendors', 
        label: t('Merkato Vendors', 'የመርካቶ ነጋዴዎች'),
        amLabel: 'የተመዘገቡ የሱቅ ነጋዴዎች',
        icon: Store 
      },
      { 
        id: 'composting', 
        label: t('Compost Processing', 'ማዳበሪያ ማቀነባበር'),
        amLabel: 'የረጲ ኮምፖስት ማዕከል',
        icon: Layers 
      },
      { 
        id: 'inventory', 
        label: t('Compost Inventory', 'የተጠናቀቀ ክምችት'),
        amLabel: 'የክፍል 1 እና 2 ማዳበሪያ',
        icon: Warehouse 
      },
      { 
        id: 'sales', 
        label: t('Sales & Distribution', 'ሽያጭና ገበሬዎች'),
        amLabel: 'ለገበሬ ኅብረት ስርጭት',
        icon: ShoppingBag 
      },
      { 
        id: 'impact', 
        label: t('Impact Verification', 'የአካባቢ ተፅዕኖ ማረጋገጫ'),
        amLabel: 'የካርቦንና ቆሻሻ ቅነሳ',
        icon: TrendingUp 
      },
      { 
        id: 'reports', 
        label: t('Operational Reports', 'ኦፕሬሽናል ሪፖርቶች'),
        amLabel: 'የከተማው ወርሃዊ ሪፖርት',
        icon: FileText 
      }
    ];

    if (role === 'ADMINISTRATOR') {
      items.push(
        { 
          id: 'team', 
          label: t('User Management & Roles', 'ተጠቃሚዎችና ፈቃዶች'),
          amLabel: 'የሰራተኞች የስራ ድርሻ',
          icon: Users 
        },
        { 
          id: 'audit', 
          label: t('System Audit Log', 'የኦዲት መዝገብ'),
          amLabel: 'የተረጋገጡ የሂደት መዛግብት',
          icon: ShieldCheck 
        }
      );
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <aside className="w-68 bg-[#142318] text-[#FAF7F0] flex flex-col justify-between h-full select-none border-r border-[#1F3323] shadow-md">
      <div className="flex flex-col">
        {/* Addis Ababa Municipal Jurisdiction Badge */}
        <div className="p-3.5 mx-3 mt-3.5 mb-2 rounded-xl bg-gradient-to-b from-[#1E3624] to-[#172B1C] border border-[#DF9F28]/30 text-xs shadow-inner">
          <div className="flex items-center gap-2.5">
            <AddisAbabaSeal size="sm" />
            <div className="min-w-0">
              <div className="text-[10px] font-bold tracking-wider text-[#DF9F28] uppercase flex items-center gap-1">
                <span>አዲስ አበባ • መርካቶ</span>
              </div>
              <div className="font-bold text-white text-xs truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#A6C5A9] truncate font-medium">
                {currentUser.role.replace('_', ' ')}
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#DF9F28]/20 flex items-center justify-between text-[10px] text-stone-300">
            <span className="truncate">{currentUser.assignedZone}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
          </div>
        </div>

        <div className="px-5 py-1.5 flex items-center justify-between text-[10px] font-bold text-[#A6C5A9] uppercase tracking-wider">
          <span>{t('Operational Modules', 'ዋና የስራ ክፍሎች')}</span>
          <span className="text-[#DF9F28]">❖</span>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 py-1 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`w-full relative flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#223D29] text-white shadow-xs'
                    : 'text-stone-300/80 hover:text-white hover:bg-[#1A2E20]'
                }`}
              >
                {/* Active Indicator with Ethiopian Gold accent */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#DF9F28]" />
                )}

                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-[#DF9F28] text-[#142318]' 
                      : 'bg-white/5 text-stone-300 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="truncate text-xs font-medium">{item.label}</div>
                    <div className="text-[10px] text-[#A6C5A9] truncate font-sans">{item.amLabel}</div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-[#B94726] text-white'} shrink-0`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Info & Ethiopian Circularity Stamp */}
      <div className="mt-auto select-none">
        <TibebStripe height={3} />
        <div className="p-3.5 bg-[#0D1810] border-t border-[#1F3323] text-[10px] text-stone-400">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF9F28]" />
              መርካቶ • ረጲ ያርድ
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#DF9F28]/20 text-[#DF9F28] border border-[#DF9F28]/40 font-bold">
              v2.4
            </span>
          </div>
          <p className="text-[9px] text-[#8EA891] mt-1 leading-tight">
            የአዲስ አበባ ከተማ አስተዳደር ኦርጋኒክ ማዳበሪያ ፕሮጀክት
          </p>
        </div>
      </div>
    </aside>
  );
};

