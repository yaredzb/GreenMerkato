import React from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider, MerkatoTeraPill } from '../../common/EthiopicElements';
import { 
  Scale, 
  Store, 
  Layers, 
  Warehouse, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  MapPin, 
  Users, 
  Tractor,
  Smartphone,
  Flame,
  FileCheck,
  Lock
} from 'lucide-react';
import merkatoMarketImg from '../../../assets/images/merkato_market_stalls_1788690125174.jpg';
import compostRepiImg from '../../../assets/images/compost_repi_facility_1788690137052.jpg';
import farmingHarvestImg from '../../../assets/images/ethiopian_farming_harvest_1788690149107.jpg';

interface HomePageProps {
  onOpenStaffLogin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenStaffLogin }) => {
  const { setPublicSection, t, language, impactMetrics } = useApp();

  const handleNav = (section: string) => {
    setPublicSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-4 sm:pt-8 pb-12 sm:pb-16 border-b border-[#DFD9CE]">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-40 bg-mesob-pattern pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Civic Authority & Location Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1C462C]/10 border border-[#1C462C]/25 text-xs text-[#1C462C] font-semibold shadow-2xs">
                <AddisAbabaSeal size="sm" />
                <span className="font-bold">አዲስ አበባ • መርካቶ</span>
                <span className="text-[#DF9F28]">❖</span>
                <span className="text-stone-600 font-normal">
                  {t('City Cleansing & Circular Soil Hub', 'የከተማ ጽዳትና የኦርጋኒክ ማዳበሪያ አብራሪ')}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1C462C] tracking-tight leading-tight">
                  {t(
                    'Transforming Merkato’s Organic Waste Into Living Soil for Ethiopian Agriculture',
                    'የመርካቶን ኦርጋኒክ ቆሻሻ ወደ ለም ማዳበሪያ በመቀየር የኢትዮጵያን አፈር እናድሳለን'
                  )}
                </h1>
                <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
                  {t(
                    'GreenMerkato is an operational circular economy system in Addis Ababa. We divert daily vegetable and fruit waste from Africa’s largest open market, process it at the Repi aerobic facility, and supply certified organic compost to smallholder farmers.',
                    'ግሪን መርካቶ በአዲስ አበባ የሚሰራ የክብ-ኢኮኖሚ ስርዓት ነው። ከአፍሪካ ግዙፉ ገበያ መርካቶ በየቀኑ የሚወጣውን የአትክልትና ፍራፍሬ ተረፈ-ምርት በመሰብሰብ በረጲ ማዕከል ወደ ተመረመረ ማዳበሪያነት ይቀይራል።'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="px-6 py-3.5 btn-primary text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
                >
                  <span>{t('Explore the 10-Step Circular Flow', 'የ10 ደረጃዎችን አሰራር ይመልከቱ')}</span>
                  <ArrowRight className="w-4 h-4 text-[#DF9F28]" />
                </button>

                <button
                  onClick={onOpenStaffLogin}
                  className="px-5 py-3.5 btn-secondary text-sm font-bold flex items-center justify-center gap-2 shadow-2xs hover:bg-[#FAF7F0] transition border border-[#DFD9CE]"
                >
                  <Lock className="w-4 h-4 text-[#1C462C]" />
                  <span>{t('Staff Login / Open Platform', 'የሰራተኞች መግቢያ')}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-[#DFD9CE] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C462C] shrink-0" />
                  <span className="font-medium">{t('No apps needed for vendors', 'ነጋዴው ስልክ አያስፈልገውም')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C462C] shrink-0" />
                  <span className="font-medium">{t('Thermophilic Grade A Lab Tested', 'የላብራቶሪ ምርመራ ያለፈ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C462C] shrink-0" />
                  <span className="font-medium">{t('Youth Cooperative Employment', 'ለወጣቶች የስራ ዕድል')}</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card with Ethiopian Woven Frame */}
            <div className="lg:col-span-5 relative">
              <div className="ethiopic-card p-2 sm:p-2.5 shadow-xl bg-white border border-[#DFD9CE]">
                <TibebStripe height={4} className="mb-2 rounded-t-lg" />
                <div className="relative rounded-lg overflow-hidden aspect-4/3 bg-stone-100">
                  <img
                    src={merkatoMarketImg}
                    alt="Merkato vegetable and fruit market stalls in Addis Ababa"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MerkatoTeraPill zone="Atikilt Tera" amharicZone="አትክልት ተራ" />
                      <span className="text-[10px] font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                        ADDIS ABABA
                      </span>
                    </div>
                    <p className="text-xs font-medium text-stone-200 leading-tight">
                      {t('Vendors separate cabbage, bananas, and produce at source before morning collection runs.', 'ነጋዴዎች ተረፈ-አትክልትና ፍራፍሬን በየሱቃቸው ለይተው ያዘጋጃሉ።')}
                    </p>
                  </div>
                </div>

                {/* Floating Metric Pill */}
                <div className="p-3 mt-2 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE] flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-500">
                      {t('Pilot Measured Diverted Waste', 'የተመዘገበ የቆሻሻ ቅነሳ')}
                    </div>
                    <div className="text-lg font-bold font-mono text-[#1C462C] mt-0.5">
                      142.5 <span className="text-xs text-stone-500">Metric Tons</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-stone-500">
                      {t('Methane Avoided', 'የካርቦን ቅነሳ')}
                    </div>
                    <div className="text-sm font-bold font-mono text-[#7A4B29] mt-0.5">
                      85.5 MT CO₂e
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CONVERGING CRISES WE ADDRESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#B94726] flex items-center justify-center gap-1.5">
            <span>{t('The Urban-Agricultural Challenge', 'የከተማና የግብርና ተግዳሮቶች')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Why Addis Ababa Needs a Closed-Loop Organic Waste System',
              'አዲስ አበባ የተሟላ የኦርጋኒክ ቆሻሻ ማቀነባበሪያ ስርዓት ለምን አስፈለጋት?'
            )}
          </h2>
          <p className="text-sm text-stone-600 font-sans">
            {t(
              'Every day, tonnes of valuable biological nutrients are lost or burned, while surrounding highland farmlands suffer from soil degradation and high chemical fertilizer prices.',
              'በየቀኑ ጠቃሚ የሆኑ የተፈጥሮ ንጥረ-ነገሮች በመጣያ ላይ ይባክናሉ፤ በሌላ በኩል ደግሞ የገበሬዎች ማሳ የአፈር ለምነት እየቀነሰ በውድ ኬሚካል ማዳበሪያ ይቸገራል።'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Problem 1: Merkato Market Waste */}
          <div className="ethiopic-card p-6 border border-[#DFD9CE] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#B94726]/10 border border-[#B94726]/20 flex items-center justify-center text-[#B94726]">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                {t('1. 120+ Tons Daily Merkato Waste', '1. በቀን 120+ ቶን የመርካቶ ቆሻሻ')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {t(
                  'As Africa’s largest open marketplace, Merkato generates massive daily loads of discarded vegetables, fruit peels, and teff chaff. Without source separation, this organic biomass clogs drainage ditches and turns into unmanageable sludge.',
                  'መርካቶ በአፍሪካ ግዙፉ የገበያ ማዕከል በመሆኑ በየቀኑ በቶን የሚቆጠር የአትክልት፣ ፍራፍሬና እህል ተረፈ-ምርት ይወጣል። ካልተለየ ቦዮችን ይደፍናል፤ ጽዳትንም ያዛባል።'
                )}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#B94726]">
              {t('65% of market debris is organic compostable', '65% የሚሆነው ቆሻሻ ኦርጋኒክ ነው')}
            </div>
          </div>

          {/* Problem 2: Repi Landfill Pressure & Methane */}
          <div className="ethiopic-card p-6 border border-[#DFD9CE] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7A4B29]/10 border border-[#7A4B29]/20 flex items-center justify-center text-[#7A4B29]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                {t('2. Repi Dumpsite Overburden', '2. የረጲ የቆሻሻ ማከማቻ ጫና')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {t(
                  'For decades, Addis Ababa’s solid waste was hauled indiscriminately to Repi (Koshe). Anaerobic decomposition in deep landfill layers produces heavy methane emissions (CH₄) and hazardous leachate that jeopardizes local water tables.',
                  'ለአስርት ዓመታት የከተማው ቆሻሻ ወደ ረጲ (ቆሼ) ሲጓጓዝ ቆይቷል። በኦክስጅን እጥረት የሚፈጠረው የሚቴን ጋዝ አየርን ይበክላል፤ የከርሰ-ምድር ውሃንም ይጎዳል።'
                )}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#7A4B29]">
              {t('Methane is 28x more potent than CO₂', 'ሚቴን ከካርቦን ዳይኦክሳይድ 28 እጥፍ ይከብዳል')}
            </div>
          </div>

          {/* Problem 3: Soil Depletion & Chemical Costs */}
          <div className="ethiopic-card p-6 border border-[#DFD9CE] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1C462C]/10 border border-[#1C462C]/20 flex items-center justify-center text-[#1C462C]">
                <Tractor className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                {t('3. Highland Soil Nutrient Depletion', '3. የአፈር ለምነት መቀነስና የማዳበሪያ ዋጋ')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {t(
                  'Smallholder farmers in Oromia, Amhara, and surrounding regions face degraded soil carbon and spiking prices for imported chemical fertilizers (NPS/Urea). Highland soils require biological organic matter to retain water and sustain crops.',
                  'በኦሮሚያ፣ አማራና ዙሪያው ያሉ አርሶ አደሮች የአፈር ለምነት እየደከመባቸውና የኬሚካል ማዳበሪያ ዋጋ እየናረባቸው ተቸግረዋል። አፈሩ የኦርጋኒክ ማዳበሪያ ካርቦን ያስፈልገዋል።'
                )}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#1C462C]">
              {t('High organic matter boosts water retention by 40%', 'የአፈርን የውሃ ይዞታ በ40% ያሳድጋል')}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS AT A GLANCE (CIRCULAR DIAGRAM) */}
      <section className="bg-[#FAF7F0] border-y border-[#DFD9CE] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#DFD9CE]">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
                {t('Circular Process Overview', 'የክብ-ኢኮኖሚ ሂደት ማጠቃለያ')}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] mt-1">
                {t('Closing the Nutrient Loop in 5 Core Stages', 'በ5 ዋና ዋና ምዕራፎች የተዋቀረ አሰራር')}
              </h2>
            </div>
            <button
              onClick={() => handleNav('how-it-works')}
              className="text-xs font-bold text-[#1C462C] hover:text-[#B94726] flex items-center gap-1.5 transition self-start md:self-auto"
            >
              <span>{t('View Detailed 10-Step Deep Dive →', 'ሙሉውን 10 ደረጃዎች በዝርዝር እይ →')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {/* Step 1 */}
            <div className="ethiopic-card p-4.5 bg-white border border-[#DFD9CE]">
              <div className="text-xs font-mono font-bold text-[#DF9F28]">01</div>
              <div className="w-8 h-8 rounded-lg bg-[#1C462C]/10 text-[#1C462C] flex items-center justify-center my-3">
                <Store className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Source Separation', 'ልዩነት በሱቁ')}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {t('Vendors place clean vegetable and fruit trimmings in designated crates.', 'ነጋዴዎች ንጹህ ተረፈ-አትክልት በሳጥን ለይተው ያቆያሉ።')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="ethiopic-card p-4.5 bg-white border border-[#DFD9CE]">
              <div className="text-xs font-mono font-bold text-[#DF9F28]">02</div>
              <div className="w-8 h-8 rounded-lg bg-[#B94726]/10 text-[#B94726] flex items-center justify-center my-3">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Weighed & Scanned', 'ምዝገባና መመዘን')}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {t('Youth cooperatives weigh on mobile scales and scan stall QR cards in the PWA.', 'ወጣቶች በመስክ መመዘኛ መዝነው በQR ኮድ ያረጋግጣሉ።')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="ethiopic-card p-4.5 bg-white border border-[#DFD9CE]">
              <div className="text-xs font-mono font-bold text-[#DF9F28]">03</div>
              <div className="w-8 h-8 rounded-lg bg-[#7A4B29]/10 text-[#7A4B29] flex items-center justify-center my-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Aerobic Windrows', 'የረጲ ማፍላት')}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {t('Compost batches monitored at 55–65°C to eliminate pathogens and weed seeds.', 'በ55-65 ዲግሪ ሙቀት ተቆጣጥሮ ተህዋስያንን ማጥፋት።')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="ethiopic-card p-4.5 bg-white border border-[#DFD9CE]">
              <div className="text-xs font-mono font-bold text-[#DF9F28]">04</div>
              <div className="w-8 h-8 rounded-lg bg-[#DF9F28]/20 text-[#8B5E3C] flex items-center justify-center my-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Quality Grading', 'የጥራት ደረጃ')}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {t('Screened to 10mm; certified Grade A horticultural and Grade B field compost.', 'ተነፍቶ ደረጃ 1 (ለአትክልት) እና ደረጃ 2 (ለእህል) መመደብ።')}
              </p>
            </div>

            {/* Step 5 */}
            <div className="ethiopic-card p-4.5 bg-white border border-[#DFD9CE]">
              <div className="text-xs font-mono font-bold text-[#DF9F28]">05</div>
              <div className="w-8 h-8 rounded-lg bg-[#1C462C]/10 text-[#1C462C] flex items-center justify-center my-3">
                <Tractor className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Farmer Delivery', 'ለገበሬው ስርጭት')}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {t('Distributed to farming unions, regenerating highland teff and vegetable soil.', 'ለገበሬ ማኅበራት ተሰራጭቶ የአፈርን ለምነት ማደስ።')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REPI FACILITY & HIGH-QUALITY COMPOST SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative">
            <div className="ethiopic-card p-2.5 bg-white border border-[#DFD9CE] shadow-lg">
              <TibebStripe height={4} className="mb-2 rounded-t-lg" />
              <div className="rounded-lg overflow-hidden aspect-16/10 bg-stone-100">
                <img
                  src={compostRepiImg}
                  alt="Repi composting yard with aerobic windrows in Addis Ababa"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 text-xs text-stone-600 flex items-center justify-between">
                <span className="font-bold text-[#1C462C] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t('Repi Yard Facility • Windrow Active', 'የረጲ ኮምፖስት ማዕከል • ንቁ ባች')}
                </span>
                <span className="text-[11px] font-mono text-stone-500">62.4°C Thermophilic</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
              {t('Agronomic Rigor', 'ሳይንሳዊ የጥራት ቁጥጥር')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] tracking-tight">
              {t(
                'Compost Engineered for Real Ethiopian Farming Needs',
                'ለኢትዮጵያ ገበሬ ተጨባጭ ፍላጎት የተዘጋጀ የተፈጥሮ ማዳበሪያ'
              )}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {t(
                'Unlike unmanaged municipal dumping, GreenMerkato’s aerobic windrow process strictly follows international compost sanitation guidelines. High core temperatures (55°C–65°C for 15+ consecutive days) eradicate weed seeds, wild pathogens, and insect larvae.',
                'እንደተለመደው የዘፈቀደ ቆሻሻ ማከማቸት ሳይሆን፣ ግሪን መርካቶ በረጲ ማዕከል የሙቀት መጠንን (55-65 ዲግሪ) ለ15 ተከታታይ ቀናት ጠብቆ በማፍላት የአረም ዘሮችንና በሽታ አምጪ ተህዋስያንን ሙሉ በሙሉ ያጠፋል።'
              )}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900">{t('Grade A Bio-Enriched Organic', 'ደረጃ 1 - ባዮ-የበለጸገ ኦርጋኒክ')}</span>
                  <p className="text-[11px] text-stone-500">{t('Fine 8mm screening for vegetable horticulture & greenhouse crops.', 'በ8ሚሜ የተነፋ፤ ለፍራፍሬ፣ አትክልትና ግሪንሃውስ የሚሆን።')}</p>
                </div>
                <span className="font-mono font-bold text-[#1C462C] bg-white px-2 py-1 rounded border border-[#DFD9CE]">
                  C:N 16:1
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900">{t('Grade B General Agricultural', 'ደረጃ 2 - አጠቃላይ የእርሻ ማዳበሪያ')}</span>
                  <p className="text-[11px] text-stone-500">{t('Screened to 14mm for teff, maize, barley, and tree seedling nurseries.', 'ለጤፍ፣ በቆሎ፣ ስንዴና ለችግኝ ጣቢያዎች የተዘጋጀ።')}</p>
                </div>
                <span className="font-mono font-bold text-[#7A4B29] bg-white px-2 py-1 rounded border border-[#DFD9CE]">
                  pH 7.2
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('farmers')}
                className="text-xs font-bold text-[#1C462C] hover:text-[#B94726] flex items-center gap-1.5 transition"
              >
                <span>{t('Learn more about Farmer specs & ordering →', 'ስለ ማዳበሪያው ጥራትና ግዢ ዝርዝር እይ →')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STAKEHOLDER ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
            {t('Collaborative Network', 'የትብብር አውታር')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t('Who Makes GreenMerkato Work?', 'የግሪን መርካቶ ባለድርሻ አካላት እነማን ናቸው?')}
          </h2>
          <p className="text-sm text-stone-600 font-sans">
            {t(
              'A truly sustainable circular model connects the entire municipal and agricultural value chain.',
              'ዘላቂ የክብ-ኢኮኖሚ የሚሳካው የገበያ ነጋዴዎችን፣ ሰብሳቢዎችን፣ የከተማ አስተዳደርንና ገበሬዎችን በአንድነት ሲያስተሳስር ነው።'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {/* Stakeholder 1: Market Vendors */}
          <div className="ethiopic-card p-5 bg-white border border-[#DFD9CE]">
            <div className="w-10 h-10 rounded-xl bg-[#1C462C]/10 text-[#1C462C] flex items-center justify-center mb-3">
              <Store className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('Merkato Vendors', 'የመርካቶ ነጋዴዎች')}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {t(
                'Vegetable and fruit stall owners who separate biological waste at source. They receive free clean pickup and certified stall recognition without needing smartphones.',
                'አትክልትና ፍራፍሬ የሚሸጡ ነጋዴዎች ቆሻሻቸውን ለይተው በማስቀመጥ የነጻ አሰባሰብና የጽዳት እውቅና ያገኛሉ።'
              )}
            </p>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#1C462C]">
              {t('84 Registered Stalls', '84 የተመዘገቡ ሱቆች')}
            </div>
          </div>

          {/* Stakeholder 2: Youth Waste Cooperatives */}
          <div className="ethiopic-card p-5 bg-white border border-[#DFD9CE]">
            <div className="w-10 h-10 rounded-xl bg-[#B94726]/10 text-[#B94726] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('Youth Cooperatives', 'የወጣቶች ኅብረት ስራ')}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {t(
                'Organized young workers from Addis Ketema sub-city equipped with handcarts, mobile scales, and safety gear. They log collections in the offline PWA.',
                'የአዲስ ከተማ ወጣቶች በመመዘኛና ጋሪ ተደራጅተው በመስክ ላይ የቆሻሻ ምዝገባ ያካሂዳሉ፤ የስራ ዕድልም ያገኛሉ።'
              )}
            </p>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#B94726]">
              {t('Formal Living-Wage Jobs', 'ክብርና ገቢ ያለው ስራ')}
            </div>
          </div>

          {/* Stakeholder 3: Municipal Cleansing Agency */}
          <div className="ethiopic-card p-5 bg-white border border-[#DFD9CE]">
            <div className="w-10 h-10 rounded-xl bg-[#DF9F28]/20 text-[#8B5E3C] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('City Cleansing Agency', 'የከተማ ጽዳት አስተዳደር')}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {t(
                'Addis Ababa Cleansing Management Agency provides pilot facility infrastructure at Repi, route access, and institutional oversight to meet municipal waste reduction goals.',
                'የአዲስ አበባ ጽዳት አስተዳደር ኤጀንሲ የመሬት፣ የትራንስፖርትና የክትትል ድጋፍ በማድረግ የቆሻሻ ቅነሳን ይመራል።'
              )}
            </p>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#DF9F28]">
              {t('Municipal Policy Alignment', 'የመዲናዋ ጽዳት ፖሊሲ')}
            </div>
          </div>

          {/* Stakeholder 4: Farmers & Unions */}
          <div className="ethiopic-card p-5 bg-white border border-[#DFD9CE]">
            <div className="w-10 h-10 rounded-xl bg-[#7A4B29]/10 text-[#7A4B29] flex items-center justify-center mb-3">
              <Tractor className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('Farmers & Cooperatives', 'አርሶ አደሮችና ኅብረቶች')}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {t(
                'Smallholder teff growers and horticultural farming unions in Oromia and Shewa receiving verified biological compost to regenerate tired soils at fair prices.',
                'በኦሮሚያና ሸዋ ያሉ የጤፍና አትክልት ገበሬዎች በተመጣጣኝ ዋጋ ጥራት ያለው ማዳበሪያ አግኝተው አፈራቸውን ያለመልማሉ።'
              )}
            </p>
            <div className="mt-4 pt-3 border-t border-[#DFD9CE] text-[11px] font-bold text-[#7A4B29]">
              {t('Affordable Biological Nutrition', 'ተመጣጣኝ የተፈጥሮ ማዳበሪያ')}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DIGITAL OPERATIONAL PWA PREVIEW */}
      <section className="bg-gradient-to-b from-white via-[#FAF7F0] to-white border-y border-[#DFD9CE] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
                <span>OFFLINE-FIRST PWA ENGINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] tracking-tight">
                {t(
                  'Powered by Our Dedicated Field & Facility Operating System',
                  'በተሟላ የመስክና የማዕከል ዲጂታል ስርዓት ይመራል'
                )}
              </h2>
              <p className="text-sm text-stone-700 font-sans leading-relaxed">
                {t(
                  'Behind the public initiative is the GreenMerkato operational Progressive Web App. Designed specifically for low-connectivity market alleys, it equips field registrars with offline scale sync, stall QR recognition, thermophilic pile trackers, and municipal audit logs.',
                  'ከዚህ ተነሳሽነት ጀርባ የመርካቶን አስቸጋሪ የኔትወርክ ሁኔታ ያገናዘበ ኦፍላይን የሚሰራ PWA አለ። የመስክ መመዘኛ፣ የQR ስካነር፣ የባች ሙቀት መቆጣጠሪያና ሙሉ የኦዲት መዝገብ አካቷል።'
                )}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-[#DFD9CE]">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#1C462C]" />
                    <span>{t('Offline Sync Queue', 'ኦፍላይን መስሪያ')}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">{t('Records continue in market sheds even with zero mobile data.', 'ኢንተርኔት በሌለበት ሰዓትም ምዝገባው አይቋረጥም።')}</p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#DFD9CE]">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#DF9F28]" />
                    <span>{t('Full Traceability', 'ሙሉ ተጠያቂነት')}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">{t('Trace every bag of compost back to the specific intake run.', 'እያንዳንዱ የማዳበሪያ ከረጢት የመጣበትን ባች ማወቅ ይቻላል።')}</p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenStaffLogin}
                  className="px-5 py-2.5 btn-primary text-xs font-bold flex items-center gap-2 shadow-xs transition"
                >
                  <Lock className="w-3.5 h-3.5 text-[#DF9F28]" />
                  <span>{t('Enter Operational System (Staff Demo)', 'የስራ ስርዓቱን ይጎብኙ (ሰራተኞች)')}</span>
                </button>
              </div>
            </div>

            {/* Visual Operational Snapshot */}
            <div className="lg:col-span-6">
              <div className="ethiopic-card bg-[#142318] text-[#FAF7F0] p-4 sm:p-5 rounded-xl border border-[#1F3323] shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono font-bold text-stone-200">GreenMerkato PWA Console</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#DF9F28] px-2 py-0.5 rounded bg-[#DF9F28]/20 border border-[#DF9F28]/40">
                    ONLINE • VERIFIED
                  </span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 rounded bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-stone-400">CURRENT INTAKE RUN</div>
                      <div className="text-sm font-bold text-white mt-0.5">Atikilt Tera - Shed C (6 Stalls)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#DF9F28]">WEIGHT LOGGED</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">189.4 kg</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-stone-400">ACTIVE WINDROW:</span>
                      <div className="text-white font-bold mt-0.5">BATCH-2026-03</div>
                      <div className="text-[#DF9F28] text-[10px] mt-0.5">Temp: 58.2°C • Moisture: 54%</div>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-stone-400">QUALITY AUDIT:</span>
                      <div className="text-emerald-400 font-bold mt-0.5">Grade A Certified</div>
                      <div className="text-stone-400 text-[10px] mt-0.5">Zero weed seeds found</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] text-stone-400 flex items-center justify-between">
                    <span>Municipal Scale ID: SCALE-MK-01</span>
                    <span className="text-emerald-400">Synced to Local DB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FARMER HARVEST CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card overflow-hidden bg-gradient-to-r from-[#1C462C] to-[#122E1D] text-white border border-[#DF9F28]/30 shadow-xl rounded-2xl">
          <TibebStripe height={5} />
          
          <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF9F28]/20 border border-[#DF9F28]/40 text-xs font-bold text-[#DF9F28]">
                <span>ለአርሶ አደሮችና ማኅበራት</span>
                <span>•</span>
                <span>FARMERS & GROWERS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {t(
                  'Are You a Farmer or Cooperative Union Seeking High-Yield Organic Compost?',
                  'የአፈርን ለምነት የሚያሳድግ የተመረመረ የተፈጥሮ ማዳበሪያ ይፈልጋሉ?'
                )}
              </h3>

              <p className="text-sm text-stone-300 font-sans leading-relaxed">
                {t(
                  'GreenMerkato compost is lab-graded and supplied in 50kg branded woven sacks or bulk tipper trucks. Express your interest today to schedule seasonal allocations for teff, maize, and vegetable cultivation.',
                  'የግሪን መርካቶ ኦርጋኒክ ማዳበሪያ በ50 ኪ.ግ ከረጢትና በጅምላ በጭነት መኪና ይቀርባል። የጤፍ፣ በቆሎና አትክልት ምርትዎን ለማሳደግ ዛሬውኑ ፍላጎትዎን ያሳውቁን።'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleNav('farmers')}
                  className="px-5 py-3 rounded-xl bg-[#DF9F28] text-[#142318] font-bold text-xs hover:brightness-105 transition shadow-md flex items-center gap-2"
                >
                  <span>{t('View Farmer Specifications & Express Interest', 'የማዳበሪያ ዝርዝርና የፍላጎት መመዝገቢያ')}</span>
                  <ArrowRight className="w-4 h-4 text-[#142318]" />
                </button>

                <button
                  onClick={() => handleNav('contact')}
                  className="px-4 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition border border-white/20"
                >
                  {t('Direct Sales Inquiry', 'የሽያጭ ክፍልን ያግኙ')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DF9F28]/40 shadow-lg aspect-4/3">
                <img
                  src={farmingHarvestImg}
                  alt="Ethiopian farmers in lush highland fields inspecting crops with rich organic compost soil"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
