import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CollectionWorkflow } from './CollectionWorkflow';
import { 
  Scale, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  Calendar,
  Layers,
  Store
} from 'lucide-react';

export const CollectionWorkerHome: React.FC = () => {
  const { 
    currentUser, 
    collections, 
    vendors, 
    pendingSyncQueue, 
    isSimulatedOffline, 
    toggleSimulatedOffline,
    syncPendingRecords,
    t, 
    language 
  } = useApp();

  const [isCollecting, setIsCollecting] = useState(false);

  // Today's collections for this worker
  const todayStr = new Date().toISOString().split('T')[0];
  const myTodayCollections = collections.filter(c => c.collectorId === currentUser.id);
  
  const todayTotalKg = myTodayCollections.reduce((sum, c) => sum + c.weightKg, 0);
  const completedCount = myTodayCollections.length;
  const targetKg = 450; // daily route target
  const progressPct = Math.min(100, Math.round((todayTotalKg / targetKg) * 100));

  if (isCollecting) {
    return (
      <div className="py-2">
        <CollectionWorkflow 
          onComplete={() => setIsCollecting(false)}
          onCancel={() => setIsCollecting(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 pb-12">
      {/* Worker Greeting & Assigned Area */}
      <div className="rounded-2xl bg-[#1A3D2F] text-white p-4 shadow-md relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-4 border-[#D4A017]/20 pointer-events-none" />
        
        <div className="flex items-center justify-between text-xs text-[#D4A017] font-semibold">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-stone-200">
            {language === 'am' ? currentUser.amharicName : currentUser.name}
          </span>
        </div>

        <div className="mt-3">
          <div className="text-[11px] uppercase tracking-wider text-stone-300 font-bold">
            {t("Today's Area & Route", 'የዛሬው የስራ ክልልና መስመር')}
          </div>
          <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>{currentUser.assignedZone || 'Atikilt Tera (Fruit & Veg)'}</span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            {t('Target: Stalls AT-100 to AT-140 • Organic Produce', 'ዒላማ፡ ሱቆች AT-100 እስከ AT-140 • አትክልትና ፍራፍሬ')}
          </p>
        </div>
      </div>

      {/* Primary Hero Action Button: Start Collection */}
      <button
        id="start-collection-main-btn"
        onClick={() => setIsCollecting(true)}
        className="w-full py-4 px-6 rounded-2xl bg-[#C85A32] text-white font-extrabold text-lg shadow-lg hover:bg-[#B2533E] active:scale-98 transition flex items-center justify-between border-2 border-[#D86B43]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="leading-tight">{t('Start Collection', 'ቆሻሻ መመዝገብ ጀምር')}</div>
            <div className="text-[11px] font-normal text-white/80">{t('Scan QR or select stall', 'QR ይቃኙ ወይም ሱቅ ይምረጡ')}</div>
          </div>
        </div>
        <ArrowRight className="w-6 h-6 text-[#F8F6F0]" />
      </button>

      {/* Sync / Offline Banner */}
      <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
        isSimulatedOffline
          ? 'bg-amber-50/90 border-amber-300 text-amber-900'
          : 'bg-emerald-50/90 border-emerald-300 text-emerald-900'
      }`}>
        <div className="flex items-center gap-2">
          {isSimulatedOffline ? (
            <WifiOff className="w-4 h-4 text-amber-700" />
          ) : (
            <Wifi className="w-4 h-4 text-emerald-700" />
          )}
          <div>
            <div className="font-bold">
              {isSimulatedOffline 
                ? t('Offline Mode Active', 'ከመስመር ውጭ ሁነታ ላይ ነው') 
                : t('Central Server Connected', 'ከዋናው ሰርቨር ጋር ተገናኝቷል')}
            </div>
            <div className="text-[11px] text-stone-600">
              {pendingSyncQueue.length > 0
                ? t(`${pendingSyncQueue.length} records waiting to sync`, `${pendingSyncQueue.length} መዝገቦች በመጠባበቅ ላይ`)
                : t('All collected records synchronized', 'ሁሉም መረጃዎች ተመሳስለዋል')}
            </div>
          </div>
        </div>

        {pendingSyncQueue.length > 0 && !isSimulatedOffline && (
          <button
            onClick={syncPendingRecords}
            className="px-3 py-1.5 rounded-lg bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F]"
          >
            {t('Sync Now', 'አሁን አመሳስል')}
          </button>
        )}
      </div>

      {/* Daily Progress Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Waste Collected Today */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            {t('Waste Collected Today', 'የዛሬው የተሰበሰበ ቆሻሻ')}
          </div>
          <div className="text-2xl font-extrabold text-[#1A3D2F] mt-1 font-mono">
            {todayTotalKg.toFixed(1)} <span className="text-xs font-normal text-stone-500">kg</span>
          </div>
          <div className="mt-2 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#1A3D2F] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="text-[10px] text-stone-400 mt-1 flex justify-between">
            <span>{progressPct}% {t('of route target', 'የዒላማ')}</span>
            <span>{targetKg} kg</span>
          </div>
        </div>

        {/* Collections Completed */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            {t('Collections Completed', 'የተጠናቀቁ ምዝገባዎች')}
          </div>
          <div className="text-2xl font-extrabold text-[#C85A32] mt-1 font-mono">
            {completedCount} <span className="text-xs font-normal text-stone-500">{t('stalls', 'ሱቆች')}</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-2">
            {t('Average per stall:', 'አማካይ በሱቅ፡')}{' '}
            <span className="font-semibold text-stone-800">
              {completedCount > 0 ? (todayTotalKg / completedCount).toFixed(1) : 0} kg
            </span>
          </div>
        </div>
      </div>

      {/* Recent Records List */}
      <div className="bg-white rounded-2xl border border-[#DDD8CD] p-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DDD8CD]">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1A3D2F]" />
            <span>{t('Recent Today Collections', 'የዛሬ የቅርብ ምዝገባዎች')}</span>
          </div>
          <span className="text-[11px] text-stone-400">{myTodayCollections.length} total</span>
        </div>

        {myTodayCollections.length === 0 ? (
          <div className="py-6 text-center text-xs text-stone-500">
            <p>{t('No collections recorded yet today.', 'ዛሬ የተመዘገበ ቆሻሻ የለም።')}</p>
            <p className="text-stone-400 mt-0.5">{t('Tap "Start Collection" to weigh first stall.', 'የመጀመሪያውን ሱቅ ለመመዝገብ "ቆሻሻ መመዝገብ ጀምር"ን ይጫኑ።')}</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {myTodayCollections.slice(0, 5).map(record => (
              <div key={record.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-stone-900 bg-[#F8F6F0] px-1.5 py-0.2 rounded border border-[#DDD8CD]">
                      {record.stall}
                    </span>
                    <span className="font-semibold text-stone-800 truncate max-w-[150px]">
                      {record.vendorName}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5 flex items-center gap-2">
                    <span>{new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span className={record.quality === 'clean' ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
                      {record.quality === 'clean' ? t('Clean', 'ጽዱ') : t('Minor Contam', 'ትንሽ ብክለት')}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-[#1A3D2F]">
                    {record.weightKg} kg
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                    record.syncStatus === 'synced' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {record.syncStatus === 'synced' ? t('Synced', 'ተመሳስሏል') : t('Queued', 'ተራ ላይ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
