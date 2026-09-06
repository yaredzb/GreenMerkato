import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vendor, WasteQuality, ContaminationType } from '../../types';
import { 
  QrCode, 
  Search, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  ChevronLeft, 
  RefreshCw, 
  Check, 
  Radio, 
  Store,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface CollectionWorkflowProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export const CollectionWorkflow: React.FC<CollectionWorkflowProps> = ({ onComplete, onCancel }) => {
  const { vendors, addCollection, currentUser, t, language, isSimulatedOffline } = useApp();

  // Workflow steps: 1: Vendor -> 2: Weight -> 3: Quality -> 4: Review & Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Selected State
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendorSearchQuery, setVendorSearchQuery] = useState('');
  const [isScanningQR, setIsScanningQR] = useState(false);
  
  // Weight State
  const [weightKg, setWeightKg] = useState<string>('12.5');
  const [scaleConnected, setScaleConnected] = useState(false);

  // Quality State
  const [quality, setQuality] = useState<WasteQuality>('clean');
  const [contaminationTypes, setContaminationTypes] = useState<ContaminationType[]>([]);
  const [notes, setNotes] = useState('');

  // Result state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastRecordedWeight, setLastRecordedWeight] = useState<number>(0);

  // Filter vendors by search or zone
  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(vendorSearchQuery.toLowerCase()) ||
    v.stallNumber.toLowerCase().includes(vendorSearchQuery.toLowerCase()) ||
    v.marketZone.toLowerCase().includes(vendorSearchQuery.toLowerCase())
  );

  // Quick weight adjustment buttons for gloved field workers
  const adjustWeight = (delta: number) => {
    const current = parseFloat(weightKg) || 0;
    const next = Math.max(0.5, Number((current + delta).toFixed(1)));
    setWeightKg(next.toString());
  };

  const handleSimulateDigitalScale = () => {
    setScaleConnected(true);
    // Simulate digital scale BLE reading between 8.0 and 45.0 kg
    const simulated = Number((10 + Math.random() * 25).toFixed(1));
    setWeightKg(simulated.toString());
    setTimeout(() => setScaleConnected(false), 1200);
  };

  const toggleContaminationType = (type: ContaminationType) => {
    if (contaminationTypes.includes(type)) {
      setContaminationTypes(contaminationTypes.filter(t => t !== type));
    } else {
      setContaminationTypes([...contaminationTypes, type]);
    }
  };

  const handleRecordCollection = () => {
    if (!selectedVendor) return;
    const numWeight = parseFloat(weightKg);
    if (isNaN(numWeight) || numWeight <= 0) return;

    addCollection({
      vendorId: selectedVendor.id,
      vendorName: selectedVendor.name,
      vendorAmharicName: selectedVendor.amharicName,
      stall: selectedVendor.stallNumber,
      marketZone: selectedVendor.marketZone,
      weightKg: numWeight,
      quality,
      contaminationTypes: quality !== 'clean' ? contaminationTypes : undefined,
      notes: notes.trim() || undefined,
      collectorId: currentUser.id,
      collectorName: currentUser.name,
      scaleSource: scaleConnected ? 'digital_scale_bt' : 'manual_keypad'
    });

    setLastRecordedWeight(numWeight);
    setIsSubmitted(true);
  };

  const handleNextVendor = () => {
    // Reset for next vendor
    setSelectedVendor(null);
    setVendorSearchQuery('');
    setWeightKg('12.5');
    setQuality('clean');
    setContaminationTypes([]);
    setNotes('');
    setIsSubmitted(false);
    setStep(1);
  };

  // SUCCESS SCREEN
  if (isSubmitted && selectedVendor) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-[#1A3D2F] p-6 shadow-xl text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
          {isSimulatedOffline ? t('Queued in Local Storage', 'በስልክ ላይ ተመዝግቧል (ከመስመር ውጭ)') : t('Recorded Successfully', 'በተሳካ ሁኔታ ተመዝግቧል')}
        </div>

        <div className="text-4xl font-extrabold text-[#1A3D2F] my-2 font-mono">
          {lastRecordedWeight} <span className="text-xl font-normal text-stone-600">kg</span>
        </div>

        <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#DDD8CD] my-4 text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-stone-500">{t('Vendor:', 'ነጋዴ፡')}</span>
            <span className="font-bold text-stone-900">{selectedVendor.stallNumber} - {selectedVendor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{t('Quality Check:', 'የጥራት ደረጃ፡')}</span>
            <span className={`font-bold capitalize ${
              quality === 'clean' ? 'text-emerald-700' : quality === 'minor_contamination' ? 'text-amber-700' : 'text-rose-700'
            }`}>
              {quality === 'clean' ? t('Clean (ጽዱ)', 'ጽዱ') : quality === 'minor_contamination' ? t('Minor Contamination', 'ትንሽ ብክለት') : t('Rejected', 'ውድቅ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{t('Zone:', 'ዞን፡')}</span>
            <span className="font-medium text-stone-800">{selectedVendor.marketZone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{t('Collector:', 'ሰብሳቢ፡')}</span>
            <span className="font-medium text-stone-800">{currentUser.name}</span>
          </div>
        </div>

        {/* Action Button: Next Vendor */}
        <div className="space-y-2 mt-6">
          <button
            id="next-vendor-btn"
            onClick={handleNextVendor}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1A3D2F] text-[#F8F6F0] font-bold text-base shadow-md hover:bg-[#12281F] transition flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{t('Next Vendor', 'ቀጣይ ነጋዴ')}</span>
            <ArrowRight className="w-5 h-5 text-[#D4A017]" />
          </button>

          {onComplete && (
            <button
              onClick={onComplete}
              className="w-full py-2.5 px-4 rounded-xl border border-[#DDD8CD] bg-[#F8F6F0] text-stone-700 font-semibold text-xs hover:bg-[#EFECE3]"
            >
              {t("Return to Worker Home", 'ወደ መነሻ ተመለስ')}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#DDD8CD] shadow-md overflow-hidden">
      {/* Workflow Progress Bar */}
      <div className="bg-[#1A3D2F] text-white p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-[#12281F]"
              aria-label="Back step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017]">
              {t(`Step ${step} of 4`, `ደረጃ ${step} ከ 4`)}
            </div>
            <h2 className="text-sm font-bold">
              {step === 1 && t('1. Identify Vendor', '1. ነጋዴውን ይለዩ')}
              {step === 2 && t('2. Enter Weight (kg)', '2. የቆሻሻ ሚዛን (ኪ.ግ)')}
              {step === 3 && t('3. Waste Quality Check', '3. የቆሻሻ ጥራት ምርመራ')}
              {step === 4 && t('4. Confirm & Record', '4. አረጋግጥና መዝግብ')}
            </h2>
          </div>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs text-stone-300 hover:text-white px-2 py-1 rounded bg-[#12281F]"
          >
            {t('Cancel', 'ሰርዝ')}
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5">
        {/* STEP 1: IDENTIFY VENDOR */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Primary Action: QR Scanner */}
            <div className="p-4 rounded-xl bg-[#F8F6F0] border-2 border-dashed border-[#1A3D2F]/40 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#1A3D2F] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                <QrCode className="w-6 h-6 text-[#D4A017]" />
              </div>
              <h3 className="text-sm font-bold text-[#1A3D2F]">
                {t('Scan Vendor QR Code', 'የነጋዴውን QR ኮድ ይቃኙ')}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {t('Aim camera at the physical stall badge', 'ስልክዎን በሱቁ ባጅ ላይ ያነጣጥሩ')}
              </p>

              {isScanningQR ? (
                <div className="mt-3 p-3 bg-white rounded-lg border border-amber-300">
                  <div className="animate-pulse flex items-center justify-center gap-2 text-xs font-bold text-amber-800">
                    <Radio className="w-4 h-4 animate-spin text-amber-600" />
                    <span>{t('Scanning camera active...', 'ካሜራው እየፈለገ ነው...')}</span>
                  </div>
                  {/* Simulated QR Detection options */}
                  <div className="mt-2 text-left">
                    <div className="text-[10px] text-stone-500 font-bold uppercase mb-1">
                      {t('Simulate Scan Detected Stall:', 'የተቃኘ ሱቅ ምረጥ፡')}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {vendors.slice(0, 4).map(v => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setSelectedVendor(v);
                            setIsScanningQR(false);
                            setStep(2);
                          }}
                          className="p-1.5 text-xs text-left bg-[#F8F6F0] hover:bg-emerald-50 rounded border border-[#DDD8CD] font-medium truncate"
                        >
                          <span className="font-bold text-[#1A3D2F]">{v.stallNumber}</span> {v.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  id="scan-qr-action-btn"
                  onClick={() => setIsScanningQR(true)}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F] transition flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-[#D4A017]" />
                  <span>{t('Activate Scanner', 'ካሜራ ክፈት')}</span>
                </button>
              )}
            </div>

            {/* Alternative: Search Vendor or Stall */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-600 flex items-center justify-between">
                <span>{t('Or Search Stall / Name:', 'ወይም በሱቅ ቁጥር / ስም ፈልግ፡')}</span>
                <span className="text-[10px] text-stone-400">{filteredVendors.length} {t('vendors', 'ነጋዴዎች')}</span>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={t('Search stall (e.g. AT-104) or name...', 'ሱቅ (ምሳሌ AT-104) ወይም ስም ይፈልጉ...')}
                  value={vendorSearchQuery}
                  onChange={(e) => setVendorSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#DDD8CD] bg-[#F8F6F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]"
                />
              </div>

              {/* Vendor List for quick tap */}
              <div className="max-h-52 overflow-y-auto space-y-1.5 pt-1">
                {filteredVendors.map(vendor => (
                  <button
                    key={vendor.id}
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setStep(2);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      selectedVendor?.id === vendor.id
                        ? 'border-[#1A3D2F] bg-[#1A3D2F]/5'
                        : 'border-[#DDD8CD] hover:border-[#1A3D2F] hover:bg-[#F8F6F0]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#1A3D2F] text-white font-mono text-xs font-bold">
                          {vendor.stallNumber}
                        </span>
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {language === 'am' ? vendor.amharicName : vendor.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 truncate mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#C85A32]" />
                        <span>{vendor.marketZone}</span>
                      </div>
                    </div>
                    <div className="text-right pl-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-700">
                        {vendor.totalWasteKg} kg
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ENTER WEIGHT */}
        {step === 2 && selectedVendor && (
          <div className="space-y-4">
            {/* Selected Vendor Header Pill */}
            <div className="p-2.5 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#1A3D2F]">{selectedVendor.stallNumber}</span>
                <span className="mx-1.5 text-stone-400">•</span>
                <span className="font-medium text-stone-800">{selectedVendor.name}</span>
              </div>
              <button 
                onClick={() => setStep(1)} 
                className="text-[11px] text-[#C85A32] font-semibold underline"
              >
                {t('Change', 'ቀይር')}
              </button>
            </div>

            {/* Large Weight Display & Numeric Input */}
            <div className="bg-[#F8F6F0] rounded-2xl p-4 border border-[#DDD8CD] text-center">
              <label htmlFor="weight-input" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                {t('Organic Waste Weight (kg)', 'የኦርጋኒክ ቆሻሻ ሚዛን (ኪ.ግ)')}
              </label>

              <div className="relative inline-flex items-baseline justify-center">
                <input
                  id="weight-input"
                  type="number"
                  step="0.1"
                  min="0.1"
                  inputMode="decimal"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="text-5xl font-extrabold font-mono text-[#1A3D2F] w-48 text-center bg-transparent border-b-2 border-[#1A3D2F] focus:outline-none focus:border-[#D4A017]"
                  autoFocus
                />
                <span className="text-xl font-bold text-stone-600 ml-1">kg</span>
              </div>

              {/* Quick Gloved Adjusters */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => adjustWeight(-5)}
                  className="py-2 rounded-xl bg-white border border-[#DDD8CD] text-xs font-bold text-stone-800 shadow-2xs hover:bg-[#EFECE3] active:scale-95"
                >
                  -5 kg
                </button>
                <button
                  type="button"
                  onClick={() => adjustWeight(-1)}
                  className="py-2 rounded-xl bg-white border border-[#DDD8CD] text-xs font-bold text-stone-800 shadow-2xs hover:bg-[#EFECE3] active:scale-95"
                >
                  -1 kg
                </button>
                <button
                  type="button"
                  onClick={() => adjustWeight(1)}
                  className="py-2 rounded-xl bg-white border border-[#DDD8CD] text-xs font-bold text-stone-800 shadow-2xs hover:bg-[#EFECE3] active:scale-95"
                >
                  +1 kg
                </button>
                <button
                  type="button"
                  onClick={() => adjustWeight(5)}
                  className="py-2 rounded-xl bg-white border border-[#DDD8CD] text-xs font-bold text-stone-800 shadow-2xs hover:bg-[#EFECE3] active:scale-95"
                >
                  +5 kg
                </button>
              </div>
            </div>

            {/* Secondary Integration: Read from Digital Scale */}
            <button
              type="button"
              onClick={handleSimulateDigitalScale}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                scaleConnected 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
                  : 'bg-white border-[#DDD8CD] text-stone-600 hover:bg-[#F8F6F0]'
              }`}
            >
              <Scale className={`w-4 h-4 ${scaleConnected ? 'text-emerald-600 animate-pulse' : 'text-stone-500'}`} />
              <span>
                {scaleConnected 
                  ? t('Reading from Digital Bluetooth Scale...', 'ከዲጂታል ሚዛን ንባብ እየወሰደ ነው...')
                  : t('Read from Digital Scale (Bluetooth Ready)', 'ከዲጂታል ሚዛን በቀጥታ አንብብ')}
              </span>
            </button>

            {/* Continue to Quality Check */}
            <button
              id="continue-to-quality-btn"
              onClick={() => setStep(3)}
              disabled={!weightKg || parseFloat(weightKg) <= 0}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1A3D2F] text-white font-bold text-sm shadow-md hover:bg-[#12281F] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{t('Continue to Quality Check', 'ወደ ጥራት ምርመራ ቀጥል')}</span>
              <ArrowRight className="w-4 h-4 text-[#D4A017]" />
            </button>
          </div>
        )}

        {/* STEP 3: WASTE QUALITY */}
        {step === 3 && selectedVendor && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-stone-700">
              {t('Evaluate Organic Separation Quality:', 'የኦርጋኒክ ቆሻሻውን ንጽሕና ይመዝግቡ፡')}
            </div>

            {/* 3 Large Tap Targets */}
            <div className="grid grid-cols-1 gap-2.5">
              {/* Clean */}
              <button
                type="button"
                onClick={() => {
                  setQuality('clean');
                  setContaminationTypes([]);
                }}
                className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between transition ${
                  quality === 'clean'
                    ? 'border-emerald-700 bg-emerald-50/80 shadow-xs'
                    : 'border-[#DDD8CD] bg-white hover:bg-[#F8F6F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    quality === 'clean' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900">
                      {t('Clean / 100% Organic', 'ጽዱ / ሙሉ ኦርጋኒክ')}
                    </div>
                    <div className="text-xs text-stone-500">
                      {t('No inorganic trash detected', 'ምንም አይነት ፕላስቲክ ወይም ብረት የሌለበት')}
                    </div>
                  </div>
                </div>
                {quality === 'clean' && <Check className="w-5 h-5 text-emerald-700" />}
              </button>

              {/* Minor Contamination */}
              <button
                type="button"
                onClick={() => setQuality('minor_contamination')}
                className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between transition ${
                  quality === 'minor_contamination'
                    ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                    : 'border-[#DDD8CD] bg-white hover:bg-[#F8F6F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    quality === 'minor_contamination' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900">
                      {t('Minor Contamination', 'ትንሽ ብክለት ያለበት')}
                    </div>
                    <div className="text-xs text-stone-500">
                      {t('Separated on spot, needs logging', 'በቦታው ተለይቷል፣ መመዝገብ አለበት')}
                    </div>
                  </div>
                </div>
                {quality === 'minor_contamination' && <Check className="w-5 h-5 text-amber-600" />}
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={() => setQuality('rejected')}
                className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between transition ${
                  quality === 'rejected'
                    ? 'border-rose-600 bg-rose-50/80 shadow-xs'
                    : 'border-[#DDD8CD] bg-white hover:bg-[#F8F6F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    quality === 'rejected' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-800'
                  }`}>
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900">
                      {t('Reject / Heavy Contamination', 'ውድቅ / ከባድ ብክለት')}
                    </div>
                    <div className="text-xs text-stone-500">
                      {t('Unsuitable for biological composting', 'ለማዳበሪያ ዝግጅት የማይሆን')}
                    </div>
                  </div>
                </div>
                {quality === 'rejected' && <Check className="w-5 h-5 text-rose-600" />}
              </button>
            </div>

            {/* Contamination checklist if not clean */}
            {quality !== 'clean' && (
              <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#DDD8CD] space-y-2 animate-in fade-in duration-150">
                <label className="block text-xs font-bold text-stone-700">
                  {t('Detected Contaminants (Optional Tap):', 'የተገኘው የብክለት አይነት፡')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Plastic', 'Glass', 'Metal', 'Mixed waste', 'Other'] as ContaminationType[]).map(type => {
                    const isSelected = contaminationTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleContaminationType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          isSelected
                            ? 'bg-[#C85A32] text-white border-[#C85A32]'
                            : 'bg-white text-stone-700 border-[#DDD8CD] hover:bg-stone-100'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Continue to Review */}
            <button
              id="continue-to-confirm-btn"
              onClick={() => setStep(4)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1A3D2F] text-white font-bold text-sm shadow-md hover:bg-[#12281F] transition flex items-center justify-center gap-2"
            >
              <span>{t('Review & Confirm', 'አረጋግጥና መዝግብ')}</span>
              <ArrowRight className="w-4 h-4 text-[#D4A017]" />
            </button>
          </div>
        )}

        {/* STEP 4: CONFIRM & RECORD */}
        {step === 4 && selectedVendor && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CD]">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#1A3D2F]" />
                  <span className="text-xs font-bold text-stone-500">{t('Vendor Stall', 'የነጋዴው ሱቅ')}</span>
                </div>
                <span className="font-mono text-sm font-bold text-[#1A3D2F]">{selectedVendor.stallNumber}</span>
              </div>

              <div className="text-sm font-extrabold text-stone-900">
                {language === 'am' ? selectedVendor.amharicName : selectedVendor.name}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2 rounded-lg bg-white border border-[#DDD8CD]">
                  <div className="text-[10px] text-stone-500">{t('Recorded Weight', 'የተመዘገበ ሚዛን')}</div>
                  <div className="text-lg font-bold font-mono text-[#1A3D2F]">{weightKg} kg</div>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#DDD8CD]">
                  <div className="text-[10px] text-stone-500">{t('Quality', 'የጥራት ደረጃ')}</div>
                  <div className={`text-sm font-bold capitalize ${
                    quality === 'clean' ? 'text-emerald-700' : quality === 'minor_contamination' ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {quality === 'clean' ? t('Clean', 'ጽዱ') : quality === 'minor_contamination' ? t('Minor Contam.', 'ትንሽ ብክለት') : t('Rejected', 'ውድቅ')}
                  </div>
                </div>
              </div>

              {contaminationTypes.length > 0 && (
                <div className="text-xs text-stone-600">
                  <span className="font-semibold text-stone-700">{t('Flags:', 'ብክለት፡')} </span>
                  {contaminationTypes.join(', ')}
                </div>
              )}

              <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1 border-t border-[#DDD8CD]">
                <span>{t('Collector:', 'ሰብሳቢ፡')} {currentUser.name}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Offline status reminder if offline */}
            {isSimulatedOffline && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{t('Offline Mode: Record will be stored locally and synced when online.', 'ከመስመር ውጭ፡ መረጃው ስልክዎ ላይ ተቀምጦ መስመር ሲኖር ይመሳሰላል።')}</span>
              </div>
            )}

            {/* Primary Action Button: Record Collection */}
            <button
              id="record-collection-final-btn"
              onClick={handleRecordCollection}
              className="w-full py-4 px-4 rounded-xl bg-[#1A3D2F] text-[#F8F6F0] font-extrabold text-base shadow-lg hover:bg-[#12281F] transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Check className="w-5 h-5 text-[#D4A017]" />
              <span>{t('Record Collection', 'ምዝገባውን አጽድቅ')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
