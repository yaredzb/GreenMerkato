import React from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider } from '../../common/EthiopicElements';
import { 
  Compass, 
  MapPin, 
  Layers, 
  Users, 
  Smartphone, 
  Target, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  HeartHandshake
} from 'lucide-react';
import merkatoMarketImg from '../../../assets/images/merkato_market_stalls_1788690125174.jpg';
import compostRepiImg from '../../../assets/images/compost_repi_facility_1788690137052.jpg';

export const AboutPage: React.FC = () => {
  const { t, language, setPublicSection } = useApp();

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>OUR MISSION & PURPOSE</span>
            <span>•</span>
            <span>ዓላማችንና ተልዕኳችን</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Bridging Urban Addis Ababa and Highland Agriculture Through Circularity',
              'ከተማዋንና ገጠሩን በክብ-ኢኮኖሚ የሚያስተሳስር ዘላቂ ስርዓት'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'GreenMerkato was founded to resolve a glaring paradox: Africa’s largest open marketplace produced mountains of biological waste that choked city gutters, while surrounding farming communities struggled with nutrient-depleted soils and soaring fertilizer costs.',
              'ግሪን መርካቶ የተቋቋመው አንድን ትልቅ ተቃርኖ ለመፍታት ነው፡ በአንድ በኩል መርካቶ በየቀኑ የሚያመነጨው ተረፈ-አትክልት የከተማዋን ቦይ ሲደፍን፤ በሌላ በኩል ደግሞ ገበሬዎች የአፈር ለምነት አጥተው በውድ ማዳበሪያ ይቸገራሉ።'
            )}
          </p>
        </div>

        <EthiopicDivider amharicLabel="ከቆሻሻ ወደ ለምነት" label="From Waste to Sovereign Wealth" className="my-8" />
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C462C]/10 text-[#1C462C] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('Our Mission', 'ተልዕኳችን')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'To create a resilient, self-sustaining circular bio-economy in Addis Ababa that diverts 100% of organic market waste into certified, pathogen-free soil nutrients for Ethiopian smallholders.',
                'በአዲስ አበባ ከተማ አስተማማኝ የክብ-ኢኮኖሚ በመፍጠር የገበያ ተረፈ-አትክልትን ሙሉ በሙሉ ወደ ተመረመረና ከበሽታ ወደ ጸዳ የተፈጥሮ ማዳበሪያነት መቀየር።'
              )}
            </p>
          </div>

          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#B94726]/10 text-[#B94726] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('Our Vision', 'ራዕያችን')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'An Ethiopia where urban centers are net nutrient donors to the countryside, eliminating methane emissions at municipal landfills while strengthening sovereign agricultural food systems.',
                'ከተሞች ለገጠሩ ማሳ የተፈጥሮ ንጥረ-ነገር አቅራቢ የሚሆኑበት፤ የቆሻሻ መጣያ የሚቴን ልቀት የሚቆምበትና የሀገር ውስጥ የምግብ ዋስትና የሚረጋገጥበት ኢትዮጵያን ማየት።'
              )}
            </p>
          </div>

          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#DF9F28]/20 text-[#8B5E3C] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('Our Values', 'እሴቶቻችን')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'Transparency through measured data, dignified livelihoods for youth waste workers, absolute zero tolerance for plastic contamination, and equitable partnership with farmers.',
                'ግልጽነት በተረጋገጠ መረጃ፣ ለወጣት ሰራተኞች ክብርና ተመጣጣኝ ገቢ፣ ለፕላስቲክ ብክለት ዜሮ መቻቻል እና ከአርሶ አደሮች ጋር ፍትሃዊ አጋርነት።'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* LOCAL ADDIS ABABA CONTEXT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-[#FAF7F0] p-6 sm:p-10 rounded-2xl border border-[#DFD9CE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>MERKATO & REPI CONTEXT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] tracking-tight">
                {t(
                  'The Unique Reality of Addis Ababa’s Urban Metabolism',
                  'የአዲስ አበባ ልዩ የቆሻሻና የገበያ ተጨባጭ ሁኔታ'
                )}
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                <p>
                  {t(
                    'Merkato is not just a market—it is an economic engine covering over several square kilometers in Addis Ketema. Over 13,000 formal and informal traders operate here, moving tens of thousands of quintals of vegetables, tubers, and fruits from Hawassa, Arba Minch, and Shashamane every single week.',
                    'መርካቶ ተራ የገበያ ስፍራ ሳይሆን በአዲስ ከተማ ክፍለ ከተማ የተዘረጋ ግዙፍ የኢኮኖሚ ማዕከል ነው። ከሀዋሳ፣ አርባ ምንጭና ሻሸመኔ በሳምንት በአስር ሺዎች የሚቆጠር ኩንታል አትክልትና ፍራፍሬ ይገባበታል።'
                  )}
                </p>
                <p>
                  {t(
                    'Historically, organic trimmings from this commerce were carted to Repi (Koshe), a dumpsite opened in the late 1960s. Anaerobic conditions at Repi generated volatile landfill gases and caused catastrophic slope failures. GreenMerkato converts that organic waste stream before it ever leaves the market gate.',
                    'ከዚህ ግብይት የሚወጣው ተረፈ-ምርት በ1960ዎቹ ወደ ተከፈተው የረጲ (ቆሼ) መጣያ ሲጓጓዝ ቆይቷል። በኦክስጅን እጥረት የሚፈጠረው አደገኛ ጋዝ ለአደጋ ምክንያት ሆኗል። ግሪን መርካቶ ይህን ቆሻሻ ከመነሻው ያስቀራል።'
                  )}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#DFD9CE] shadow-md aspect-4/3">
                <img
                  src={merkatoMarketImg}
                  alt="Historic Merkato market alleys in Addis Ababa"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE ROLE OF TECHNOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
            {t('Pragmatic Civic Tech', 'ተጨባጭ የቴክኖሎጂ ሚና')}
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C462C]">
            {t('Technology Designed for Addis Ababa’s Infrastructure', 'ከአዲስ አበባ መሠረተ-ልማት ጋር የተጣጣመ ቴክኖሎጂ')}
          </h2>
          <p className="text-xs text-stone-600">
            {t('Why we chose offline-first PWA architectures, physical scales, and QR badges over consumer apps.', 'የተጠቃሚ አፕሊኬሽን ሳይሆን ኦፍላይን PWA እና የQR ባጅ ለምን መረጥን?')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="ethiopic-card bg-white p-5 border border-[#DFD9CE] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1C462C]/10 text-[#1C462C] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('Offline-First Architecture', 'ኢንተርኔት የማይፈልግ አሰራር')}
            </h4>
            <p className="text-stone-600 leading-relaxed">
              {t(
                'Market sheds in Merkato have intermittent mobile network reception. The GreenMerkato PWA caches records locally in IndexedDB and queues synchronization automatically when a connection is detected.',
                'በመርካቶ ሼዶች ውስጥ የኔትወርክ መቆራረጥ የተለመደ ነው። ስርዓታችን መረጃውን በስልኩ ላይ አስቀምጦ ኔትወርክ ሲገኝ ወዲያውኑ ያስተላልፋል።'
              )}
            </p>
          </div>

          <div className="ethiopic-card bg-white p-5 border border-[#DFD9CE] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#DF9F28]/20 text-[#8B5E3C] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('Empirical Scale Weighing', 'ትክክለኛ መመዘኛ በመስክ')}
            </h4>
            <p className="text-stone-600 leading-relaxed">
              {t(
                'We never use visual volumetric guesses or theoretical multipliers. Every kilogram diverted from landfill is weighed with a calibrated electronic crane scale, creating an immutable audit trail.',
                'በግምት ወይም በሳጥን ብዛት አንሰላም። እያንዳንዱ ኪሎ ግራም በዲጂታል መመዘኛ ተመዝኖ በከተማው የኦዲት መዝገብ ላይ ይሰፍራል።'
              )}
            </p>
          </div>

          <div className="ethiopic-card bg-white p-5 border border-[#DFD9CE] space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#B94726]/10 text-[#B94726] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              {t('Stall-to-Sack Traceability', 'ከሱቅ እስከ ከረጢት ያለው ቁጥጥር')}
            </h4>
            <p className="text-stone-600 leading-relaxed">
              {t(
                'Each batch of cured compost links directly to its intake logs and participating stalls. If a batch tests with elevated salinity, we can trace back the specific market quarter and refine separation guidelines.',
                'እያንዳንዱ የማዳበሪያ ባች ከመጣበት የገበያ ቀጠና ጋር የተገናኘ ነው። ጥራቱ ቢጓደል ምንጩን አውቀን ወዲያውኑ ማስተካከል እንችላለን።'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & KEY PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-white p-6 sm:p-8 rounded-2xl border border-[#DFD9CE] shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-[#DFD9CE]">
            <AddisAbabaSeal size="sm" />
            <h3 className="font-serif font-bold text-lg text-[#1C462C]">
              {t('Institutional Governance & Operational Partners', 'የአመራርና የአጋር ተቋማት ትስስር')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#DFD9CE] space-y-1">
              <span className="font-bold text-stone-900 block">Addis Ababa Cleansing Agency</span>
              <span className="text-[11px] text-[#DF9F28] font-bold block">የአዲስ አበባ ጽዳት አስተዳደር</span>
              <p className="text-[11px] text-stone-600 pt-1">Municipal oversight, facility allocation at Repi yard, and solid waste diversion licensing.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#DFD9CE] space-y-1">
              <span className="font-bold text-stone-900 block">Addis Ketema Sub-City</span>
              <span className="text-[11px] text-[#DF9F28] font-bold block">የአዲስ ከተማ ክፍለ ከተማ</span>
              <p className="text-[11px] text-stone-600 pt-1">Market administration, vendor zoning at Atikilt Tera, and youth enterprise registration.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#DFD9CE] space-y-1">
              <span className="font-bold text-stone-900 block">Youth Waste Cooperatives</span>
              <span className="text-[11px] text-[#DF9F28] font-bold block">የወጣቶች ኅብረት ስራ ማኅበራት</span>
              <p className="text-[11px] text-stone-600 pt-1">Daily field collection operations, weight logging, and frontline stall engagement.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#DFD9CE] space-y-1">
              <span className="font-bold text-stone-900 block">Agronomy & Soil Advisors</span>
              <span className="text-[11px] text-[#DF9F28] font-bold block">የአፈርና አግሮኖሚ አማካሪዎች</span>
              <p className="text-[11px] text-stone-600 pt-1">Windrow temperature verification, C:N balancing, and certified lab analysis for farmers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
