import React from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider, MerkatoTeraPill } from '../../common/EthiopicElements';
import { 
  Store, 
  Users, 
  QrCode, 
  CheckCircle2, 
  Scale, 
  Layers, 
  Thermometer, 
  ShieldCheck, 
  Tractor, 
  TrendingUp, 
  ArrowRight,
  AlertTriangle,
  Flame,
  FileCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import compostRepiImg from '../../../assets/images/compost_repi_facility_1788690137052.jpg';

export const HowItWorksPage: React.FC = () => {
  const { setPublicSection, t, language } = useApp();

  const circularSteps = [
    {
      num: '01',
      geez: '፩',
      title: 'Vendor Separates Organic Waste',
      titleAm: 'ነጋዴው ኦርጋኒክ ቆሻሻን ይለያል',
      actor: 'Merkato Stall Trader',
      actorAm: 'የመርካቶ ነጋዴ',
      location: 'Atikilt Tera, Bomb Tera & Shera Tera',
      locationAm: 'አትክልት ተራ፣ ቦምብ ተራና ሽራ ተራ',
      icon: Store,
      color: 'text-[#1C462C] bg-[#1C462C]/10 border-[#1C462C]/20',
      description: 'At the close of market trading or morning delivery, vendors place vegetable leaves, bruised tomatoes, cabbage trimmings, banana stalks, and citrus rinds into dedicated clean crates, keeping them completely separate from plastics and street trash.',
      descriptionAm: 'በግብይት ሰዓት ወይም በማለዳ፣ ነጋዴዎች የተበላሹ አትክልቶችን፣ የጎመን ቅጠሎችንና የሙዝ ልጣጮችን ከፌስታልና ከፕላስቲክ ለይተው በንጹህ ሳጥኖች ያዘጋጃሉ።',
      digitalSync: 'Physical source separation tags; no phone or digital device required from the vendor.'
    },
    {
      num: '02',
      geez: '፪',
      title: 'Cooperative Route Collection',
      titleAm: 'የወጣቶች ኅብረት ስራ ማሰባሰብ',
      actor: 'Addis Ketema Youth Waste Association',
      actorAm: 'የአዲስ ከተማ ወጣቶች ማኅበር',
      location: 'Inner Market Alleys & Stalls',
      locationAm: 'የመርካቶ ውስጣዊ መተላለፊያዎች',
      icon: Users,
      color: 'text-[#B94726] bg-[#B94726]/10 border-[#B94726]/20',
      description: 'Designated youth collection teams navigate Merkato’s narrow market alleys with heavy-duty handcarts and canvas bins, visiting registered stalls along predefined morning and late-afternoon routes.',
      descriptionAm: 'በአዲስ ከተማ የተደራጁ ወጣቶች በጋሪና በልዩ ማጠራቀሚያዎች የታጠቁ ሆነው በየሱቆቹ በመዘዋወር የተዘጋጀውን ኦርጋኒክ ቆሻሻ ይሰበስባሉ።',
      digitalSync: 'Standardized collection route schedules optimized for market alley congestion.'
    },
    {
      num: '03',
      geez: '፫',
      title: 'Vendor Identified via Laminated QR Badge',
      titleAm: 'የሱቅ መለያ በQR ኮድ ይረጋገጣል',
      actor: 'Field Waste Registrar',
      actorAm: 'የመስክ መዛኝ ሰራተኛ',
      location: 'Stall Front Counter',
      locationAm: 'በነጋዴው ሱቅ በር ላይ',
      icon: QrCode,
      color: 'text-[#7A4B29] bg-[#7A4B29]/10 border-[#7A4B29]/20',
      description: 'Each enrolled vendor has a durable, weather-resistant laminated QR card fixed to their stall pole. The collection worker scans this badge using the GreenMerkato mobile interface, instantly identifying the stall ID, trader name, and historic intake tier.',
      descriptionAm: 'እያንዳንዱ የተመዘገበ ነጋዴ በሱቁ ላይ የተለጠፈ የማይበላሽ የQR መለያ ካርድ አለው። ሰራተኛው በስልኩ ስካን በማድረግ የነጋዴውን ስም እና የቀጠናውን መረጃ ያረጋግጣል።',
      digitalSync: 'Instant offline QR lookup against cached vendor registry with offline fallback lookup.'
    },
    {
      num: '04',
      geez: '፬',
      title: 'Visual Quality & Contamination Inspection',
      titleAm: 'የጥራትና የብክለት ፍተሻ',
      actor: 'Field Inspector',
      actorAm: 'የመስክ ተቆጣጣሪ',
      location: 'Intake Point',
      locationAm: 'የማስረከቢያ ቦታ',
      icon: CheckCircle2,
      color: 'text-[#DF9F28] bg-[#DF9F28]/20 border-[#DF9F28]/40',
      description: 'Before tipping waste into the collection hopper, workers inspect for prohibited materials: plastic carrier bags (festal), strings, wire, cigarette butts, or glass. Loads with >2% non-organic contamination are rejected to protect compost integrity.',
      descriptionAm: 'ቆሻሻው ወደ ጋሪው ከመገለበጡ በፊት ፌስታል፣ ፕላስቲክ፣ ገመድ ወይም ብርጭቆ እንደሌለበት በአይን ይመረመራል። ከ2% በላይ ባዕድ ነገር ካለበት ውድቅ ይደረጋል።',
      digitalSync: 'Quality grading score (Clean, Minor Traces, or Rejected) logged directly in GreenMerkato.'
    },
    {
      num: '05',
      geez: '፭',
      title: 'Weight Logged in GreenMerkato PWA',
      titleAm: 'ክብደት በስርዓቱ ይመዘገባል',
      actor: 'Collection Registrar',
      actorAm: 'የምዝገባ ሰራተኛ',
      location: 'Mobile Crane Scale',
      locationAm: 'ተንቀሳቃሽ ዲጂታል መመዘኛ',
      icon: Scale,
      color: 'text-[#1C462C] bg-[#1C462C]/10 border-[#1C462C]/20',
      description: 'The organic crate is hoisted onto a calibrated digital hanging scale. The exact kilograms are recorded into the mobile app, generating an offline digital receipt and adding the data to the daily municipal diversion log.',
      descriptionAm: 'የተሰበሰበው ቆሻሻ በዲጂታል መስቀያ መመዘኛ ይመዘናል። የተገኘው ኪሎ ግራም ወዲያውኑ በPWA ስርዓት ውስጥ ገብቶ ለነጋዴው የጽዳት ማረጋገጫ ይሰጣል።',
      digitalSync: 'Local IndexedDB offline sync queue automatically uploads whenever network connectivity resumes.'
    },
    {
      num: '06',
      geez: '፮',
      title: 'Waste Enters Compost Batches at Repi Yard',
      titleAm: 'ቆሻሻው በረጲ የኮምፖስት ባች ይዋቀራል',
      actor: 'Repi Facility Lead',
      actorAm: 'የረጲ ማዕከል ኦፕሬተር',
      location: 'Repi (Koshe) Aerobic Facility',
      locationAm: 'የረጲ ኦርጋኒክ ማቀነባበሪያ ማዕከል',
      icon: Layers,
      color: 'text-[#7A4B29] bg-[#7A4B29]/10 border-[#7A4B29]/20',
      description: 'Consolidated municipal trucks transport sorted organic biomass to the Repi aerobic facility. Here, wet nitrogen-rich vegetable scrap is layered with dry carbon bulking agents (teff straw, dried grain husks, and wood shavings) into trapezoidal windrows.',
      descriptionAm: 'የተሰበሰበው ኦርጋኒክ በጭነት መኪና ወደ ረጲ ማዕከል ይወሰዳል። በናይትሮጅን የበለጸገው አትክልት በካርቦን ከተሞላው የጤፍ ገለባና ጭድ ጋር ተቀላቅሎ በረጅም ክምር ይዘጋጃል።',
      digitalSync: 'Unique batch ID generated (e.g. BATCH-2026-04) tracking input weight, origin stalls, and recipe ratio.'
    },
    {
      num: '07',
      geez: '፯',
      title: 'Thermophilic Curing & Temperature Monitoring',
      titleAm: 'የሙቀትና እርጥበት ሳይንሳዊ ቁጥጥር',
      actor: 'Agronomic Operations Technician',
      actorAm: 'የግብርና ቴክኒሻን',
      location: 'Aerobic Windrow Yard',
      locationAm: 'የክምር ማፍያ ሜዳ',
      icon: Thermometer,
      color: 'text-[#B94726] bg-[#B94726]/10 border-[#B94726]/20',
      description: 'Microbial decomposition naturally generates intense heat. Operators use 1-meter digital dial probes to verify that core temperatures maintain 55°C–65°C for at least 15 consecutive days, destroying all pathogens, weed seeds, and insect eggs.',
      descriptionAm: 'በክምሩ ውስጥ ባለው ተፈጥሯዊ ረቂቅ ህዋስ ምክንያት ሙቀቱ ከ55-65 ዲግሪ ሴንቲግሬድ ይደርሳል። ይህ ከፍተኛ ሙቀት ለ15 ቀናት ተጠብቆ አረሞችንና ተህዋስያንን ሙሉ በሙሉ ያጸዳል።',
      digitalSync: 'Daily temperature and moisture readings logged in GreenMerkato, triggering automated turning alerts.'
    },
    {
      num: '08',
      geez: '፰',
      title: 'Screening & Laboratory Quality Certification',
      titleAm: 'መንፋትና የላብራቶሪ ጥራት ምርመራ',
      actor: 'Quality Assurance Auditor',
      actorAm: 'የጥራት ኦዲተር',
      location: 'Addis Ababa Agronomy Lab',
      locationAm: 'የአዲስ አበባ አግሮኖሚ ላብራቶሪ',
      icon: ShieldCheck,
      color: 'text-[#1C462C] bg-[#1C462C]/10 border-[#1C462C]/20',
      description: 'After 60–75 days of active curing and stabilization, mature compost is passed through rotary trommel screens (8mm and 14mm). Samples undergo laboratory testing for organic matter content (>40%), C:N ratio (15:1–20:1), and seed germination safety.',
      descriptionAm: 'ከ60-75 ቀናት የማብሰል ሂደት በኋላ፣ ኮምፖስቱ በ8ሚሜ እና 14ሚሜ ወንፊት ይነፋል። የናይትሮጅንና ካርቦን ምጣኔ፣ የPH መጠንና የመብቀል ብቃት በላብራቶሪ ተረጋግጦ ሰርተፊኬት ይሰጠዋል።',
      digitalSync: 'Official Grade A or Grade B certificate number attached to the finished batch inventory.'
    },
    {
      num: '09',
      geez: '፱',
      title: 'Sold & Distributed to Farmers and Unions',
      titleAm: 'ለገበሬዎችና ማኅበራት ይሸጣል/ይሰራጫል',
      actor: 'Sales & Logistics Officer',
      actorAm: 'የስርጭትና ሽያጭ ኃላፊ',
      location: 'Oromia & Shewa Farming Belts',
      locationAm: 'የኦሮሚያና ሸዋ የግብርና ቀጠናዎች',
      icon: Tractor,
      color: 'text-[#7A4B29] bg-[#7A4B29]/10 border-[#7A4B29]/20',
      description: 'Certified compost is packaged in 50kg moisture-resistant sacks or dispatched in bulk tipper trucks to smallholder farmers and primary cooperative unions in Shewa, Oromia, and urban horticultural projects in Addis Ababa.',
      descriptionAm: 'የተመረመረው ማዳበሪያ በ50 ኪሎ ከረጢት ተሞልቶ ወይም በጅምላ በጭነት መኪና ለገበሬ ማኅበራት፣ ለፍራፍሬ አምራቾችና ለከተማ ግብርና አቅራቢዎች ይሰራጫል።',
      digitalSync: 'Electronic sales receipts with CBE and Telebirr transaction IDs tracked against stock inventory.'
    },
    {
      num: '10',
      geez: '፲',
      title: 'Impact Traceability & Municipal Reporting',
      titleAm: 'የአካባቢ ተፅዕኖ ሪፖርትና ማረጋገጫ',
      actor: 'City Environmental Oversight',
      actorAm: 'የከተማው የአካባቢ ጥበቃ ክትትል',
      location: 'City Cleansing Management Agency',
      locationAm: 'የከተማ ጽዳት አስተዳደር ኤጀንሲ',
      icon: TrendingUp,
      color: 'text-[#1C462C] bg-[#1C462C]/10 border-[#1C462C]/20',
      description: 'The loop is complete. GreenMerkato aggregates total diverted organic tonnage, calculates avoided methane (MT CO₂e via IPCC Tier 1 solid waste methodologies), and delivers transparent impact reports to city authorities and agricultural partners.',
      descriptionAm: 'ሂደቱ ተጠናቀቀ። ግሪን መርካቶ ከቆሻሻ መጣያ የዳነውን አጠቃላይ ቶን፣ የቀረውን የሚቴን ካርቦን ልቀትና የተፈጠረውን የስራ ዕድል በግልጽ አስልቶ ለከተማው አስተዳደር ያቀርባል።',
      digitalSync: 'Open impact dashboards, audit ledger records, and verification credentials available online.'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>THE 10-STEP CIRCULAR LOOP</span>
            <span>•</span>
            <span>የ10 ደረጃዎች አሰራር</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'How GreenMerkato Closes the Biological Nutrient Cycle',
              'ግሪን መርካቶ እንዴት የኦርጋኒክ ንጥረ-ነገርን ክብ-ሂደት ያጠናቅቃል?'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'Follow the verifiable journey of organic waste: from a cabbage stall in Atikilt Tera to certified soil nutrition feeding teff and vegetable fields across the Ethiopian highlands.',
              'የቆሻሻውን ለውጥ ደረጃ በደረጃ ይመልከቱ፡ በአትክልት ተራ ካለ የጎመን ሱቅ ጀምሮ በረጲ ማዕከል ተፍጅቶ ለኢትዮጵያ ገበሬዎች ለም አፈር እስኪሆን ድረስ።'
            )}
          </p>
        </div>

        <EthiopicDivider amharicLabel="ከመርካቶ እስከ ማሳ ድረስ" label="From Market to Farmland" className="my-8" />
      </section>

      {/* 10-Step Visual Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {circularSteps.map((step, idx) => {
            const IconComp = step.icon;

            return (
              <div 
                key={step.num}
                className="ethiopic-card bg-white p-5 sm:p-7 border border-[#DFD9CE] hover:border-[#1C462C]/40 transition shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Step Numbers & Actor Badges */}
                  <div className="lg:col-span-3 space-y-2 border-b lg:border-b-0 lg:border-r border-[#DFD9CE] pb-4 lg:pb-0 lg:pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] font-mono">
                        {step.num}
                      </span>
                      <span className="text-lg font-bold text-[#DF9F28] font-sans px-2 py-0.5 rounded bg-[#DF9F28]/10 border border-[#DF9F28]/25">
                        {step.geez}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-bold text-stone-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B94726]" />
                        <span>{language === 'am' ? step.actorAm : step.actor}</span>
                      </div>
                      <div className="text-[10px] text-stone-500 flex items-center gap-1">
                        <span>{language === 'am' ? step.locationAm : step.location}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#1C462C] bg-[#1C462C]/5 px-2 py-0.5 rounded border border-[#1C462C]/15">
                        STEP {idx + 1} OF 10
                      </span>
                    </div>
                  </div>

                  {/* Main Description */}
                  <div className="lg:col-span-6 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${step.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C462C]">
                          {language === 'am' ? step.titleAm : step.title}
                        </h3>
                        <p className="text-xs text-[#B94726] font-medium">
                          {language === 'am' ? step.title : step.titleAm}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans pt-1">
                      {language === 'am' ? step.descriptionAm : step.description}
                    </p>
                  </div>

                  {/* Digital Platform & Verification Note */}
                  <div className="lg:col-span-3 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#DFD9CE] space-y-1.5 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#DF9F28] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{t('GreenMerkato Digital Integration', 'የዲጂታል ስርዓቱ ሚና')}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 font-sans leading-tight">
                      {step.digitalSync}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Thermophilic Curing Science Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-[#1C462C] text-[#FAF7F0] p-6 sm:p-8 rounded-2xl border border-[#DF9F28]/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF9F28]/20 border border-[#DF9F28]/40 text-xs font-bold text-[#DF9F28]">
                <Flame className="w-3.5 h-3.5" />
                <span>{t('Scientific Biological Sanitation', 'ሳይንሳዊ የተፈጥሮ ማጣሪያ')}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {t(
                  'Why Our Compost Reaches 55°C–65°C: Weed & Pathogen Sanitation',
                  'የኮምፖስት ሙቀቱ ለምን ከ55-65 ዲግሪ ሴንቲግሬድ ይደርሳል?'
                )}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                {t(
                  'Uncontrolled manure or rotting rubbish carries virulent plant pathogens (e.g. Fusarium wilt, potato blight) and weed seeds that infest farm soils. In the GreenMerkato windrow system, beneficial thermophilic actinobacteria generate intense biological heat that completely destroys weed seeds and harmful bacteria while leaving beneficial humus intact.',
                  'ያልበሰለ ቆሻሻ ወይም ፍግ የሰብል በሽታዎችንና አደገኛ የአረም ዘሮችን ይይዛል። በረጲ ማዕከል በሚፈጠረው የተፈጥሮ ከፍተኛ ሙቀት ግን አረሞችና በሽታ አምጪ ተህዋስያን ሙሉ በሙሉ ይቃጠላሉ፤ ጠቃሚው የአፈር ንጥረ-ነገር ብቻ ይቀራል።'
                )}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-stone-400">Target Temp</div>
                  <div className="font-mono font-bold text-base text-[#DF9F28] mt-0.5">55°C – 65°C</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-stone-400">Sanitation Duration</div>
                  <div className="font-mono font-bold text-base text-emerald-400 mt-0.5">15+ Days</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase text-stone-400">Total Curing Cycle</div>
                  <div className="font-mono font-bold text-base text-white mt-0.5">60 – 75 Days</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DF9F28]/40 shadow-md aspect-4/3">
                <img
                  src={compostRepiImg}
                  alt="Monitoring temperature in compost windrows at Repi facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA to View Impact or Vendors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1C462C]">
          {t('Ready to see the measured outcomes or get involved?', 'የተመዘገበውን ውጤት ወይም የተሳትፎ መንገዶችን ይመልከቱ')}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setPublicSection('impact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3 btn-primary text-xs font-bold flex items-center gap-2"
          >
            <span>{t('View Verified Impact Data', 'የተረጋገጠውን ተፅዕኖ ይመልከቱ')}</span>
            <ArrowRight className="w-4 h-4 text-[#DF9F28]" />
          </button>

          <button
            onClick={() => {
              setPublicSection('vendors');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3 btn-secondary text-xs font-bold border border-[#DFD9CE]"
          >
            {t('Information for Market Vendors', 'ለመውጫ ነጋዴዎች የተዘጋጀ መረጃ')}
          </button>
        </div>
      </section>
    </div>
  );
};
