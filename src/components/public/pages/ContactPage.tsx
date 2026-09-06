import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { TibebStripe, AddisAbabaSeal, EthiopicDivider } from '../../common/EthiopicElements';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  Store, 
  Tractor, 
  Building, 
  GraduationCap, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, language, showToast, setPublicSection } = useApp();

  const [category, setCategory] = useState<'vendor' | 'farmer' | 'municipal' | 'research' | 'support'>('vendor');
  const [senderName, setSenderName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      t('Inquiry Sent Successfully', 'መልዕክትዎ በተሳካ ሁኔታ ተልኳል'),
      t(
        `Thank you ${senderName || 'Friend'}! Your inquiry under "${category.toUpperCase()}" has been routed to the relevant GreenMerkato desk.`,
        `እናመሰግናለን! መልዕክትዎ ለሚመለከተው የስራ ክፍል ተመርቷል። በአጭር ጊዜ ውስጥ ምላሽ ይሰጥዎታል።`
      )
    );
  };

  const categories = [
    {
      id: 'vendor' as const,
      label: 'Vendor Stall Signup',
      labelAm: 'የነጋዴ ምዝገባ',
      icon: Store,
      desc: 'Enroll an organic vegetable or fruit stall in Merkato for free morning collection.'
    },
    {
      id: 'farmer' as const,
      label: 'Compost Purchase',
      labelAm: 'የማዳበሪያ ግዢ',
      icon: Tractor,
      desc: 'Inquire about 50kg bags or bulk truckloads of Grade A/B certified compost.'
    },
    {
      id: 'municipal' as const,
      label: 'Municipal Collaboration',
      labelAm: 'የከተማ አስተዳደር ትብብር',
      icon: Building,
      desc: 'Sub-city scaling, market sanitation policy, and municipal coordination.'
    },
    {
      id: 'research' as const,
      label: 'Media & Research',
      labelAm: 'የሚዲያና ምርምር ጥያቄ',
      icon: GraduationCap,
      desc: 'Soil trials, academic internships, press inquiries, and public datasets.'
    },
    {
      id: 'support' as const,
      label: 'Technical / Operational',
      labelAm: 'የቴክኒክና አሰራር ድጋፍ',
      icon: HelpCircle,
      desc: 'Assistance with PWA data syncing, QR badge replacements, and scale calibration.'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C462C]/10 text-[#1C462C] text-xs font-bold font-mono">
            <span>GET IN TOUCH WITH GREENMERKATO</span>
            <span>•</span>
            <span>አድራሻና ግንኙነት</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C462C] tracking-tight">
            {t(
              'Connect With Our Field Desks, Facility & Municipal Teams',
              'ከመስክ ሰራተኞች፣ ከማዕከሉና ከአስተባባሪ ቡድናችን ጋር ይገናኙ'
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {t(
              'Whether you are a market vendor seeking morning collection, a farming cooperative ordering organic compost, or an institution proposing collaboration, select your category below.',
              'የመርካቶ ነጋዴ፣ ማዳበሪያ ፈላጊ አርሶ አደር ወይም አጋር ድርጅት ከሆኑ ከዚህ በታች ያለውን ዘርፍ መርጠው ያግኙን።'
            )}
          </p>
        </div>

        <EthiopicDivider amharicLabel="ፈጣን ምላሽ ለጥያቄዎ" label="Prompt Civic Response" className="my-8" />
      </section>

      {/* PHYSICAL LOCATIONS & CONTACT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Desk 1: Merkato Market Field Desk */}
          <div className="ethiopic-card bg-white p-5 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#DFD9CE]">
              <span className="font-bold text-[#1C462C] flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#DF9F28]" />
                <span>Merkato Field Operations Desk</span>
              </span>
              <span className="text-[10px] font-mono text-stone-500">FIELD DESK</span>
            </div>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>Addis Ketema Sub-City, Atikilt Tera, Adjacent to Gate 4, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Mon – Sat: 6:30 AM – 11:30 AM (Collection Runs)</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span>+251 (0) 911 84 92 10</span>
              </div>
            </div>
          </div>

          {/* Desk 2: Repi Aerobic Composting Facility */}
          <div className="ethiopic-card bg-white p-5 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#DFD9CE]">
              <span className="font-bold text-[#7A4B29] flex items-center gap-1.5">
                <Tractor className="w-4 h-4 text-[#DF9F28]" />
                <span>Repi Conversion Facility & Yard</span>
              </span>
              <span className="text-[10px] font-mono text-stone-500">COMPOST YARD</span>
            </div>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>Kolfe Keranio Sub-City, Repi (Koshe) Conversion Perimeter, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Mon – Sat: 8:00 AM – 5:00 PM (Bulk Dispatch)</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span>+251 (0) 922 41 87 33</span>
              </div>
            </div>
          </div>

          {/* Desk 3: Cleansing Agency Coordination */}
          <div className="ethiopic-card bg-white p-5 border border-[#DFD9CE] space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#DFD9CE]">
              <span className="font-bold text-[#1C462C] flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#DF9F28]" />
                <span>Municipal Liaison & Tech Office</span>
              </span>
              <span className="text-[10px] font-mono text-stone-500">MUNICIPAL</span>
            </div>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>Cleansing Management Agency Building, Mexico Square, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span>info@greenmerkato.et / ops@greenmerkato.et</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span>+251 (0) 115 50 18 20</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY-SELECTABLE CONTACT FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ethiopic-card bg-white p-6 sm:p-8 rounded-2xl border border-[#DFD9CE] shadow-lg">
          <div className="space-y-2 pb-6 border-b border-[#DFD9CE]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DF9F28]">
              {t('Step 1: Select Inquiry Category', 'ደረጃ 1፡ የጥያቄዎን ዘርፍ ይምረጡ')}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = category === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${
                      active
                        ? 'border-[#1C462C] bg-[#1C462C]/10 text-[#1C462C] font-bold shadow-xs'
                        : 'border-[#DFD9CE] bg-[#FAF7F0] text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#1C462C]' : 'text-stone-500'}`} />
                    <div>
                      <div className="text-[11px] font-bold leading-tight">
                        {language === 'am' ? cat.labelAm : cat.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1C462C]">
                {t('Message Sent Successfully!', 'መልዕክትዎ ደርሶናል!')}
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {t('Our desk officer has received your inquiry. We will respond promptly via your provided phone number or email.', 'የክፍሉ ሰራተኛ መልዕክትዎን ተመልክቶ በሰጡት አድራሻ ያገኝዎታል።')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 border border-[#DFD9CE] rounded-lg text-xs font-bold text-stone-700 hover:bg-[#FAF7F0]"
              >
                {t('Send Another Message', 'ሌላ መልዕክት ይላኩ')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Your Name or Business *', 'የእርስዎ ወይም የንግድዎ ስም *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Almaz Bekele / Adama Farm Union"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Phone Number or Email *', 'ስልክ ቁጥር ወይም ኢሜይል *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="0911... or contact@..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Subject *', 'ርዕስ *')}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    category === 'vendor'
                      ? 'Stall signup inquiry for Atikilt Tera'
                      : category === 'farmer'
                      ? 'Price quotation for 100 bags of Grade A compost'
                      : 'General inquiry'
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Your Message / Inquiries *', 'መልዕክትዎ *')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t(
                    'Provide any details regarding stall location, crop type, quantity, or specific questions...',
                    'ስለ ሱቅዎ ቦታ፣ ሰብል ወይም የሚፈልጉትን መረጃ በዝርዝር እዚህ ይጻፉ...'
                  )}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DFD9CE] focus:border-[#1C462C] focus:outline-hidden bg-[#FAF7F0]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#DF9F28]" />
                  <span>{t('Send Inquiry to GreenMerkato Desk', 'ጥያቄውን ላክ')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
