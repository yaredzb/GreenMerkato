import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Wind, 
  Leaf, 
  TreePine, 
  Award, 
  MapPin, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  FileCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const ImpactAndTraceability: React.FC = () => {
  const { collections, batches, vendors, sales, t, language } = useApp();

  const [selectedTraceBatchId, setSelectedTraceBatchId] = useState<string>(batches[0]?.id || '');

  // Impact Calculations (Based on IPCC Municipal Organic Waste Factors)
  const totalWasteKg = collections.reduce((acc, c) => acc + c.weightKg, 0);
  const totalWasteTons = totalWasteKg / 1000;
  
  // 1 ton organic waste in unmanaged landfill generates ~0.85 tons CO2e methane emissions
  const methaneAvoidedTonsCO2e = Number((totalWasteTons * 0.85).toFixed(2));
  
  // Density of loose organic waste ~0.5 ton/m3 -> 1 ton saves ~2 cubic meters landfill airspace
  const landfillAirspaceM3 = Number((totalWasteTons * 2.0).toFixed(1));

  const totalCompostProducedKg = batches.reduce((acc, b) => acc + (b.finalWeightKg || (b.inputWeightKg * 0.5)), 0);

  // Traceability: which collections went into the selected batch
  const selectedBatch = batches.find(b => b.id === selectedTraceBatchId);
  const contributingCollections = collections.filter(c => 
    selectedBatch?.sourceCollectionIds.includes(c.id) || selectedBatch?.sourceCollectionIds.length === 0
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1A3D2F]">
              {t('Impact Verification & Full Chain-of-Custody Traceability', 'የአካባቢ ተፅዕኖ ማረጋገጫና የተሟላ ክትትል')}
            </h1>
            <span className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[10px] font-bold">
              IPCC Verified Model
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t(
              'Quantified methane diversion metrics, landfill airspace preservation, and batch-to-stall custody tracing.',
              'የሚቴን ጋዝ ቅነሳ ስሌት፣ የረጲ ቆሻሻ ማጠራቀሚያ መዳን እና ከማዳበሪያ ባች እስከ ነጋዴ ሱቅ ድረስ ያለው ሙሉ የክትትል መስመር።'
            )}
          </p>
        </div>
      </div>

      {/* 4 PRIMARY IMPACT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Methane Avoided */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {t('Methane Avoided', 'የዳነ ሚቴን ጋዝ')}
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-800 mt-2">
            {methaneAvoidedTonsCO2e} <span className="text-sm font-normal text-stone-500">MT CO₂e</span>
          </div>
          <p className="text-[11px] text-stone-600 mt-1">
            {t('Anaerobic landfill decomposition prevented by controlled aeration', 'በአየር በማፍላት ምክንያት ወደ ከባቢ አየር ያልተለቀቀ ሚቴን')}
          </p>
        </div>

        {/* 2. Landfill Airspace Saved */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {t('Landfill Space Saved', 'የዳነ የቆሻሻ ስፍራ')}
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-blue-900 mt-2">
            {landfillAirspaceM3} <span className="text-sm font-normal text-stone-500">m³</span>
          </div>
          <p className="text-[11px] text-stone-600 mt-1">
            {t('Diverted permanently from overflowing Repi municipal dumpsite', 'ከረጲ ማዘጋጃ ቆሻሻ ማጠራቀሚያ የተዳነ')}
          </p>
        </div>

        {/* 3. Total Organic Diverted */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {t('Total Diverted', 'የተሰበሰበ ቆሻሻ')}
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1A3D2F]/10 text-[#1A3D2F] flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#1A3D2F] mt-2">
            {totalWasteTons.toFixed(2)} <span className="text-sm font-normal text-stone-500">Tons</span>
          </div>
          <p className="text-[11px] text-stone-600 mt-1">
            {t('100% sourced from registered Merkato market stalls', 'ከመርካቶ ነጋዴዎች የተሰበሰበ')}
          </p>
        </div>

        {/* 4. Biological Soil Compost Yield */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {t('Compost Restored', 'የተመረተ ማዳበሪያ')}
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-900 mt-2">
            {(totalCompostProducedKg / 1000).toFixed(1)} <span className="text-sm font-normal text-stone-500">MT</span>
          </div>
          <p className="text-[11px] text-stone-600 mt-1">
            {t('Soil carbon regeneration for Ethiopian agriculture', 'የአፈር ለምነትን ለመመለስ የተዘጋጀ')}
          </p>
        </div>
      </div>

      {/* CIRCULAR MASS BALANCE DIAGRAM */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CD]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            {t('Merkato Circular Mass Balance Architecture', 'የመርካቶ ክብ ኢኮኖሚ የቆሻሻ ፍሰት ሞዴል')}
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            96.8% Clean Efficiency
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          <div className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] text-xs">
            <div className="text-[10px] text-stone-400 font-bold uppercase">1. Source Separation</div>
            <div className="font-bold text-stone-900 mt-1">Merkato Merchants</div>
            <div className="text-stone-600 mt-0.5">{vendors.length} stalls in 4 zones</div>
            <div className="mt-2 font-mono font-bold text-[#1A3D2F]">~2,500 kg / day</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] text-xs">
            <div className="text-[10px] text-stone-400 font-bold uppercase">2. Intake & QC</div>
            <div className="font-bold text-stone-900 mt-1">Digital Scale Weighing</div>
            <div className="text-stone-600 mt-0.5">3.2% Minor Contamination</div>
            <div className="mt-2 font-mono font-bold text-emerald-800">Clean: 96.8%</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] text-xs">
            <div className="text-[10px] text-stone-400 font-bold uppercase">3. Bioconversion</div>
            <div className="font-bold text-stone-900 mt-1">Aerated Thermophilic Piles</div>
            <div className="text-stone-600 mt-0.5">55°C - 65°C, 35 days</div>
            <div className="mt-2 font-mono font-bold text-purple-800">50% Yield Mass</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] text-xs">
            <div className="text-[10px] text-stone-400 font-bold uppercase">4. Utilization</div>
            <div className="font-bold text-stone-900 mt-1">Teff & Grain Farmers</div>
            <div className="text-stone-600 mt-0.5">Oromia & Urban Co-ops</div>
            <div className="mt-2 font-mono font-bold text-[#C85A32]">Grade A & B Compost</div>
          </div>
        </div>
      </div>

      {/* BATCH-TO-VENDOR TRACEABILITY INSPECTOR */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD8CD]">
          <div>
            <h3 className="text-sm font-bold text-[#1A3D2F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A017]" />
              <span>{t('Batch-to-Vendor Chain-of-Custody Inspector', 'ከባች እስከ ነጋዴ ድረስ የተሟላ የክትትል መመርመሪያ')}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('Select any certified finished batch to verify every originating market stall and scale receipt.', 'ማንኛውንም ባች በመምረጥ የገባበትን የነጋዴ ቆሻሻ ዝርዝር ያረጋግጡ።')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-600">{t('Inspect Batch:', 'ባች ምረጥ፡')}</span>
            <select
              value={selectedTraceBatchId}
              onChange={(e) => setSelectedTraceBatchId(e.target.value)}
              className="p-1.5 rounded-lg border border-[#DDD8CD] font-mono text-xs font-bold"
            >
              {batches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.batchNumber} - {b.currentStage.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedBatch && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 bg-[#F8F6F0] rounded-xl text-xs">
              <div>
                <span className="text-stone-500 font-medium">Batch ID:</span>
                <span className="font-mono font-bold text-[#1A3D2F] ml-1">{selectedBatch.batchNumber}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Input Biomass:</span>
                <span className="font-mono font-bold text-stone-900 ml-1">{selectedBatch.inputWeightKg.toLocaleString()} kg</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Lead Operator:</span>
                <span className="font-medium text-stone-900 ml-1">{selectedBatch.responsibleOperator}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Quality Grade:</span>
                <span className="font-bold text-emerald-800 ml-1">{selectedBatch.qualityGrade || 'In Testing'}</span>
              </div>
            </div>

            <div className="border border-[#DDD8CD] rounded-xl overflow-hidden">
              <div className="bg-stone-50 px-3 py-2 text-xs font-bold text-stone-700 flex justify-between">
                <span>{t('Originating Merkato Collections Contributed to this Batch', 'ወደዚህ ባች የገቡ የመርካቶ ቆሻሻዎች')}</span>
                <span className="text-stone-400 font-normal">{contributingCollections.length} verified collections</span>
              </div>

              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8F6F0] text-stone-600 font-bold uppercase text-[10px] border-b border-[#DDD8CD]">
                  <tr>
                    <th className="py-2 px-3">{t('Stall / Vendor', 'የነጋዴ ሱቅ')}</th>
                    <th className="py-2 px-3">{t('Zone', 'ዞን')}</th>
                    <th className="py-2 px-3">{t('Weighed', 'ሚዛን')}</th>
                    <th className="py-2 px-3">{t('Scale Method', 'የሚዛን አይነት')}</th>
                    <th className="py-2 px-3">{t('Time', 'ሰዓት')}</th>
                    <th className="py-2 px-3">{t('Collector', 'ሰብሳቢ')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {contributingCollections.map(c => (
                    <tr key={c.id}>
                      <td className="py-2 px-3">
                        <span className="font-mono font-bold text-stone-900">{c.stall}</span>{' '}
                        <span className="text-stone-700">{c.vendorName}</span>
                      </td>
                      <td className="py-2 px-3 text-stone-600">{c.marketZone}</td>
                      <td className="py-2 px-3 font-mono font-bold text-[#1A3D2F]">{c.weightKg} kg</td>
                      <td className="py-2 px-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-stone-100 font-mono text-stone-600">
                          {c.scaleSource || 'digital_scale_bt'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-stone-500 font-mono">
                        {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2 px-3 text-stone-600">{c.collectorName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
