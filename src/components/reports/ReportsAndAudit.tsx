import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Download, 
  Filter, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search,
  ArrowDownToLine,
  Printer
} from 'lucide-react';

export const ReportsAndAudit: React.FC = () => {
  const { auditLogs, collections, batches, sales, vendors, t, language } = useApp();

  const [activeTab, setActiveTab] = useState<'audit' | 'reports'>('audit');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesSearch = 
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAction && matchesSearch;
  });

  const handleExportCSV = (dataType: 'collections' | 'batches' | 'sales' | 'audit') => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (dataType === 'collections') {
      csvContent += "ID,Vendor,Stall,Zone,WeightKg,Quality,Collector,Timestamp\n";
      collections.forEach(c => {
        csvContent += `${c.id},"${c.vendorName}",${c.stall},"${c.marketZone}",${c.weightKg},${c.quality},"${c.collectorName}",${c.timestamp}\n`;
      });
    } else if (dataType === 'batches') {
      csvContent += "BatchNumber,InputWeightKg,Stage,Status,TempC,MoisturePct,StartDate,Operator\n";
      batches.forEach(b => {
        csvContent += `${b.batchNumber},${b.inputWeightKg},${b.currentStage},${b.status},${b.currentTempC},${b.currentMoisturePct},${b.startDate},"${b.responsibleOperator}"\n`;
      });
    } else if (dataType === 'sales') {
      csvContent += "ReceiptNumber,BuyerName,Grade,QuantityKg,TotalETB,PaymentMethod,PaymentStatus,Timestamp\n";
      sales.forEach(s => {
        csvContent += `${s.receiptNumber},"${s.buyerName}","${s.grade}",${s.quantityKg},${s.totalPriceETB},${s.paymentMethod},${s.paymentStatus},${s.timestamp}\n`;
      });
    } else {
      csvContent += "ID,Action,EntityType,EntityId,UserName,UserRole,Timestamp,Details\n";
      auditLogs.forEach(l => {
        csvContent += `${l.id},${l.action},${l.entityType},${l.entityId},"${l.userName}",${l.userRole},${l.timestamp},"${l.details.replace(/"/g, '""')}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GreenMerkato_${dataType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1A3D2F]">
              {t('System Audit Trails & Compliance Reports', 'የስርዓት ኦዲት መዝገብና የሪፖርት ማዕከል')}
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#1A3D2F] text-white text-[10px] font-bold">
              Immutability Verified
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t(
              'Cryptographic audit tracking, municipal data compliance, and verifiable export pipelines.',
              'የስርዓት ለውጦች፣ ኦዲት እና ለመንግስት አካላት የሚቀርቡ ይፋዊ የሪፖርት ማውጫዎች።'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportCSV('audit')}
            className="px-3 py-1.5 rounded-xl border border-[#DDD8CD] bg-white text-xs font-bold text-stone-700 hover:bg-[#F8F6F0] flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{t('Export Full Audit Log (CSV)', 'ኦዲት ላክ (CSV)')}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DDD8CD] text-xs font-bold">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('System Audit Log', 'የስርዓት ኦዲት')}</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t('Operational Compliance Reports', 'ኦፕሬሽናል ሪፖርቶች')}</span>
        </button>
      </div>

      {/* AUDIT LOG TAB */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-[#DDD8CD] p-4 sm:p-5 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={t('Search audit details or user...', 'ዝርዝር ወይም ስም ፈልግ...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DDD8CD]"
              />
            </div>

            {/* Filter Action */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-stone-500 font-medium">{t('Filter Action:', 'ተግባር፡')}</span>
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="p-1.5 rounded-lg border border-[#DDD8CD] font-medium"
              >
                <option value="all">All Actions</option>
                <option value="RECORD_COLLECTION">Collection Recorded</option>
                <option value="LOG_BATCH_EVENT">Batch Reading</option>
                <option value="COMPLETE_BATCH">Batch Certified</option>
                <option value="RECORD_SALE">Sale Recorded</option>
                <option value="REGISTER_VENDOR">Vendor Enrolled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F6F0] text-stone-600 font-bold uppercase text-[10px] tracking-wider border-b border-[#DDD8CD]">
                <tr>
                  <th className="py-2 px-3">{t('Timestamp', 'ቀንና ሰዓት')}</th>
                  <th className="py-2 px-3">{t('Action', 'ተግባር')}</th>
                  <th className="py-2 px-3">{t('Target Entity', 'የተፈጸመበት')}</th>
                  <th className="py-2 px-3">{t('User', 'ተጠቃሚ')}</th>
                  <th className="py-2 px-3">{t('Details', 'ዝርዝር መግለጫ')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-[#F8F6F0]/60">
                    <td className="py-2.5 px-3 font-mono text-stone-500 text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#1A3D2F]/10 text-[#1A3D2F]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-stone-700">
                      {log.entityType} ({log.entityId})
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-stone-900">{log.userName}</span>
                      <span className="text-[10px] text-stone-400 block">{log.userRole}</span>
                    </td>
                    <td className="py-2.5 px-3 text-stone-700 max-w-xs">
                      {language === 'am' ? log.actionAm : log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <FileText className="w-4 h-4 text-[#1A3D2F]" />
              <span>Daily Organic Intake Ledger</span>
            </div>
            <p className="text-xs text-stone-600">
              Complete line-by-line collection records from Merkato stalls with weights, contamination checks, and collector names.
            </p>
            <button
              onClick={() => handleExportCSV('collections')}
              className="w-full py-2 rounded-lg bg-[#1A3D2F] text-white text-xs font-bold hover:bg-[#12281F] flex items-center justify-center gap-1.5"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Download Intake Data (CSV)</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <FileText className="w-4 h-4 text-purple-700" />
              <span>Compost Aeration & Kinetics Report</span>
            </div>
            <p className="text-xs text-stone-600">
              Thermophilic core temperature progressions, moisture levels, turn frequencies, and final certified batch yields.
            </p>
            <button
              onClick={() => handleExportCSV('batches')}
              className="w-full py-2 rounded-lg bg-purple-900 text-white text-xs font-bold hover:bg-purple-950 flex items-center justify-center gap-1.5"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Download Batch Data (CSV)</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Farmer Sales & Financial Ledger</span>
            </div>
            <p className="text-xs text-stone-600">
              Full sales receipts, Telebirr payment confirmations, quantities delivered, and buyer cooperative directories.
            </p>
            <button
              onClick={() => handleExportCSV('sales')}
              className="w-full py-2 rounded-lg bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 flex items-center justify-center gap-1.5"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Download Sales Ledger (CSV)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
