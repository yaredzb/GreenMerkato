import React from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { AddisAbabaSeal, TibebStripe } from '../common/EthiopicElements';
import { 
  Lock, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  Store,
  Tractor
} from 'lucide-react';

interface PublicFooterProps {
  onOpenStaffLogin: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onOpenStaffLogin }) => {
  const { setPublicSection, t, language } = useApp();

  const handleNav = (id: string) => {
    setPublicSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#142318] text-[#FAF7F0] border-t border-[#1F3323] select-none">
      {/* Top Tibeb Woven Stripe */}
      <TibebStripe height={6} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1 & 2: Brand & Civic Context */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white/5 border border-white/10">
                <BrandLogo size="md" showSubtitle={false} />
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-sans max-w-md">
              {t(
                'GreenMerkato is Addis Ababa’s civic-tech circular economy initiative. We partner with Merkato market vendors, youth collection cooperatives, and the City Cleansing Management Agency to convert tons of daily organic vegetable and fruit waste into certified biological soil compost for Ethiopian smallholder farmers.',
                'ግሪን መርካቶ በአዲስ አበባ ከተማ አስተዳደርና በመርካቶ ነጋዴዎች ትብብር የሚሰራ የክብ-ኢኮኖሚ ተነሳሽነት ነው። በየቀኑ የሚወገደውን አትክልትና ፍራፍሬ ወደ ጥራት ያለው ኦርጋኒክ ማዳበሪያ በመቀየር ለገበሬዎች ያቀርባል፤ የመዲናዋን ቆሻሻም በዘላቂነት ይቀንሳል።'
              )}
            </p>

            {/* Municipal Project Seal Badge */}
            <div className="p-3 rounded-xl bg-white/5 border border-[#DF9F28]/30 flex items-center gap-3 max-w-md">
              <AddisAbabaSeal size="sm" />
              <div className="text-[11px] leading-tight">
                <div className="font-bold text-[#DF9F28]">
                  {t('City Cleansing Management Agency Pilot', 'የአዲስ አበባ ጽዳት አስተዳደር ኤጀንሲ አብራሪ ፕሮጀክት')}
                </div>
                <div className="text-stone-400 text-[10px] mt-0.5">
                  Addis Ketema Sub-City & Repi Organic Processing Facility
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Public Platform Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#DF9F28] uppercase tracking-wider flex items-center gap-1.5">
              <span>{t('Navigation', 'ዋና ማውጫ')}</span>
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white hover:underline transition">
                  {t('Home Overview', 'መነሻ ገጽ')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-white hover:underline transition">
                  {t('How It Works (10-Step Flow)', 'የስራው ሂደት (10 ደረጃዎች)')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('impact')} className="hover:text-white hover:underline transition">
                  {t('Impact & Metrics', 'የተፅዕኖ መረጃና ሪፖርት')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('vendors')} className="hover:text-white hover:underline transition">
                  {t('For Market Vendors', 'ለመውጫ ነጋዴዎች')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('farmers')} className="hover:text-white hover:underline transition">
                  {t('For Farmers & Buyers', 'ለገበሬዎችና የኅብረት ስራ')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Ecosystem */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#DF9F28] uppercase tracking-wider">
              {t('Market Zones', 'የስራ ቀጠናዎች')}
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF9F28]" />
                <span>Atikilt Tera (አትክልት ተራ)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF9F28]" />
                <span>Bomb Tera (ቦምብ ተራ)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF9F28]" />
                <span>Shera Tera (ሽራ ተራ)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF9F28]" />
                <span>Sebategna Organic (ሰባተኛ)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-400 pt-1 border-t border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#B94726]" />
                <span>Repi (Koshe) Conversion Hub</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Operational Access & Contacts */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#DF9F28] uppercase tracking-wider">
              {t('Operational Access', 'የስራ ስርዓት')}
            </h4>
            <p className="text-stone-400 text-[11px] leading-tight">
              {t(
                'Authorized field weighers, facility supervisors, and quality auditors:',
                'የተፈቀደላቸው የመስክ መዛኞች፣ የባች ተቆጣጣሪዎች እና የጥራት ኦዲተሮች፡'
              )}
            </p>

            <button
              onClick={onOpenStaffLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#DF9F28] to-[#C98A1B] text-[#142318] font-bold text-xs hover:brightness-105 transition flex items-center justify-center gap-2 shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t('Staff Login / Open PWA', 'የሰራተኞች መግቢያ')}</span>
            </button>

            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#DF9F28]" />
                <span>Addis Ketema, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#DF9F28]" />
                <span>info@greenmerkato.et</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Methodology & Metrics Declaration */}
        <div className="mt-10 pt-6 border-t border-white/10 text-[11px] text-stone-400 leading-relaxed">
          <div className="flex items-start gap-2.5 bg-black/20 p-3.5 rounded-xl border border-white/5">
            <ShieldCheck className="w-4 h-4 text-[#DF9F28] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-200">
                {t('Transparency & Verification Policy:', 'የግልጸኝነትና ማረጋገጫ ፖሊሲ፡')}
              </span>{' '}
              {t(
                'GreenMerkato clearly differentiates between verified measured waste intake from pilot scales, calculated environmental estimates (using IPCC Tier 1 solid waste biological conversion formulas), and long-term municipal scale-up targets. Projections are never represented as completed accomplishments.',
                'ግሪን መርካቶ በመስክ መመዘኛ የተረጋገጠውን ትክክለኛ የቆሻሻ መጠን፣ በአይፒሲሲ (IPCC Tier 1) ቀመር የተሰሉ የካርቦን ግምቶችን፣ እና የረጅም ጊዜ የአብራሪ ዒላማዎችን በግልጽ ለይቶ ያቀርባል።'
              )}
            </div>
          </div>
        </div>

        {/* Copyright & Language Note */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} GreenMerkato • ግሪን መርካቶ. Addis Ababa Municipal Circularity Initiative.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Amharic (አማርኛ) & English</span>
            <span>•</span>
            <span>Ethiopic Netela & Mesob Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
