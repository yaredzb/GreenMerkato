import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider, MerkatoTeraPill } from '../../common/EthiopicElements';
import { 
  Store, 
  Check, 
  X, 
  Scale, 
  QrCode, 
  Clock, 
  AlertTriangle, 
  Send,
  Sparkles
} from 'lucide-react';
import merkatoMarketImg from '../../../assets/images/merkato_market_stalls_1788690125174.jpg';

export const VendorsPage: React.FC = () => {
  const { t, language, showToast, vendors } = useApp();

  const [stallName, setStallName] = useState('');
  const [traderName, setTraderName] = useState('');
  const [phone, setPhone] = useState('');
  const [marketQuarter, setMarketQuarter] = useState('Atikilt Tera');
  const [primaryProduce, setPrimaryProduce] = useState('Vegetables');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      t('Vendor Enrollment Received', 'የነጋዴ ምዝገባ ጥያቄ ተልኳል'),
      t(
        `Thank you ${traderName || 'Trader'}! An Addis Ketema cooperative coordinator will visit your stall at ${marketQuarter} to deliver your QR card and crates.`,
        `እናመሰግናለን! የአዲስ ከተማ አስተባባሪ ወደ ሱቅዎ (${marketQuarter}) መጥቶ የQR ካርድና ሳጥን ያስረክብዎታል።`
      )
    );
  };

  const acceptedItems = [
    { name: 'Cabbage, kale (gomen) & leafy greens', nameAm: 'የጎመን ቅጠል፣ ሰላጣና ጥቅል ጎመን' },
    { name: 'Bruised tomatoes, onions, carrots, beets', nameAm: 'የተበላሹ ቲማቲም፣ ሽንኩርትና ካሮት' },
    { name: 'Banana skins & bunches (ሙዝ)', nameAm: 'የሙዝ ልጣጭና ግንድ' },
    { name: 'Citrus rinds, oranges, lemons & papaya', nameAm: 'የብርቱካን፣ ሎሚና ፓፓያ ልጣጭ' },
    { name: 'Potato peelings & root vegetable trimmings', nameAm: 'የድንች ልጣጭና ስረ-ስሮች' },
    { name: 'Grain husks, teff chaff & straw', nameAm: 'የእህል ጭድ፣ የጤፍ ገለባና ብጣሽ' }
  ];

  const prohibitedItems = [
    { name: 'Plastic carrier bags (festal / ፌስታል) - STRICTLY BANNED', nameAm: 'ፌስታልና ማንኛውም ፕላስቲክ ከረጢት (በጥብቅ የተከለከለ)' },
    { name: 'Plastic bottles, caps & food wrappers', nameAm: 'የፕላስቲክ ሃይላንድ ጠርሙሶችና ማሸጊያዎች' },
    { name: 'Nylon ropes, twine, wires & tape', nameAm: 'የናይለን ገመዶች፣ ሽቦዎችና ፕላስተሮች' },
    { name: 'Metal cans, nails & crown corks', nameAm: 'ቆርቆሮዎች፣ ሚስማሮችና ብረታ ብረት' },
    { name: 'Glass fragments & broken bottles', nameAm: 'የጠርሙስ ስብርባሪዎችና መስታወት' },
    { name: 'Meat, bones & butchery scraps', nameAm: 'ስጋ፣ አጥንትና የእንስሳት ተረፈ-ምርት' }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>FOR MERKATO TRADERS</span>
            <span>•</span>
            <span>ለመውጫ ነጋዴዎች</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Simple, Zero-Cost Organic Separation for Stall Vendors',
              'ቀላልና ነፃ የቆሻሻ አሰባሰብ ለመርካቶ አትክልትና ፍራፍሬ ነጋዴዎች'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'Keep your stall clean, avoid municipal dumping fines, and contribute to national soil restoration. Best of all: you do not need a smartphone, app, or data plan to participate.',
              'ሱቅዎን ሁልጊዜ ንጹህ ያድርጉ፤ የከተማውን የቆሻሻ ቅጣት ያስቀሩ፤ ለኢትዮጵያ አፈር ለምነትም አስተዋጽኦ ያድርጉ። ከሁሉ በላይ፡ ለመሳተፍ ስማርት ስልክ ወይም ኢንተርኔት አያስፈልግዎትም።'
            )}
          </p>
        </div>

        <EthiopicDivider amharicLabel="ቀላልና ንጹህ አሰራር" label="Clean & Simple Participation" className="my-8" />
      </section>

      {/* CORE BENEFIT HIGHLIGHT: NO SMARTPHONE REQUIRED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] p-6 sm:p-8 rounded-2xl border-2 border-[#1C462C] shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1C462C] text-[#FAF7F0] flex items-center justify-center shrink-0 shadow-sm">
              <QrCode className="w-8 h-8 text-[#DF9F28]" />
            </div>

            <div className="space-y-1.5 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#DF9F28]/20 text-[#8B5E3C] text-[11px] font-bold">
                <span>{t('Zero Technology Barrier', 'ቴክኖሎጂ ሳያስፈልግዎት')}</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C462C]">
                {t(
                  'You Do NOT Need a Smartphone, App, or Password',
                  'ምንም ዓይነት ስማርት ስልክ፣ አፕሊኬሽን ወይም የይለፍ ቃል አያስፈልግዎትም'
                )}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {t(
                  'When you register, you receive a free, waterproof laminated QR code badge fixed to your stall post. Our trained youth cooperative workers carry the scales and digital tablets. When they arrive, they scan your badge, weigh your crate, and log the intake. You just focus on selling produce.',
                  'ሲመዘገቡ በሱቅዎ ላይ የሚለጠፍ የማይበላሽ የQR ኮድ ካርድ እንሰጥዎታለን። ወጣቶቹ ሰብሳቢዎች መመዘኛና ታብሌት ይዘው ሲመጡ ካርድዎን ስካን አድርገው ይመዝናሉ። እርስዎ ስራዎን ብቻ ይሰራሉ።'
                )}
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2 p-3 bg-[#1C462C]/5 rounded-xl border border-[#1C462C]/15">
              <div className="text-[10px] font-bold text-stone-500 uppercase">Vendor Badge</div>
              <div className="w-20 h-20 bg-white p-2 rounded-lg border border-stone-300 shadow-2xs flex flex-col items-center justify-center">
                <QrCode className="w-12 h-12 text-[#1C462C]" />
                <span className="text-[8px] font-mono font-bold text-stone-600 mt-1">ATIK-ST-042</span>
              </div>
              <span className="text-[9px] font-bold text-[#1C462C]">Free Laminated Card</span>
            </div>
          </div>
        </div>
      </section>

      {/* ACCEPTED VS PROHIBITED ORGANIC WASTE GUIDELINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
            {t('Waste Sorting Standards', 'የቆሻሻ መለያየት ደንቦች')}
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C462C]">
            {t('What Goes Into the GreenMerkato Crate?', 'በሳጥኑ ውስጥ የሚገባውና የማይገባው ምንድነው?')}
          </h2>
          <p className="text-xs text-stone-600">
            {t('Clean source separation at your stall protects our compost quality and guarantees swift pickup.', 'ቆሻሻውን ለይቶ ማስቀመጥ የማዳበሪያውን ጥራት ይጠብቃል፤ ፈጣን አገልግሎትም እንዲያገኙ ያደርጋል።')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accepted Waste */}
          <div className="ethiopic-card bg-white p-6 border-2 border-emerald-600/40 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#DFD9CE]">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-emerald-950">
                  {t('ACCEPTED: 100% Compostable Organics', 'የሚፈቀዱ፡ ሙሉ በሙሉ ኦርጋኒክ የሆኑ')}
                </h3>
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                  {t('Clean biological produce trimmings only', 'ንጹህ የአትክልትና ፍራፍሬ ተረፈ-ምርት')}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mt-4 text-xs">
              {acceptedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{language === 'am' ? item.nameAm : item.name}</div>
                    <div className="text-[11px] text-stone-500">{language === 'am' ? item.name : item.nameAm}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t('Clean crates earn monthly Clean Vendor Certificates!', 'ንጹህ ቆሻሻ ያስረከበ ነጋዴ ወርሃዊ የጽዳት ምስክር ወረቀት ያገኛል!')}</span>
            </div>
          </div>

          {/* Prohibited Waste */}
          <div className="ethiopic-card bg-white p-6 border-2 border-rose-600/40 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#DFD9CE]">
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                <X className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-rose-950">
                  {t('PROHIBITED: Never Include in Crates', 'የተከለከሉ፡ በሳጥኑ ውስጥ ፈጽሞ የማይገቡ')}
                </h3>
                <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">
                  {t('Zero tolerance for plastics and hazardous items', 'ለፕላስቲክና ጎጂ ቆሻሻዎች ምንም ቦታ የለም')}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mt-4 text-xs">
              {prohibitedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✕
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{language === 'am' ? item.nameAm : item.name}</div>
                    <div className="text-[11px] text-stone-500">{language === 'am' ? item.name : item.nameAm}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
              <span>{t('Loads with plastics or glass will be rejected at the stall.', 'ፕላስቲክ ወይም ብርጭቆ ያለበት ቆሻሻ በቦታው ውድቅ ይደረጋል።')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS DURING COLLECTION RUNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-[#FAF7F0] p-6 sm:p-8 rounded-xl border border-[#DFD9CE]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DF9F28] mb-1">
            <Clock className="w-4 h-4" />
            <span>{t('Daily Routine', 'የየቀኑ የስራ ሂደት')}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C462C]">
            {t('What to Expect During the Morning Collection Run', 'በማለዳው የቆሻሻ አሰባሰብ ወቅት ምን ይከናወናል?')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4.5 rounded-xl border border-[#DFD9CE] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#1C462C]/10 text-[#1C462C] font-mono font-bold flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Preparation in Crate', 'በሳጥኑ ማዘጋጀት')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'Before 7:00 AM, place your separated vegetable or fruit trimmings into the green designated crate in front of your stall.',
                  'ከጠዋቱ 1፡00 በፊት የተለየውን ተረፈ-አትክልት በሱቅዎ በር ላይ ባለው አረንጓዴ ሳጥን ውስጥ ያዘጋጁ።'
                )}
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-[#DFD9CE] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#DF9F28]/20 text-[#8B5E3C] font-mono font-bold flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Cooperative Arrival & Scale', 'ወጣቶቹ መጥተው ይመዝናሉ')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'The cooperative worker scans your QR badge, checks the crate for contamination, and weighs it on the crane scale in 15 seconds.',
                  'ሰብሳቢው ወጣት የQR ካርድዎን ስካን ያደርጋል፤ ቆሻሻውን ፈትሾ በዲጂታል መመዘኛ በ15 ሰከንድ ውስጥ ይመዝናል።'
                )}
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-[#DFD9CE] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#B94726]/10 text-[#B94726] font-mono font-bold flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                {t('Clean Crate Returned', 'ንጹህ ሳጥን ይመለሳል')}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t(
                  'Your waste is emptied into the pushcart and your empty crate is set back in place. Your total diverted kilograms are saved in the municipal registry.',
                  'ቆሻሻው ወደ ጋሪው ተገልብጦ ሳጥኑ ወዲያውኑ ይመለስልዎታል። የተመዘነው ኪሎ ግራም በከተማው መዝገብ ይያዛል።'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VENDOR ENROLLMENT INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-white p-6 sm:p-8 rounded-2xl border border-[#DFD9CE] shadow-lg">
          <div className="text-center space-y-2 pb-6 border-b border-[#DFD9CE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
              <Store className="w-3.5 h-3.5" />
              <span>ENROLL YOUR STALL</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C462C]">
              {t('Register Your Stall for Morning Collection', 'የሱቅዎን አድራሻ አስመዝግበው የነፃ አሰባሰብ ተጠቃሚ ይሁኑ')}
            </h3>
            <p className="text-xs text-stone-600">
              {t('Fill in your stall details below. Our field coordinator will visit you within 24 hours with your laminated QR badge.', 'የሱቅዎን መረጃ ከታች ያስገቡ። አስተባባሪያችን በ24 ሰዓት ውስጥ የQR ካርድዎን ይዞ ይመጣል።')}
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1C462C]">
                {t('Registration Submitted Successfully!', 'የምዝገባ ጥያቄዎ በተሳካ ሁኔታ ደርሶናል!')}
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {t('Our Addis Ketema field team has recorded your stall. Expect a coordinator visit with your free crates and stall QR badge.', 'የአዲስ ከተማ የመስክ ቡድናችን የሱቅዎን መረጃ ይዟል። አስተባባሪያችን በአጭር ጊዜ ውስጥ ያገኝዎታል።')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 border border-[#DFD9CE] rounded-lg text-xs font-bold text-stone-700 hover:bg-[#FAF7F0]"
              >
                {t('Register Another Stall', 'ሌላ ሱቅ ያስመዝግቡ')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Trader / Owner Name *', 'የነጋዴው / የባለቤቱ ሙሉ ስም *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={traderName}
                    onChange={(e) => setTraderName(e.target.value)}
                    placeholder="e.g. Almaz Bekele / አለማዝ በቀለ"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Stall / Shed Number *', 'የሱቁ ወይም የሼዱ ቁጥር *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={stallName}
                    onChange={(e) => setStallName(e.target.value)}
                    placeholder="e.g. Shed 14, Stall B-08"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Phone Number (Optional)', 'ስልክ ቁጥር (ከተፈለገ)')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Market Quarter (ተራ) *', 'የገበያው ቀጠና (ተራ) *')}
                  </label>
                  <select
                    value={marketQuarter}
                    onChange={(e) => setMarketQuarter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="Atikilt Tera">Atikilt Tera (አትክልት ተራ)</option>
                    <option value="Bomb Tera">Bomb Tera (ቦምብ ተራ)</option>
                    <option value="Shera Tera">Shera Tera (ሽራ ተራ)</option>
                    <option value="Sebategna">Sebategna (ሰባተኛ)</option>
                    <option value="Military Tera">Military Tera (ወታደር ተራ)</option>
                    <option value="Other Merkato Area">Other Merkato Area (ሌላ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Primary Produce *', 'ዋናው የሚሸጡት ምርት *')}
                  </label>
                  <select
                    value={primaryProduce}
                    onChange={(e) => setPrimaryProduce(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="Vegetables">Vegetables / አትክልት (Cabbage, Onions)</option>
                    <option value="Fruits">Fruits / ፍራፍሬ (Bananas, Citrus)</option>
                    <option value="Grains & Chaff">Grains / እህል (Teff, Barley)</option>
                    <option value="Spices & Roots">Spices & Roots / ቅመማ ቅመም</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#DF9F28]" />
                  <span>{t('Submit Stall Registration Request', 'የሱቅ ምዝገባ ጥያቄውን ላክ')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
