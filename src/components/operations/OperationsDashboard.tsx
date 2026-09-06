import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scale, 
  Store, 
  Layers, 
  Warehouse, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Thermometer,
  Wind,
  MapPin
} from 'lucide-react';
import { BatchStage } from '../../types';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider, MerkatoTeraPill } from '../common/EthiopicElements';


export const OperationsDashboard: React.FC = () => {
  const { 
    collections, 
    vendors, 
    batches, 
    inventory, 
    sales, 
    alerts, 
    resolveAlert, 
    auditLogs, 
    setActiveTab, 
    t, 
    language 
  } = useApp();

  const [selectedAlertCategory, setSelectedAlertCategory] = useState<'all' | 'unresolved'>('unresolved');

  // Operational calculations
  const todayTotalKg = collections.reduce((acc, c) => acc + c.weightKg, 0);
  const targetTotalKg = 2500; // Merkato daily operational baseline target
  const collectionProgressPct = Math.min(100, Math.round((todayTotalKg / targetTotalKg) * 100));

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.participationStatus === 'active').length;
  const vendorParticipationRate = Math.round((activeVendors / totalVendors) * 100);

  const completedCollectionsCount = collections.length;
  const contaminatedCollectionsCount = collections.filter(c => c.quality !== 'clean').length;
  const overallContaminationRate = completedCollectionsCount > 0 
    ? Number(((contaminatedCollectionsCount / completedCollectionsCount) * 100).toFixed(1)) 
    : 0;

  const activeBatches = batches.filter(b => b.status === 'in_progress' || b.status === 'ready_for_testing');
  const finishedCompostAvailableKg = inventory.reduce((acc, i) => acc + i.availableKg, 0);

  const filteredAlerts = alerts.filter(a => selectedAlertCategory === 'all' ? true : !a.resolved);

  const getStageBadge = (stage: BatchStage) => {
    const stageConfig: Record<BatchStage, { label: string; labelAm: string; color: string }> = {
      waste_received: { label: 'Waste Received', labelAm: 'ቆሻሻ ገብቷል', color: 'bg-stone-100 text-stone-800' },
      batch_created: { label: 'Batch Created', labelAm: 'ባች ተቋቁሟል', color: 'bg-blue-100 text-blue-800' },
      active_composting: { label: 'Active Composting', labelAm: 'ሙቀት ማፍላት', color: 'bg-amber-100 text-amber-900 border border-amber-300' },
      maturation: { label: 'Maturation / Curing', labelAm: 'ማብሰል ደረጃ', color: 'bg-purple-100 text-purple-900' },
      quality_check: { label: 'Quality Testing', labelAm: 'የጥራት ፍተሻ', color: 'bg-indigo-100 text-indigo-900' },
      finished_compost: { label: 'Finished Compost', labelAm: 'ዝግጁ ማዳበሪያ', color: 'bg-emerald-100 text-emerald-900' }
    };
    const c = stageConfig[stage] || stageConfig.active_composting;
    return (
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${c.color}`}>
        {language === 'am' ? c.labelAm : c.label}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Addis Ababa Municipal Operations Banner */}
      <div className="ethiopic-card bg-gradient-to-r from-[#FAF7F0] via-[#FFFFFF] to-[#FAF7F0] border border-[#DFD9CE] shadow-xs rounded-xl overflow-hidden">
        <TibebStripe height={5} />
        
        <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <AddisAbabaSeal size="md" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C462C] tracking-tight">
                  {t('Operational Command Center', 'የስራ አመራርና ቁጥጥር ማዕከል')}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C462C] text-[#FAF7F0] text-[10px] font-bold border border-[#DF9F28]/40 shadow-2xs">
                  መርካቶ • ረጲ ያርድ
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#B94726]/10 text-[#B94726] border border-[#B94726]/25 text-[10px] font-bold font-mono">
                  ADDIS ABABA
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 font-medium leading-relaxed">
                {t(
                  'Addis Ketema Municipal Organic Separation • Repi Circular Conversion Facility & Compost Grid.',
                  'የአዲስ ከተማ ክፍለ ከተማ ኦርጋኒክ ቆሻሻ አሰባሰብ፣ የረጲ ማዳበሪያ ዝግጅት፣ ክምችት እና የስርጭት የቀጥታ መቆጣጠሪያ።'
                )}
              </p>
            </div>
          </div>

          {/* Action buttons with Ethiopian styling */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('reports')}
              className="px-3.5 py-2 border border-[#DFD9CE] bg-white text-xs font-semibold rounded-lg hover:bg-[#F3EFE6] text-stone-700 transition shadow-2xs"
            >
              {t('Operational Reports', 'ኦፕሬሽናል ሪፖርት')}
            </button>
            <button
              onClick={() => setActiveTab('collection')}
              className="px-4 py-2 btn-primary text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
            >
              <Scale className="w-3.5 h-3.5 text-[#DF9F28]" />
              <span>{t('New Collection Run', 'አዲስ የቆሻሻ ምዝገባ')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOP 6 KPI CARDS (Polished with Ethiopian Natural Tones & Ethiopic touches) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* 1. Waste Collected Today */}
        <div className="kpi-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Waste Today', 'የዛሬ ቆሻሻ')}</span>
            <Scale className="w-3.5 h-3.5 text-[#1C462C]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1C462C] mt-1.5">
            {todayTotalKg.toFixed(0)} <span className="text-xs font-normal text-stone-500">kg</span>
          </div>
          <div className="text-[10px] text-[#1C462C] font-semibold mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C462C]" />
            <span>{collectionProgressPct}% {t('of quota', 'የቀን ዒላማ')}</span>
          </div>
        </div>

        {/* 2. Participating Vendors */}
        <div className="kpi-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Vendors', 'ነጋዴዎች')}</span>
            <Store className="w-3.5 h-3.5 text-[#B94726]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900 mt-1.5">
            {activeVendors} <span className="text-xs font-normal text-stone-400">/ {totalVendors}</span>
          </div>
          <div className="text-[10px] text-stone-600 font-medium mt-1">
            {vendorParticipationRate}% {t('active participation', 'ተሳታፊ')}
          </div>
        </div>

        {/* 3. Collections Completed */}
        <div className="kpi-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Collections', 'ምዝገባዎች')}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1C462C]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900 mt-1.5">
            {completedCollectionsCount}
          </div>
          <div className="text-[10px] text-stone-500 font-medium mt-1">
            {t('Today total runs', 'የተመዘገቡ ዙሮች')}
          </div>
        </div>

        {/* 4. Contamination Rate */}
        <div className="kpi-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Contamination', 'የብክለት ምጣኔ')}</span>
            <AlertTriangle className={`w-3.5 h-3.5 ${overallContaminationRate > 5 ? 'text-[#B94726]' : 'text-stone-400'}`} />
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-mono mt-1.5 ${
            overallContaminationRate > 5 ? 'text-[#B94726]' : 'text-[#1C462C]'
          }`}>
            {overallContaminationRate}%
          </div>
          <div className="text-[10px] text-stone-500 font-medium mt-1">
            {t('Target: < 4%', 'ዒላማ፡ < 4%')}
          </div>
        </div>

        {/* 5. Active Compost Batches */}
        <div className="kpi-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Active Batches', 'ንቁ ባቾች')}</span>
            <Layers className="w-3.5 h-3.5 text-[#7A4B29]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900 mt-1.5">
            {activeBatches.length} <span className="text-xs font-normal text-stone-500">batches</span>
          </div>
          <div className="text-[10px] text-[#7A4B29] font-medium mt-1 truncate">
            {batches.reduce((sum, b) => sum + (b.status === 'in_progress' ? b.inputWeightKg : 0), 0).toLocaleString()} kg {t('curing', 'በማፍላት ላይ')}
          </div>
        </div>

        {/* 6. Finished Compost Available */}
        <div className="kpi-card p-4">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Compost Stock', 'ያለቀለት ማዳበሪያ')}</span>
            <Warehouse className="w-3.5 h-3.5 text-[#1C462C]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1C462C] mt-1.5">
            {(finishedCompostAvailableKg / 1000).toFixed(1)} <span className="text-xs font-normal text-stone-500">MT</span>
          </div>
          <div className="text-[10px] text-stone-600 font-medium mt-1">
            {finishedCompostAvailableKg.toLocaleString()} kg {t('ready', 'ዝግጁ')}
          </div>
        </div>
      </div>

      {/* MID ROW: Today's Progress Bar & Operational Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Today's Collection Progress (Collected vs Target) */}
        <div className="ethiopic-card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C462C] flex items-center gap-1.5">
                <span className="text-[#DF9F28]">◈</span>
                <span>{t("Today's Collection Progress", 'የዛሬው ቆሻሻ አሰባሰብ ግስጋሴ')}</span>
              </h3>
              <span className="font-mono text-xs font-bold text-[#1C462C] bg-[#1C462C]/5 px-2 py-0.5 rounded border border-[#1C462C]/15">
                {todayTotalKg.toFixed(0)} / {targetTotalKg} kg
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {t('Merkato daily organic separation intake quota', 'የመርካቶ የቀን ኦርጋኒክ ቆሻሻ ቅበላ ኮታ')}
            </p>

            {/* Visual Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-[#F3EFE6] rounded-full h-3 overflow-hidden p-0.5 border border-[#DFD9CE]">
                <div 
                  className="bg-gradient-to-r from-[#1C462C] to-[#2E6B47] h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${collectionProgressPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 mt-1.5 font-mono">
                <span>0 kg</span>
                <span className="font-bold text-[#1C462C]">{collectionProgressPct}% {t('reached', 'ተሰብስቧል')}</span>
                <span>{targetTotalKg} kg {t('Target', 'ዒላማ')}</span>
              </div>
            </div>

            {/* Authentic Merkato Market Zones Breakdown */}
            <div className="mt-5 space-y-2.5 border-t border-[#DFD9CE] pt-4">
              <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                <span>{t('Intake by Market Zone:', 'የቆሻሻ ምንጭ በየገበያ ዞኑ፡')}</span>
                <span className="text-[10px] text-[#B94726] font-mono">መርካቶ</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-[#FAF7F0] p-2 rounded border border-[#DFD9CE]/60">
                  <div className="flex items-center gap-2">
                    <MerkatoTeraPill zone="Atikilt Tera" amharicZone="አትክልት ተራ" />
                    <span className="text-stone-500 text-[10px]">ፍራፍሬና አትክልት</span>
                  </div>
                  <span className="font-mono font-bold text-stone-900">70.5 kg</span>
                </div>
                <div className="flex justify-between items-center bg-[#FAF7F0] p-2 rounded border border-[#DFD9CE]/60">
                  <div className="flex items-center gap-2">
                    <MerkatoTeraPill zone="Bomb Tera" amharicZone="ቦምብ ተራ" />
                    <span className="text-stone-500 text-[10px]">ሙዝና ጥራጥሬ</span>
                  </div>
                  <span className="font-mono font-bold text-stone-900">64.0 kg</span>
                </div>
                <div className="flex justify-between items-center bg-[#FAF7F0] p-2 rounded border border-[#DFD9CE]/60">
                  <div className="flex items-center gap-2">
                    <MerkatoTeraPill zone="Shera Tera" amharicZone="ሽራ ተራ" />
                    <span className="text-stone-500 text-[10px]">እህልና ቅጠላቅጠል</span>
                  </div>
                  <span className="font-mono font-bold text-stone-900">35.2 kg</span>
                </div>
                <div className="flex justify-between items-center bg-[#FAF7F0] p-2 rounded border border-[#DFD9CE]/60">
                  <div className="flex items-center gap-2">
                    <MerkatoTeraPill zone="Sebategna" amharicZone="ሰባተኛ" />
                    <span className="text-stone-500 text-[10px]">ቅመማቅመም</span>
                  </div>
                  <span className="font-mono font-bold text-stone-900">19.4 kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#DFD9CE]">
            <button
              onClick={() => setActiveTab('vendors')}
              className="text-xs font-bold text-[#1C462C] hover:text-[#B94726] flex items-center justify-between w-full transition"
            >
              <span>{t('Manage Participating Vendors', 'የመርካቶ ነጋዴዎችን ዝርዝር አስተዳድር')}</span>
              <ChevronRight className="w-4 h-4 text-[#DF9F28]" />
            </button>
          </div>
        </div>

        {/* Right: Operational Alerts with authentic Tibeb border */}
        <div className="ethiopic-card p-5 tibeb-border lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFD9CE]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B94726]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {t('Operational Alerts & Flags', 'ኦፕሬሽናል ማንቂያዎችና ማሳሰቢያዎች')}
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedAlertCategory('unresolved')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  selectedAlertCategory === 'unresolved' ? 'bg-[#1C462C] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                }`}
              >
                {t('Active', 'አሁን ላይ')}
              </button>
              <button
                onClick={() => setSelectedAlertCategory('all')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  selectedAlertCategory === 'all' ? 'bg-[#1C462C] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                }`}
              >
                {t('All', 'ሁሉም')}
              </button>
            </div>
          </div>

          <div className="divide-y divide-stone-100 mt-2">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-[#BC6C25] shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-900">
                      {language === 'am' ? alert.titleAm : alert.title}
                    </h4>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      {language === 'am' ? alert.descriptionAm : alert.description}
                    </p>
                    <div className="text-[10px] text-stone-400 mt-1 flex items-center gap-2">
                      <span>{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>•</span>
                      <span className="capitalize">{alert.category}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {alert.resolved ? (
                    <span className="status-chip bg-stone-100 text-stone-600 font-medium">
                      {t('Resolved', 'ተፈቷል')}
                    </span>
                  ) : (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1.5 rounded border border-[#E0DDD5] bg-[#F9F7F2] hover:bg-[#2D4F1E] hover:text-white text-stone-700 text-xs font-semibold transition shadow-xs"
                    >
                      {t('Acknowledge', 'ተቀበል / ፍታ')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVE COMPOST BATCHES TABLE */}
      <div className="ethiopic-card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DFD9CE]">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1C462C] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#DF9F28]" />
              <span>{t('Active Compost Lifecycle & Monitoring', 'የማዳበሪያ ባቾች ሁኔታ (ረጲ ያርድ)')}</span>
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              {t('Biological decomposition kinetics, thermophilic cycle, and pile turning protocols.', 'የሙቀት መጠን፣ እርጥበት እና የማገላበጥ ሁኔታ ክትትል።')}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('composting')}
            className="text-xs font-semibold text-[#B94726] hover:text-[#1C462C] flex items-center gap-1 transition"
          >
            <span>{t('View All Batches →', 'ሁሉንም ባቾች እይ →')}</span>
          </button>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF7F0] text-stone-700 font-bold uppercase text-[10px] tracking-wider border-b border-[#DFD9CE]">
              <tr>
                <th className="py-3 px-3">{t('Batch ID', 'የባች ቁጥር')}</th>
                <th className="py-3 px-3">{t('Input Weight', 'የገባ ቆሻሻ')}</th>
                <th className="py-3 px-3">{t('Start Date', 'የተጀመረበት')}</th>
                <th className="py-3 px-3">{t('Current Stage', 'ያለበት ደረጃ')}</th>
                <th className="py-3 px-3">{t('Core Temp', 'ሙቀት')}</th>
                <th className="py-3 px-3">{t('Moisture', 'እርጥበት')}</th>
                <th className="py-3 px-3">{t('Turns', 'ማገላበጥ')}</th>
                <th className="py-3 px-3 text-right">{t('Action', 'ተግባር')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFD9CE]/60">
              {batches.map(b => {
                const daysActive = Math.floor((new Date().getTime() - new Date(b.startDate).getTime()) / (1000 * 3600 * 24));
                return (
                  <tr key={b.id} className="hover:bg-[#FAF7F0] transition">
                    <td className="py-3.5 px-3">
                      <div className="font-mono font-bold text-stone-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1C462C]" />
                        <span>{b.batchNumber}</span>
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium pl-3">{b.responsibleOperator}</div>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-stone-800">
                      {b.inputWeightKg.toLocaleString()} kg
                    </td>
                    <td className="py-3.5 px-3 text-stone-600">
                      <div>{b.startDate}</div>
                      <div className="text-[10px] text-stone-400">{daysActive} {t('days active', 'ቀናት')}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      {getStageBadge(b.currentStage)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`font-mono font-bold flex items-center gap-1 ${
                        b.currentTempC >= 55 ? 'text-[#1C462C]' : 'text-[#B94726]'
                      }`}>
                        <Thermometer className="w-3.5 h-3.5" />
                        {b.currentTempC}°C
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-medium text-stone-700">
                      {b.currentMoisturePct}%
                    </td>
                    <td className="py-3.5 px-3 font-mono text-stone-700">
                      {b.turnsCount}x
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setActiveTab('composting')}
                        className="px-3 py-1 rounded border border-[#DFD9CE] bg-[#FAF7F0] font-semibold text-stone-800 hover:bg-[#1C462C] hover:text-white transition shadow-2xs"
                      >
                        {t('Details', 'ዝርዝር')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM SECTION: CIRCULAR IMPACT & RECENT ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ethiopian Circular Impact Summary Widget */}
        <div className="ethiopic-card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DFD9CE]">
              <h3 className="font-serif font-bold text-base text-[#1C462C] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DF9F28]" />
                <span>{t('Circular Impact Verification', 'የአካባቢ ተፅዕኖ ማረጋገጫ')}</span>
              </h3>
              <button
                onClick={() => setActiveTab('impact')}
                className="text-xs font-semibold text-[#B94726] hover:text-[#1C462C] transition"
              >
                {t('Details →', 'ዝርዝር →')}
              </button>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-stone-600 font-medium">{t('Total Waste Diverted from Dumpsites', 'ከቆሻሻ መጣያ የዳነ ኦርጋኒክ')}</span>
                  <span className="text-lg font-bold font-mono text-[#1C462C]">142.5 Tons</span>
                </div>
                <div className="w-full bg-[#F3EFE6] h-2.5 rounded-full overflow-hidden mt-1.5 border border-[#DFD9CE]">
                  <div className="bg-gradient-to-r from-[#1C462C] to-[#DF9F28] h-full w-3/4 rounded-full transition-all shadow-2xs" />
                </div>
                <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
                  <span>{t('Annual Goal: 200 Tons', 'የዓመት ዒላማ፡ 200 ቶን')}</span>
                  <span className="font-bold text-[#1C462C]">71.2% Reached</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DFD9CE] grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE]">
                  <div className="text-[10px] uppercase font-bold text-stone-600">Methane Avoided (የካርቦን ቅነሳ)</div>
                  <div className="font-mono font-bold text-[#7A4B29] text-sm mt-0.5">85.5 MT CO₂e</div>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE]">
                  <div className="text-[10px] uppercase font-bold text-stone-600">Landfill Saved (የቦታ ቁጠባ)</div>
                  <div className="font-mono font-bold text-[#1C462C] text-sm mt-0.5">285.0 m³</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C462C]" />
              ረጲ የቆሻሻ ማከማቻ መልሶ ማልማት
            </span>
            <span className="text-[#1C462C] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1C462C]/10 border border-[#1C462C]/20 text-[10px]">
              IPCC Tier 1
            </span>
          </div>
        </div>

        {/* Recent Operational Activity Feed */}
        <div className="ethiopic-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFD9CE]">
            <div>
              <h3 className="font-serif font-bold text-base text-[#1C462C] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DF9F28]" />
                <span>{t('Recent Operational Activity Log', 'የቅርብ ጊዜ የስራ እንቅስቃሴዎች')}</span>
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                {t('Authenticated municipal records of collections, testing, turning, and distribution.', 'የተፈጸሙ ምዝገባዎች፣ የጥራት ፍተሻዎች እና ሽያጭ ማረጋገጫዎች።')}
              </p>
            </div>
            
            <button
              onClick={() => setActiveTab('audit')}
              className="text-xs font-semibold text-[#B94726] hover:text-[#1C462C] transition flex items-center gap-1"
            >
              <span>{t('View Full Audit Trail →', 'ሙሉ የኦዲት መዝገብ →')}</span>
            </button>
          </div>

          <div className="divide-y divide-[#DFD9CE]/60 mt-1">
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">
                      {language === 'am' ? log.actionAm : log.action.replace('_', ' ')}
                    </span>
                    <span className="status-chip bg-[#FAF7F0] text-[#7A4B29] border border-[#DFD9CE] font-mono">
                      {log.entityType}
                    </span>
                  </div>
                  <p className="text-stone-600 mt-0.5 leading-snug">
                    {log.details}
                  </p>
                  <div className="text-[10px] text-stone-400 mt-1 flex items-center gap-2">
                    <span className="font-semibold text-stone-700">{log.userName}</span>
                    <span>({log.userRole.replace('_', ' ')})</span>
                    <span>•</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-bold text-[#1C462C] bg-[#1C462C]/5 px-2.5 py-1 rounded border border-[#1C462C]/20">
                    {log.newValue.length > 25 ? log.newValue.slice(0, 25) + '...' : log.newValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
