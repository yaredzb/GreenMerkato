import React from 'react';
import { Wifi, WifiOff, RefreshCw, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineIndicator: React.FC = () => {
  const { 
    isSimulatedOffline, 
    toggleSimulatedOffline, 
    pendingSyncQueue, 
    syncPendingRecords,
    t 
  } = useApp();

  const pendingCount = pendingSyncQueue.length;

  return (
    <div className="flex items-center gap-2">
      {/* Simulation Toggle & Status Pill */}
      <div 
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
          isSimulatedOffline
            ? 'bg-[#B2533E]/10 border-[#B2533E] text-[#B2533E]'
            : 'bg-[#1A3D2F]/10 border-[#1A3D2F]/30 text-[#1A3D2F]'
        }`}
      >
        {isSimulatedOffline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('Offline Mode', 'ከመስመር ውጭ')}</span>
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#B2533E] text-white text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </>
        ) : (
          <>
            <Wifi className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-stone-700">{t('Field Sync: Online', 'የመስክ ግንኙነት፡ ዝግጁ')}</span>
          </>
        )}
      </div>

      {/* Quick offline simulation button */}
      <button
        onClick={toggleSimulatedOffline}
        className="text-[11px] font-medium px-2 py-1 rounded border border-[#DDD8CD] bg-white text-stone-600 hover:bg-[#EFECE3] hover:text-stone-900 transition flex items-center gap-1"
        title={t('Toggle simulated network disconnection', 'የመስመር ግንኙነትን በሙከራ ይቀያይሩ')}
      >
        {isSimulatedOffline ? (
          <>
            <Wifi className="w-3 h-3 text-emerald-600" />
            <span>{t('Go Online', 'መስመር አብራ')}</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-amber-700" />
            <span>{t('Test Offline', 'ከመስመር ውጭ ሞክር')}</span>
          </>
        )}
      </button>

      {/* Manual Sync Trigger if pending records exist */}
      {pendingCount > 0 && !isSimulatedOffline && (
        <button
          onClick={syncPendingRecords}
          className="flex items-center gap-1 px-2 py-1 rounded bg-[#D4A017] text-[#1E231F] text-xs font-bold shadow-xs hover:bg-[#C29212] transition active:scale-95"
          title={t('Sync all pending collections to central database', 'ሁሉንም የተመዘገቡ መረጃዎች አመሳስል')}
        >
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>{t(`Sync (${pendingCount})`, `አመሳስል (${pendingCount})`)}</span>
        </button>
      )}
    </div>
  );
};
