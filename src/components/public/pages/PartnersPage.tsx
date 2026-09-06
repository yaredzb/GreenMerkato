import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider } from '../../common/EthiopicElements';
import { 
  Building, 
  GraduationCap, 
  Globe, 
  HeartHandshake, 
  Tractor, 
  Send, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Flame,
  FileCheck
} from 'lucide-react';

export const PartnersPage: React.FC = () => {
  const { t, language, showToast } = useApp();

  const [orgName, setOrgName] = useState('');
  const [partnerType, setPartnerType] = useState('Municipal Authority');
  const [contactPerson, setContactPerson] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [collaborationArea, setCollaborationArea] = useState('Expansion & Replication');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      t('Partnership Proposal Received', 'የአጋርነት ጥያቄው ደርሶናል'),
      t(
        `Thank you ${contactPerson || orgName}! Our partnership steering committee will review your proposal and respond within 48 hours.`,
        `እናመሰግናለን! የአጋርነት ኮሚቴው ጥያቄዎን ተመልክቶ በ48 ሰዓት ውስጥ ምላሽ ይሰጣል።`
      )
    );
  };

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>CO-CREATING CIRCULAR ADDIS ABABA</span>
            <span>•</span>
            <span>የትብብርና የአጋርነት ጥሪ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Partner With GreenMerkato to Scale Urban Bio-Circularity',
              'ከግሪን መርካቶ ጋር በመተባበር የከተማዋን ክብ-ኢኮኖሚ እናስፋፋ'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'We collaborate with municipal authorities, development partners, academic researchers, and farming unions to expand organic diversion, formalize green jobs, and verify methane reductions.',
              'የቆሻሻ ቅነሳን ለማስፋት፣ ለወጣቶች ቋሚ የስራ ዕድል ለመፍጠር እና የሚቴን ጋዝ ልቀትን ለመቀነስ ከመንግስት አካላት፣ ለጋሾች፣ የምርምር ተቋማትና ገበሬ ማኅበራት ጋር እንሰራለን።'
            )}
          </p>
        </div>

        <EthiopicDivider amharicLabel="የትብብር ዘርፎች" label="Key Partnership Pathways" className="my-8" />
      </section>

      {/* 4 PARTNERSHIP TRACKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track 1: Municipal & Sub-City Authorities */}
          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1C462C]/10 text-[#1C462C] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('1. Municipal & Sub-City Expansion', '1. የከተማ አስተዳደርና የክፍለ ከተማ ማስፋፊያ')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'We work with Cleansing Agencies across Addis Ababa to replicate the Merkato model in other high-volume vegetable centers (e.g. Shola Market in Yeka, Saris in Nifas Silk, and Jan Meda). We provide the software, training, and operational playbooks.',
                'የመርካቶን ተሞክሮ በሌሎች የከተማዋ ገበያዎች (ሾላ፣ ሳሪስ፣ ጃን ሜዳ) ለመድገም ከአስተዳደሩ ጋር በትብብር እንሰራለን። ሶፍትዌሩን፣ ስልጠናውንና የአሰራር መመሪያውን እናቀርባለን።'
              )}
            </p>
            <div className="pt-2 text-[11px] font-bold text-[#1C462C]">
              {t('• Route mapping • Youth enterprise licensing • Land access', '• የመንገድ ካርታ • የወጣቶች ማኅበር ፈቃድ • የመሬት ዝግጅት')}
            </div>
          </div>

          {/* Track 2: Climate Finance & Donors */}
          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#DF9F28]/20 text-[#8B5E3C] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('2. Climate Finance & Technology Grants', '2. የአየር ንብረት ፈንድና የቴክኖሎጂ ድጋፍ')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'Deploy capital where environmental returns are verifiable down to the kilogram. Support capital expenditure for electric collection tugs, heavy-duty mobile scales, and safety gear for frontline youth cooperatives.',
                'ለወጣቶች የሚሆን የኤሌክትሪክ ጋሪ፣ ጥራት ያላቸው ዲጂታል መመዘኛዎችና የደህንነት አልባሳት እንዲሟሉ በፈንድና በቴክኖሎጂ ድጋፍ ያድርጉ። እያንዳንዱ ኪሎ ግራም በግልጽ ይመዘገባል።'
              )}
            </p>
            <div className="pt-2 text-[11px] font-bold text-[#DF9F28]">
              {t('• Methane verification • ESG reporting • Youth livelihoods', '• የሚቴን ቁጥጥር • የESG ሪፖርት • የወጣቶች ቋሚ ገቢ')}
            </div>
          </div>

          {/* Track 3: University & Research Collaboration */}
          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#B94726]/10 text-[#B94726] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('3. Academic Research & Soil Trials', '3. የዩኒቨርሲቲና የምርምር ትብብር')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'Partner with our Repi facility to study tropical thermophilic microbiome succession, teff lodging prevention, carbon sequestration in highland vertisols, and biochar co-composting blends.',
                'ከረጲ ማዕከል ጋር በመተባበር በአፈር ምርምር፣ ረቂቅ ህዋሳት ባህሪ፣ በጤፍ ምርታማነትና ባዮቻርን ከኮምፖስት ጋር በማዋሃድ ዙሪያ ጥናትና ምርምር ያካሂዱ።'
              )}
            </p>
            <div className="pt-2 text-[11px] font-bold text-[#B94726]">
              {t('• Agronomy internships • Open field dataset access • Peer review', '• የተማሪዎች ልምምድ • ክፍት የመስክ መረጃ • የጥናት ህትመቶች')}
            </div>
          </div>

          {/* Track 4: Corporate CSR & Equipment Sponsorship */}
          <div className="ethiopic-card bg-white p-6 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#7A4B29]/10 text-[#7A4B29] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              {t('4. Equipment & Logistics Sponsorship', '4. የማቴሪያልና የሎጂስቲክስ ስፖንሰርሺፕ')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {t(
                'Businesses and private enterprises can sponsor branded organic collection crates, reflective safety vests, heavy-duty puncture-proof carts, and trommel screen parts for the youth cooperative.',
                'ድርጅቶች የንግድ ምልክታቸውን ያረፈበት የቆሻሻ መሰብሰቢያ ሳጥን፣ የአንጸባራቂ ልብስና ጠንካራ ጋሪዎችን ለወጣቶች ስፖንሰር በማድረግ ማህበራዊ ኃላፊነታቸውን መወጣት ይችላሉ።'
              )}
            </p>
            <div className="pt-2 text-[11px] font-bold text-[#7A4B29]">
              {t('• CSR recognition • Stall branding • Circular impact certificates', '• የማህበራዊ ኃላፊነት እውቅና • በሱቆች ላይ ማስተዋወቅ')}
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATION INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-white p-6 sm:p-8 rounded-2xl border border-[#DFD9CE] shadow-lg">
          <div className="text-center space-y-2 pb-6 border-b border-[#DFD9CE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>START A PARTNERSHIP</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C462C]">
              {t('Propose a Partnership or Collaboration', 'የትብብር ወይም የአጋርነት ሃሳብዎን ያጋሩን')}
            </h3>
            <p className="text-xs text-stone-600">
              {t('Share your organization’s mandate and how you envision collaborating with GreenMerkato.', 'የተቋምዎን የስራ መስክና ከግሪን መርካቶ ጋር እንዴት መስራት እንዳሰቡ ያሳውቁን።')}
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1C462C]">
                {t('Proposal Submitted Successfully!', 'የአጋርነት ጥያቄዎ ደርሶናል!')}
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {t('Our partnership and municipal relations team will review your proposal and initiate contact.', 'የአጋርነትና የውጭ ግንኙነት ቡድናችን መረጃዎን ተመልክቶ ያገኝዎታል።')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 border border-[#DFD9CE] rounded-lg text-xs font-bold text-stone-700 hover:bg-[#FAF7F0]"
              >
                {t('Submit Another Inquiry', 'ሌላ ጥያቄ ያስገቡ')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Organization Name *', 'የድርጅቱ ወይም የተቋሙ ስም *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Addis Ababa University / GIZ / Commercial Bank"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Contact Person & Title *', 'የተጠሪው ስም እና የኃላፊነት ቦታ *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Dr. Meron Alemu / Environmental Lead"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Organization Category *', 'የተቋሙ ዓይነት *')}
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="Municipal Authority">Municipal Authority / Government (የመንግስት አካል)</option>
                    <option value="Development Agency / Donor">Development Agency / Donor (ለጋሽ / ዓለም አቀፍ ተቋም)</option>
                    <option value="University / Research">University / Research Institute (ዩኒቨርሲቲ / ምርምር)</option>
                    <option value="Agricultural Union">Agricultural Cooperative Union (የገበሬ ዩኒየን)</option>
                    <option value="Corporate / Private">Private Business / Corporate CSR (የግል ኩባንያ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Email or Phone *', 'ኢሜይል ወይም ስልክ ቁጥር *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="contact@organization.et"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Area of Interest *', 'የትብብር ዘርፍ *')}
                  </label>
                  <select
                    value={collaborationArea}
                    onChange={(e) => setCollaborationArea(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  >
                    <option value="Replication in Other Markets">Market Expansion / Replication (ማስፋፊያ)</option>
                    <option value="Grant or Equipment Funding">Equipment / Capital Support (የመሳሪያ ድጋፍ)</option>
                    <option value="Soil Agronomy Research">Agronomic Research & Testing (የአፈር ምርምር)</option>
                    <option value="Bulk Compost Offtake">Bulk Compost Purchase (የማዳበሪያ ግዢ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Collaboration Brief / Message', 'የሃሳብ መግለጫ / ዝርዝር መልዕክት')}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t(
                    'Briefly describe your proposed partnership objectives and timeline...',
                    'የትብብሩን ዓላማና የሚጠበቀውን የጊዜ ሰሌዳ በአጭሩ ይግለጹ...'
                  )}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#DF9F28]" />
                  <span>{t('Send Partnership Proposal', 'የአጋርነት ጥያቄውን ላክ')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
