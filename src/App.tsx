import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { PublicWebsite } from './components/public/PublicWebsite';
import { CollectionWorkerHome } from './components/collection/CollectionWorkerHome';
import { OperationsDashboard } from './components/operations/OperationsDashboard';
import { CompostManagement } from './components/compost/CompostManagement';
import { VendorManagement } from './components/vendors/VendorManagement';
import { SalesAndInventory } from './components/sales/SalesAndInventory';
import { ImpactAndTraceability } from './components/impact/ImpactAndTraceability';
import { ReportsAndAudit } from './components/reports/ReportsAndAudit';
import { TeamManagement } from './components/admin/TeamManagement';
import { 
  Scale, 
  Store, 
  Layers, 
  Warehouse, 
  ShoppingBag, 
  TrendingUp, 
  LayoutDashboard, 
  CheckCircle2, 
  Users,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, activeTab, setActiveTab, t } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Render view based on active tab and role permissions
  const renderContent = () => {
    // Collection Worker specialized field experience
    if (currentUser.role === 'COLLECTION_WORKER') {
      if (activeTab === 'worker_vendors') {
        return <VendorManagement />;
      }
      return <CollectionWorkerHome />;
    }

    switch (activeTab) {
      case 'overview':
        return <OperationsDashboard />;
      case 'collection':
      case 'worker_home':
        return <CollectionWorkerHome />;
      case 'vendors':
        return <VendorManagement />;
      case 'composting':
      case 'compost_incoming':
      case 'compost_quality':
        return <CompostManagement />;
      case 'inventory':
      case 'sales':
      case 'buyers':
        return <SalesAndInventory />;
      case 'impact':
        return <ImpactAndTraceability />;
      case 'reports':
      case 'audit':
        return <ReportsAndAudit />;
      case 'team':
        return <TeamManagement />;
      default:
        return <OperationsDashboard />;
    }
  };

  const isCollectionWorker = currentUser.role === 'COLLECTION_WORKER';

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1F1F1F] flex flex-col font-sans antialiased">
      {/* Top Header */}
      <Header 
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (Only for managerial, facility, or desktop workers) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="relative w-72 bg-[#1F241D] text-white h-full shadow-2xl z-10 flex flex-col">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-white">GreenMerkato Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar onSelectTab={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 bg-[#F9F7F2]">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation for Field / Low-Res Use */}
      <nav className="lg:hidden border-t border-[#E0DDD5] bg-[#F9F7F2]/95 backdrop-blur-md px-2 py-1.5 flex items-center justify-around text-[10px] font-bold z-30 select-none">
        {isCollectionWorker ? (
          <>
            <button
              onClick={() => setActiveTab('worker_home')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'worker_home' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{t('Collection', 'ምዝገባ')}</span>
            </button>

            <button
              onClick={() => setActiveTab('worker_history')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'worker_history' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("Today's Run", 'የዛሬ ሩጫ')}</span>
            </button>

            <button
              onClick={() => setActiveTab('worker_vendors')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'worker_vendors' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{t('Stalls', 'ሱቆች')}</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'overview' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('Overview', 'ማጠቃለያ')}</span>
            </button>

            <button
              onClick={() => setActiveTab('collection')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'collection' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{t('Waste', 'ቆሻሻ')}</span>
            </button>

            <button
              onClick={() => setActiveTab('composting')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'composting' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t('Batches', 'ባቾች')}</span>
            </button>

            <button
              onClick={() => setActiveTab('sales')}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition ${
                activeTab === 'sales' ? 'text-[#2D4F1E] font-extrabold' : 'text-stone-400'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('Sales', 'ሽያጭ')}</span>
            </button>
          </>
        )}
      </nav>

      {/* Global Toast Notification */}
      <Toast />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { viewMode } = useApp();

  if (viewMode === 'public') {
    return (
      <>
        <PublicWebsite />
        <Toast />
      </>
    );
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
