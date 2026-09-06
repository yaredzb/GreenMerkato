import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider } from '../../common/EthiopicElements';
import { 
  Tractor, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Sparkles, 
  Check, 
  Phone, 
  Send, 
  FileCheck,
  TrendingUp,
  PackageCheck,
  ArrowRight
} from 'lucide-react';
import farmingHarvestImg from '../../../assets/images/ethiopian_farming_harvest_1788690149107.jpg';
import compostRepiImg from '../../../assets/images/compost_repi_facility_1788690137052.jpg';

export const FarmersPage: React.FC = () => {
  const { t, language, showToast } = useApp();

  const [buyerName, setBuyerName] = useState('');
  const [buyerType, setBuyerType] = useState('Farmer Union / Cooperative');
  const [region, setRegion] = useState('Oromia - Shewa Belt');
  const [requestedTonnage, setRequestedTonnage] = useState('10 Tons (200 Sacks)');
  const [targetCrop, setTargetCrop] = useState('Teff & Cereal Grains');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      t('Compost Inquiry Received', 'የማዳበሪያ ፍላጎት ጥያቄ ተመዝግቧል'),
      t(
        `Thank you ${buyerName || 'Partner'}! Our Repi facility logistics team will contact you at ${phone} to arrange allocation and delivery quotation.`,
        `እናመሰግናለን! የረጲ ማዕከል የሎጂስቲክስ ቡድን በስልክ ቁጥርዎ (${phone}) አማካኝነት የማዳበሪያ አቅርቦት ሁኔታን ያሳውቅዎታል።`
      )
    );
  };

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>FOR FARMERS & COOPERATIVE UNIONS</span>
            <span>•</span>
            <span>ለአርሶ አደሮችና ማኅበራት</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Certified Organic Compost for Highland Crop Resilience',
              'ለኢትዮጵያ አርሶ አደሮች የተዘጋጀ ጥራት ያለው የተፈጥሮ ማዳበሪያ'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'Regenerate your soil, boost water retention by 40%, and reduce dependence on expensive chemical fertilizers. Produced under strict scientific windrow management at the Repi facility.',
              'የአፈርዎን ለምነት ያሳድጉ፤ የውሃ ይዞታን በ40% ያሻሽሉ፤ ውድ በሆነው የኬሚካል ማዳበሪያ ላይ ያለዎትን ጥገኝነት ይቀንሱ። በረጲ ማዕከል በከፍተኛ ሳይንሳዊ ቁጥጥር የተዘጋጀ።'
            )}
          </p>
        </div>

        <EthiopicDivider amharicLabel="ጥራት ያለው የተፈጥሮ ማዳበሪያ" label="Lab-Grade Organic Soil Food" className="my-8" />
      </section>

      {/* PROVENANCE & ORIGIN: WHERE DOES THE COMPOST COME FROM? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF9F28]/20 text-[#8B5E3C] text-xs font-bold font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>FACILITY PROVENANCE: REPI, ADDIS ABABA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C462C] tracking-tight">
              {t('Where Does GreenMerkato Compost Come From?', 'የግሪን መርካቶ ማዳበሪያ ከየት ነው የሚገኘው?')}
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              {t(
                'Our compost is sourced exclusively from segregated, uncontaminated market biomass from Merkato’s Atikilt Tera, Bomb Tera, and grain sheds. It is aerobically cured at the dedicated Repi conversion facility operated under Addis Ababa Cleansing Management Agency standards.',
                'ማዳበሪያችን የሚዘጋጀው በመርካቶ አትክልት ተራ፣ ቦምብ ተራና የእህል ሼዶች ከተሰበሰበ ንጹህ ተረፈ-አትክልትና ጭድ ብቻ ነው። በረጲ ማዕከል ውስጥ በንጹህ አየር ክምር (Aerobic Windrow) ይበስላል።'
              )}
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE] flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#1C462C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">{t('No Municipal Sludge or Toxic Debris:', 'ምንም ዓይነት ፍሳሽ ወይም ጎጂ ቆሻሻ የለበትም፡')}</span>{' '}
                  <span className="text-stone-600">{t('Only plant-based vegetable scraps, fruit peelings, teff straw, and clean grain husks.', 'ንጹህ የአትክልት ተረፈ-ምርት፣ የፍራፍሬ ልጣጭና የጤፍ ገለባ ብቻ።')}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#DFD9CE] flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#1C462C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">{t('Full Batch Traceability:', 'የመጣበትን ባች በግልጽ ማወቅ ይቻላል፡')}</span>{' '}
                  <span className="text-stone-600">{t('Every bag is assigned a batch tracking code linked to its curing timeline and lab test results.', 'እያንዳንዱ ከረጢት የመጣበትን ባች፣ የፈላበትን ቀንና የላብራቶሪ ሰርተፊኬት ይዟል።')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="ethiopic-card p-2.5 bg-white border border-[#DFD9CE] shadow-lg rounded-2xl">
              <TibebStripe height={4} className="mb-2 rounded-t-lg" />
              <div className="rounded-xl overflow-hidden aspect-16/10 bg-stone-100">
                <img
                  src={compostRepiImg}
                  alt="Windrows of rich organic compost at Repi facility in Addis Ababa"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 text-xs text-stone-600 flex items-center justify-between">
                <span className="font-bold text-[#1C462C]">Repi Facility Aerobic Windrows</span>
                <span className="text-stone-500 font-mono">100% Plant-Derived Organic Matter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SPECIFICATIONS: GRADE A VS GRADE B */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
            {t('Quality Control Grades', 'የጥራት ደረጃ መለያ')}
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C462C]">
            {t('Choose the Right Grade for Your Soil & Crops', 'ለእርሻዎና ለሰብልዎ የሚስማማውን ደረጃ ይምረጡ')}
          </h2>
          <p className="text-xs text-stone-600">
            {t('Both grades adhere to Ethiopian quality benchmarks for organic amendments.', 'ሁለቱም ደረጃዎች የኢትዮጵያን የጥራት መመዘኛ ያሟሉ ናቸው።')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grade A */}
          <div className="ethiopic-card bg-white p-6 sm:p-7 border-2 border-[#1C462C] shadow-md rounded-2xl relative">
            <div className="absolute top-4 right-4 bg-[#1C462C] text-[#FAF7F0] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#DF9F28]">
              PREMIUM HORTICULTURAL
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#DF9F28] uppercase tracking-wider">Grade A Certified</span>
              <h3 className="font-serif font-bold text-xl text-[#1C462C]">
                {t('Bio-Enriched Organic Soil Food', 'ደረጃ 1 - ባዮ-የበለጸገ ኦርጋኒክ ማዳበሪያ')}
              </h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1">
                {t(
                  'Fine-screened to 8mm for fast biological integration. Formulated specifically for vegetables, greenhouse nurseries, and high-value horticultural crops.',
                  'በ8ሚሜ የተነፋ፤ ለቲማቲም፣ ሽንኩርት፣ ቃሪያ፣ ድንችና የግሪንሃውስ አትክልቶች ምርታማነት የተዘጋጀ።'
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-6 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">C:N Ratio</div>
                <div className="text-base font-bold text-[#1C462C] mt-0.5">15:1 – 18:1</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">Organic Carbon</div>
                <div className="text-base font-bold text-[#1C462C] mt-0.5">&gt; 45.0%</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">Screening Mesh</div>
                <div className="text-base font-bold text-stone-900 mt-0.5">8mm Trommel</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">Soil pH</div>
                <div className="text-base font-bold text-stone-900 mt-0.5">6.8 – 7.3</div>
              </div>
            </div>

            <div className="border-t border-[#DFD9CE] pt-4 space-y-1.5 text-xs text-stone-700">
              <div className="font-bold text-stone-900">{t('Ideal Applications:', 'የሚመከርባቸው ሰብሎች፡')}</div>
              <p className="text-[11px] text-stone-600">
                {t('Tomatoes, onions, garlic, cabbage, peppers, avocado trees, nursery seedling beds, floriculture.', 'ቲማቲም፣ ሽንኩርት፣ ነጭ ሽንኩርት፣ ቃሪያ፣ አቮካዶ፣ ችግኝ ጣቢያዎች።')}
              </p>
            </div>
          </div>

          {/* Grade B */}
          <div className="ethiopic-card bg-white p-6 sm:p-7 border border-[#DFD9CE] shadow-xs rounded-2xl relative">
            <div className="absolute top-4 right-4 bg-stone-100 text-stone-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-stone-300">
              BROADACRE FIELD CROPS
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#7A4B29] uppercase tracking-wider">Grade B Certified</span>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                {t('General Agricultural Soil Conditioner', 'ደረጃ 2 - አጠቃላይ የእርሻ ማዳበሪያ')}
              </h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1">
                {t(
                  'Screened to 14mm with slightly coarser organic fiber to provide sustained multi-season aeration, water retention, and microbial habitat in highland clay soils.',
                  'በ14ሚሜ የተነፋ፤ የሸክላ አፈርን ለማስተንፈስና ውሃ እንዲይዝ በማድረግ ለጤፍና ጥራጥሬ ማሳ የሚሆን።'
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-6 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">C:N Ratio</div>
                <div className="text-base font-bold text-[#7A4B29] mt-0.5">18:1 – 22:1</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">Organic Matter</div>
                <div className="text-base font-bold text-[#7A4B29] mt-0.5">&gt; 38.0%</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">Screening Mesh</div>
                <div className="text-base font-bold text-stone-900 mt-0.5">14mm Mesh</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#DFD9CE]">
                <div className="text-[10px] uppercase text-stone-500">Soil pH</div>
                <div className="text-base font-bold text-stone-900 mt-0.5">7.0 – 7.6</div>
              </div>
            </div>

            <div className="border-t border-[#DFD9CE] pt-4 space-y-1.5 text-xs text-stone-700">
              <div className="font-bold text-stone-900">{t('Ideal Applications:', 'የሚመከርባቸው ሰብሎች፡')}</div>
              <p className="text-[11px] text-stone-600">
                {t('Teff (ጤፍ), maize, wheat, barley, sorghum, pulses, pasture grass, and agroforestry.', 'ጤፍ፣ በቆሎ፣ ስንዴ፣ ገብስ፣ አተር፣ ባቄላና የመኖ ሳር።')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGING & LOGISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-[#FAF7F0] p-6 sm:p-8 rounded-xl border border-[#DFD9CE]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DF9F28] mb-1">
            <PackageCheck className="w-4 h-4" />
            <span>{t('Packaging & Delivery Options', 'የማሸጊያና የማጓጓዣ አማራጮች')}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C462C]">
            {t('Available in Sacks or Bulk Tipper Trucks', 'በ50 ኪሎ ከረጢት ወይም በጅምላ በጭነት መኪና ይቀርባል')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-xs">
            <div className="bg-white p-4.5 rounded-xl border border-[#DFD9CE] space-y-2">
              <div className="font-bold text-sm text-stone-900 flex items-center justify-between">
                <span>50kg Branded Sacks</span>
                <span className="text-[#1C462C] font-mono">Bagged</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {t(
                  'Heavy woven polypropylene bags with inner moisture liners. Convenient for smallholder plots, tree nurseries, and urban farms.',
                  'እርጥበት እንዳይገባ የተሰራ የፕላስቲክ ከረጢት። ለግል አርሶ አደሮችና ለችግኝ ጣቢያዎች አመቺ ነው።'
                )}
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-[#DFD9CE] space-y-2">
              <div className="font-bold text-sm text-stone-900 flex items-center justify-between">
                <span>5–10 Ton Tipper Truck</span>
                <span className="text-[#7A4B29] font-mono">Medium Bulk</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {t(
                  'Ideal for medium commercial growers and primary cooperative branch stations across Shewa and Oromia.',
                  'ለመካከለኛ አምራቾችና ለቀበሌ ገበሬ ማኅበራት ማከፋፈያ የሚሆን የጭነት መኪና አቅርቦት።'
                )}
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-[#DFD9CE] space-y-2">
              <div className="font-bold text-sm text-stone-900 flex items-center justify-between">
                <span>20–30 Ton Union Freight</span>
                <span className="text-[#DF9F28] font-mono">Large Union</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {t(
                  'Scheduled seasonal bulk freight for large agricultural cooperative unions with advance reservation.',
                  'ለግዙፍ የገበሬዎች ኅብረት ስራ ዩኒየኖች በወቅታዊ ውል የሚቀርብ የጅምላ አቅርቦት።'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FARMER INQUIRY & EXPRESSION OF INTEREST FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-white p-6 sm:p-8 rounded-2xl border border-[#DFD9CE] shadow-lg">
          <div className="text-center space-y-2 pb-6 border-b border-[#DFD9CE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
              <Tractor className="w-3.5 h-3.5" />
              <span>EXPRESS INTEREST</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C462C]">
              {t('Express Interest in Compost Allocation', 'የማዳበሪያ ፍላጎትዎን እዚህ ይመዝግቡ')}
            </h3>
            <p className="text-xs text-stone-600">
              {t('Whether you need 20 sacks for a horticultural farm or bulk truckloads for a union, our sales coordinator will provide pricing and scheduling.', 'ለአትክልት ማሳ ጥቂት ከረጢት ወይም ለኅብረት ስራ ዩኒየን በጅምላ ከፈለጉ፣ የሽያጭ ቡድናችን የዋጋና የማድረሻ ሁኔታ ያሳውቅዎታል።')}
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1C462C]">
                {t('Inquiry Submitted Successfully!', 'የማዳበሪያ ጥያቄዎ ደርሶናል!')}
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {t('Our sales and logistics desk has logged your seasonal request. We will contact your phone with pricing and delivery schedules.', 'የሽያጭና ስርጭት ክፍላችን መረጃዎን ይዟል። በስልክዎ የዋጋና የማጓጓዣ ሁኔታ ይነገርዎታል።')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 border border-[#DFD9CE] rounded-lg text-xs font-bold text-stone-700 hover:bg-[#FAF7F0]"
              >
                {t('Submit Another Request', 'ሌላ ጥያቄ ያስገቡ')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Name or Organization *', 'የግለሰብ ወይም የማኅበር ስም *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Oromia Farmers Union / አቶ ተስፋዬ"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Phone Number (CBE / Telebirr) *', 'ስልክ ቁጥር (ቴሌብር / CBE) *')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Buyer Category *', 'የገዢው አይነት *')}
                  </label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="Farmer Union / Cooperative">Cooperative Union (የገበሬ ዩኒየን)</option>
                    <option value="Smallholder Farmer">Smallholder Farmer (አርሶ አደር)</option>
                    <option value="Commercial Farm">Commercial Farm (የግል እርሻ)</option>
                    <option value="Urban Agriculture">Urban Agriculture (የከተማ ግብርና)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Farming Location *', 'የእርሻው አድራሻ *')}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="Oromia - Shewa Belt">Oromia (ሸዋ / Shewa)</option>
                    <option value="Addis Ababa Green Belt">Addis Ababa Outskirts (የአዲስ አበባ ዙሪያ)</option>
                    <option value="Amhara Region">Amhara Region (አማራ ክልል)</option>
                    <option value="Central Ethiopia">Central Ethiopia (ማዕከላዊ ኢትዮጵያ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Estimated Quantity *', 'የሚፈልጉት መጠን *')}
                  </label>
                  <select
                    value={requestedTonnage}
                    onChange={(e) => setRequestedTonnage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="1 Ton (20 Sacks)">1 Ton / 20 Sacks (20 ከረጢት)</option>
                    <option value="5 Tons (100 Sacks)">5 Tons / 100 Sacks (100 ከረጢት)</option>
                    <option value="10 Tons (200 Sacks)">10 Tons / 200 Sacks (200 ከረጢት)</option>
                    <option value="20+ Tons Bulk Truck">20+ Tons Bulk Truck (በጅምላ መኪና)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#DF9F28]" />
                  <span>{t('Send Compost Interest Request', 'የፍላጎት ጥያቄውን ላክ')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
