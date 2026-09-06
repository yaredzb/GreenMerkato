import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider } from '../../common/EthiopicElements';
import { 
  TrendingUp, 
  Scale, 
  Layers, 
  Store, 
  Users, 
  Tractor, 
  ShieldCheck, 
  Flame, 
  Calendar,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { t, language, impactMetrics, setPublicSection } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'measured' | 'estimates' | 'targets'>('all');

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>AUDITED CIVIC DATA</span>
            <span>•</span>
            <span>የተረጋገጠ መረጃና ተፅዕኖ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Transparent Impact & Environmental Accounting',
              'ግልጽ የአካባቢና የከተማ ተፅዕኖ መዝገብ'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'GreenMerkato maintains rigorous separation between empirically weighed data from physical scales, peer-reviewed scientific estimates, and future municipal scale-up targets. Projections are never reported as completed achievements.',
              'ግሪን መርካቶ በመመዘኛ የተረጋገጠውን ትክክለኛ መረጃ፣ በሳይንሳዊ ቀመር የተሰላውን ግምት እና የወደፊት የአብራሪ ዒላማዎችን በግልጽ ለይቶ ያቀርባል። የትንበያ ዒላማዎች እንደተጠናቀቁ ስኬት ሆነው አይቀርቡም።'
            )}
          </p>
        </div>

        {/* Clear Policy Notice Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#FAF7F0] border border-[#DFD9CE] max-w-4xl mx-auto flex items-start gap-3 text-xs text-stone-700">
          <Info className="w-4 h-4 text-[#DF9F28] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#1C462C]">
              {t('Three-Tier Measurement Framework:', 'የሶስትዮሽ መረጃ አከፋፈል መርህ፡')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded bg-white border border-[#DFD9CE]">
                <span className="font-bold text-[#1C462C]">1. Measured Data:</span> Empirical logs from calibrated scales & QR records.
              </div>
              <div className="p-2 rounded bg-white border border-[#DFD9CE]">
                <span className="font-bold text-[#7A4B29]">2. Calculated Estimates:</span> Derived via IPCC Tier 1 methane models.
              </div>
              <div className="p-2 rounded bg-white border border-[#DFD9CE]">
                <span className="font-bold text-[#DF9F28]">3. Pilot Targets:</span> Forward-looking municipal scale goals.
              </div>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-[#1C462C] text-white shadow-xs'
                : 'bg-white border border-[#DFD9CE] text-stone-700 hover:bg-[#FAF7F0]'
            }`}
          >
            {t('All Metrics (14)', 'ሁሉንም መረጃዎች (14)')}
          </button>
          <button
            onClick={() => setActiveTab('measured')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'measured'
                ? 'bg-[#1C462C] text-white shadow-xs'
                : 'bg-white border border-[#DFD9CE] text-stone-700 hover:bg-[#FAF7F0]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('Measured Data (Verified)', 'የተለካ መረጃ (የተረጋገጠ)')}</span>
          </button>
          <button
            onClick={() => setActiveTab('estimates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'estimates'
                ? 'bg-[#7A4B29] text-white shadow-xs'
                : 'bg-white border border-[#DFD9CE] text-stone-700 hover:bg-[#FAF7F0]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#DF9F28]" />
            <span>{t('Calculated Estimates (IPCC)', 'የተሰላ ግምት (ሳይንሳዊ)')}</span>
          </button>
          <button
            onClick={() => setActiveTab('targets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'targets'
                ? 'bg-[#B94726] text-white shadow-xs'
                : 'bg-white border border-[#DFD9CE] text-stone-700 hover:bg-[#FAF7F0]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-orange-200" />
            <span>{t('Pilot Targets (Future)', 'የአብራሪ ዒላማዎች (ወደፊት)')}</span>
          </button>
        </div>
      </section>

      {/* 1. MEASURED DATA SECTION */}
      {(activeTab === 'all' || activeTab === 'measured') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFD9CE]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1C462C]" />
              <h2 className="font-serif font-bold text-xl text-[#1C462C]">
                {t('1. Measured Data (Directly Logged in Operations)', '1. የተለካና የተረጋገጠ መረጃ (ከመስክ የተገኘ)')}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              AUDITED FROM HARDWARE SCALES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Diverted Waste */}
            <div className="ethiopic-card bg-white p-5 border-2 border-[#1C462C]/30 shadow-xs">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{t('Organic Waste Diverted', 'የዳነ ኦርጋኒክ ቆሻሻ')}</span>
                <Scale className="w-4 h-4 text-[#1C462C]" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-mono font-bold text-[#1C462C]">
                  142.5 <span className="text-xs text-stone-500">Tons</span>
                </div>
                <div className="text-[11px] font-mono text-stone-600 mt-1">142,500 kg total logged</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500">
                Source: Calibrated digital crane scales at Atikilt Tera & Bomb Tera
              </div>
            </div>

            {/* Finished Compost Produced */}
            <div className="ethiopic-card bg-white p-5 border-2 border-[#1C462C]/30 shadow-xs">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{t('Finished Compost Produced', 'የተመረተ ንጹህ ማዳበሪያ')}</span>
                <Layers className="w-4 h-4 text-[#DF9F28]" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-mono font-bold text-[#7A4B29]">
                  24.8 <span className="text-xs text-stone-500">Tons</span>
                </div>
                <div className="text-[11px] font-mono text-stone-600 mt-1">496 standard 50kg sacks</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500">
                Source: Repi facility bagging & screening weight registers
              </div>
            </div>

            {/* Active Enrolled Vendors */}
            <div className="ethiopic-card bg-white p-5 border-2 border-[#1C462C]/30 shadow-xs">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{t('Active Market Vendors', 'የተመዘገቡ ነጋዴዎች')}</span>
                <Store className="w-4 h-4 text-[#B94726]" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-mono font-bold text-stone-900">
                  84 <span className="text-xs text-stone-500">Stalls</span>
                </div>
                <div className="text-[11px] font-mono text-stone-600 mt-1">4 core market zones</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500">
                Source: QR badge assignment list with active participation
              </div>
            </div>

            {/* Youth Cooperative Employment */}
            <div className="ethiopic-card bg-white p-5 border-2 border-[#1C462C]/30 shadow-xs">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{t('Youth Jobs Created', 'ለወጣቶች የተፈጠረ ስራ')}</span>
                <Users className="w-4 h-4 text-[#1C462C]" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-mono font-bold text-[#1C462C]">
                  8 <span className="text-xs text-stone-500">Full-Time</span>
                </div>
                <div className="text-[11px] font-mono text-stone-600 mt-1">Weighers & facility operators</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500">
                Source: Addis Ketema Youth Association formal payroll records
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. CALCULATED ESTIMATES (IPCC TIER 1 MODEL) */}
      {(activeTab === 'all' || activeTab === 'estimates') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFD9CE]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7A4B29]" />
              <h2 className="font-serif font-bold text-xl text-[#7A4B29]">
                {t('2. Calculated Environmental Estimates (Scientific Models)', '2. በሳይንሳዊ ቀመር የተሰላ የአካባቢ ተፅዕኖ')}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#7A4B29] bg-[#7A4B29]/10 px-2.5 py-0.5 rounded-full border border-[#7A4B29]/30">
              IPCC 2006 TIER 1 METHODOLOGY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Avoided Methane (CH4) */}
            <div className="ethiopic-card bg-[#FAF7F0] p-5 border border-[#DFD9CE]">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold">{t('Methane Emissions Avoided', 'የቀረ የሚቴን ጋዝ ልቀት')}</span>
                <Flame className="w-4 h-4 text-[#B94726]" />
              </div>
              <div className="text-3xl font-mono font-bold text-[#B94726] mt-2">
                85.5 <span className="text-xs text-stone-500">MT CO₂e</span>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {t(
                  'Calculated based on 0.60 MT CO₂e avoided per metric ton of organic vegetable waste diverted from anaerobic degradation at Repi dumpsite.',
                  'አትክልት ወደ ረጲ ከመጣል በመዳኑ በአንድ ቶን 0.60 ቶን የካርቦን አቻ ልቀት ይቀንሳል ተብሎ ተሰልቷል።'
                )}
              </p>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500 font-mono">
                Formula: Tons × DOC × DOCf × F × 16/12 × GWP(CH₄=28)
              </div>
            </div>

            {/* Landfill Airspace Conserved */}
            <div className="ethiopic-card bg-[#FAF7F0] p-5 border border-[#DFD9CE]">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold">{t('Landfill Airspace Conserved', 'የተቆጠበ የቆሻሻ መጣያ ቦታ')}</span>
                <Layers className="w-4 h-4 text-[#1C462C]" />
              </div>
              <div className="text-3xl font-mono font-bold text-[#1C462C] mt-2">
                285.0 <span className="text-xs text-stone-500">m³</span>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {t(
                  'Equivalent to 35 standard municipal tipper truck volumes prevented from burdening the historic Repi dump perimeter.',
                  'ከ35 የጭነት መኪና በላይ የሚሆን ቆሻሻ ወደ ረጲ ሳይሄድ በከተማው ውስጥ እንደተቀነሰ ያሳያል።'
                )}
              </p>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500 font-mono">
                Density factor: 0.50 tons / m³ compacted municipal waste
              </div>
            </div>

            {/* Farm Soil Regenerated */}
            <div className="ethiopic-card bg-[#FAF7F0] p-5 border border-[#DFD9CE]">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold">{t('Estimated Farmland Enriched', 'የለማ የእርሻ መሬት ግምት')}</span>
                <Tractor className="w-4 h-4 text-[#DF9F28]" />
              </div>
              <div className="text-3xl font-mono font-bold text-[#7A4B29] mt-2">
                18.2 <span className="text-xs text-stone-500">Hectares</span>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {t(
                  'Based on average smallholder agronomic application of 1.36 tons/hectare for mixed teff and horticultural plots.',
                  'ለጤፍና አትክልት ማሳ በአማካይ በሄክታር 1.36 ቶን ማዳበሪያ ይደረጋል በሚል ግምት የተሰላ።'
                )}
              </p>
              <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[10px] text-stone-500 font-mono">
                Application: 1,360 kg / hectare agronomic baseline
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. PILOT TARGETS (FUTURE GOALS) */}
      {(activeTab === 'all' || activeTab === 'targets') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFD9CE]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B94726]" />
              <h2 className="font-serif font-bold text-xl text-[#B94726]">
                {t('3. Pilot Targets & Milestone Roadmap', '3. የአብራሪ ፕሮጀክት ዒላማዎች (የወደፊት ዕቅድ)')}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#B94726] bg-[#B94726]/10 px-2.5 py-0.5 rounded-full border border-[#B94726]/30">
              TARGET GOALS • NOT COMPLETED STATS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Target 1: Annual Diversion Target */}
            <div className="ethiopic-card bg-white p-5 border border-dashed border-[#B94726]/40">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold">{t('Annual Diversion Target', 'የዓመት ዒላማ')}</span>
                <span className="text-[10px] font-bold text-[#1C462C] bg-[#1C462C]/10 px-2 py-0.5 rounded">
                  71.2% COMPLETED
                </span>
              </div>
              <div className="text-3xl font-mono font-bold text-stone-900 mt-2">
                200.0 <span className="text-xs text-stone-500">Tons Goal</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mt-3 border border-[#DFD9CE]">
                <div className="bg-gradient-to-r from-[#1C462C] to-[#DF9F28] h-full w-[71.2%]" />
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>Current: 142.5 Tons</span>
                <span>Remaining: 57.5 Tons</span>
              </div>
            </div>

            {/* Target 2: Vendor Expansion */}
            <div className="ethiopic-card bg-white p-5 border border-dashed border-[#B94726]/40">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold">{t('Vendor Network Expansion', 'የነጋዴዎች ማስፋፊያ')}</span>
                <span className="text-[10px] font-bold text-[#DF9F28] bg-[#DF9F28]/10 px-2 py-0.5 rounded">
                  PHASE 2 TARGET
                </span>
              </div>
              <div className="text-3xl font-mono font-bold text-stone-900 mt-2">
                250 <span className="text-xs text-stone-500">Stalls Target</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mt-3 border border-[#DFD9CE]">
                <div className="bg-[#DF9F28] h-full w-[33.6%]" />
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>Current: 84 Stalls</span>
                <span>Expanding to Military & Dubai Tera</span>
              </div>
            </div>

            {/* Target 3: Full Municipal Replication */}
            <div className="ethiopic-card bg-white p-5 border border-dashed border-[#B94726]/40">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold">{t('Youth Cooperative Scale', 'የወጣቶች ስራ ማሳደጊያ')}</span>
                <span className="text-[10px] font-bold text-[#B94726] bg-[#B94726]/10 px-2 py-0.5 rounded">
                  CITY-WIDE PLAN
                </span>
              </div>
              <div className="text-3xl font-mono font-bold text-stone-900 mt-2">
                24 <span className="text-xs text-stone-500">Workers Target</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mt-3 border border-[#DFD9CE]">
                <div className="bg-[#B94726] h-full w-[33.3%]" />
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>Current: 8 Workers</span>
                <span>3 Collection Routes Planned</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Methodology & Verification Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-[#FAF7F0] p-6 sm:p-8 rounded-xl border border-[#DFD9CE] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C462C]">
            <ShieldCheck className="w-4 h-4 text-[#DF9F28]" />
            <span>{t('Methodological Notes & Scientific Citations', 'የስሌት ቀመርና ሳይንሳዊ ዋቢዎች')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700 leading-relaxed font-sans">
            <div>
              <h4 className="font-bold text-stone-900 mb-1">
                {t('1. IPCC Solid Waste Methane Calculations', '1. የአይፒሲሲ (IPCC) የቆሻሻ ሚቴን ቀመር')}
              </h4>
              <p>
                {t(
                  'Methane savings are computed following the 2006 IPCC Guidelines for National Greenhouse Gas Inventories (Volume 5: Waste). For open unmanaged dumpsites in tropical highland conditions (Addis Ababa, 2,355m altitude), default methane correction factor (MCF = 0.4) and degradable organic carbon fraction for vegetables (DOC = 0.15) yield an average mitigation factor of ~0.60 MT CO₂e per metric ton of wet organic matter diverted.',
                  'የካርቦን ቅነሳ ስሌቱ በ2006 የIPCC መመሪያ መሰረት የተሰራ ነው። በአዲስ አበባ ከፍታና የአየር ንብረት መሰረት፣ አንድ ቶን ተረፈ-አትክልት ከረጲ መጣያ መቅረቱ በግምት 0.60 ቶን የካርቦን ልቀትን ያድናል።'
                )}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-stone-900 mb-1">
                {t('2. Quality Testing & Pathogen Standards', '2. የጥራት ደረጃና የላብራቶሪ ፍተሻ')}
              </h4>
              <p>
                {t(
                  'Compost grade determinations adhere to Ethiopian Standards Agency guidelines and FAO compost quality parameters. Grade A requires C:N ratio below 20:1, organic matter above 40%, moisture between 40%–55%, and verified zero Salmonella and weed seed germination following thermophilic phase audits.',
                  'የኮምፖስት ጥራት ደረጃ በኢትዮጵያ ደረጃዎች ኤጀንሲ እና በፋኦ (FAO) መመሪያዎች የተመሰረተ ነው። ደረጃ 1 የካርቦን-ናይትሮጅን ምጣኔው ከ20፡1 በታች መሆንና ከአረም ዘር የጸዳ መሆኑን በላብራቶሪ ማረጋገጥ ግዴታ ነው።'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
