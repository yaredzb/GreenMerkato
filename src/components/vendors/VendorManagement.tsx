import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vendor } from '../../types';
import { 
  Store, 
  Search, 
  Plus, 
  MapPin, 
  QrCode, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Download, 
  Printer, 
  Phone, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const VendorManagement: React.FC = () => {
  const { vendors, addVendor, collections, t, language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  // Modals
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState<Vendor | null>(null);

  // New Vendor Form
  const [newName, setNewName] = useState('');
  const [newAmharicName, setNewAmharicName] = useState('');
  const [newStall, setNewStall] = useState('');
  const [newZone, setNewZone] = useState('Atikilt Tera (Fruit & Veg)');
  const [newWasteType, setNewWasteType] = useState('Vegetable and Fruit Trimmings');
  const [newPhone, setNewPhone] = useState('+251 9');

  const zones = [
    'all',
    'Atikilt Tera (Fruit & Veg)',
    'Bomb Tera Banana Shed',
    'Shera Tera Husks & Grain',
    'Sebategna Organic'
  ];

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.stallNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.amharicName.includes(searchQuery);
    const matchesZone = selectedZone === 'all' || v.marketZone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newStall.trim()) return;

    addVendor({
      stallNumber: newStall.trim().toUpperCase(),
      name: newName.trim(),
      amharicName: newAmharicName.trim() || newName.trim(),
      marketZone: newZone,
      primaryWasteType: newWasteType,
      contactPhone: newPhone.trim(),
      joinedDate: new Date().toISOString().split('T')[0],
      participationStatus: 'active',
      cleanSeparationRate: 98,
      totalWasteKg: 0,
      contaminationIncidentsCount: 0
    });

    setShowAddVendorModal(false);
    setNewName('');
    setNewAmharicName('');
    setNewStall('');
  };

  // Get collections for selected vendor
  const vendorCollections = selectedVendor 
    ? collections.filter(c => c.vendorId === selectedVendor.id)
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1A3D2F]">
              {t('Merkato Vendors & Stalls Directory', 'የመርካቶ ነጋዴዎችና ሱቆች ማውጫ')}
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#1A3D2F] text-white text-[10px] font-bold">
              {vendors.length} {t('Stalls', 'ሱቆች')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t(
              'Enrolled merchant source points, QR code badges, and separation clean rates across market zones.',
              'የመርካቶ ነጋዴዎች መለያ፣ የ QR ባጆች እና የቆሻሻ ንጽሕና ደረጃዎች መከታተያ።'
            )}
          </p>
        </div>

        <button
          onClick={() => setShowAddVendorModal(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F] flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-[#D4A017]" />
          <span>{t('Register New Vendor Stall', 'አዲስ ነጋዴ መዝግብ')}</span>
        </button>
      </div>

      {/* Search & Market Zone Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={t('Search stall (AT-104) or vendor name...', 'ሱቅ ወይም ስም ፈልግ...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#DDD8CD] bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]"
          />
        </div>

        {/* Zone Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {zones.map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold border transition ${
                selectedZone === zone
                  ? 'bg-[#1A3D2F] text-white border-[#1A3D2F]'
                  : 'bg-white text-stone-600 border-[#DDD8CD] hover:bg-[#F8F6F0]'
              }`}
            >
              {zone === 'all' ? t('All Zones', 'ሁሉም ዞኖች') : zone.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map(vendor => (
          <div
            key={vendor.id}
            className="p-4 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs hover:border-[#1A3D2F] transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1A3D2F] text-white">
                      {vendor.stallNumber}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      vendor.participationStatus === 'active' 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {vendor.participationStatus}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 mt-1.5">
                    {language === 'am' ? vendor.amharicName : vendor.name}
                  </h3>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C85A32]" />
                    <span>{vendor.marketZone}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowQRModal(vendor)}
                  className="p-2 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD] text-stone-700 hover:text-[#1A3D2F] hover:bg-[#EFECE3] transition"
                  title={t('View QR Badge', 'QR ባጅ')}
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>

              {/* Waste Stats */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#DDD8CD] text-xs">
                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase">{t('Total Waste', 'አጠቃላይ ቆሻሻ')}</div>
                  <div className="font-mono font-bold text-[#1A3D2F] text-sm">
                    {vendor.totalWasteKg.toLocaleString()} kg
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-stone-400 font-bold uppercase">{t('Separation Clean', 'የንጽሕና ምጣኔ')}</div>
                  <div className="font-mono font-bold text-emerald-800 text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    {vendor.cleanSeparationRate}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs border-t border-stone-100">
              <span className="text-stone-500 text-[11px] truncate">
                {vendor.primaryWasteType}
              </span>
              <button
                onClick={() => setSelectedVendor(vendor)}
                className="font-bold text-[#1A3D2F] hover:underline flex items-center gap-0.5"
              >
                <span>{t('Logs', 'ታሪክ')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VENDOR DETAIL & COLLECTION HISTORY DRAWER / MODAL */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base px-2 py-0.5 rounded bg-[#1A3D2F] text-white">
                  {selectedVendor.stallNumber}
                </span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 leading-tight">
                    {language === 'am' ? selectedVendor.amharicName : selectedVendor.name}
                  </h3>
                  <div className="text-xs text-stone-500">{selectedVendor.marketZone}</div>
                </div>
              </div>

              <button onClick={() => setSelectedVendor(null)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Profile Details */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[#F8F6F0] rounded-xl border border-[#DDD8CD]">
                <div>
                  <span className="text-[10px] text-stone-500 font-bold uppercase">{t('Contact Phone', 'ስልክ')}</span>
                  <div className="font-mono font-bold text-stone-800 mt-0.5">{selectedVendor.contactPhone}</div>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-bold uppercase">{t('Joined Program', 'የተመዘገበበት')}</span>
                  <div className="text-stone-800 font-semibold mt-0.5">{selectedVendor.joinedDate}</div>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-bold uppercase">{t('Clean Rate', 'የንጽሕና ደረጃ')}</span>
                  <div className="text-emerald-800 font-bold font-mono mt-0.5">{selectedVendor.cleanSeparationRate}%</div>
                </div>
              </div>

              {/* Collections by this vendor */}
              <div>
                <h4 className="font-bold text-stone-800 mb-2 flex items-center justify-between">
                  <span>{t('Recent Collection Records for this Stall', 'የዚህ ሱቅ የቅርብ ጊዜ የቆሻሻ መዝገቦች')}</span>
                  <span className="text-[11px] text-stone-500">{vendorCollections.length} runs</span>
                </h4>

                {vendorCollections.length === 0 ? (
                  <div className="p-4 text-center text-stone-400 bg-stone-50 rounded-xl">
                    {t('No collections recorded yet for this stall.', 'ለዚህ ሱቅ የተመዘገበ ቆሻሻ የለም።')}
                  </div>
                ) : (
                  <div className="border border-[#DDD8CD] rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-[#F8F6F0] text-stone-600 font-bold text-[10px] uppercase border-b border-[#DDD8CD]">
                        <tr>
                          <th className="py-2 px-3">{t('Date/Time', 'ቀን/ሰዓት')}</th>
                          <th className="py-2 px-3">{t('Weight', 'ክብደት')}</th>
                          <th className="py-2 px-3">{t('Quality', 'ጥራት')}</th>
                          <th className="py-2 px-3">{t('Collector', 'ሰብሳቢ')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {vendorCollections.map(c => (
                          <tr key={c.id}>
                            <td className="py-2 px-3 font-mono text-stone-600">
                              {new Date(c.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </td>
                            <td className="py-2 px-3 font-mono font-bold text-[#1A3D2F]">
                              {c.weightKg} kg
                            </td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                c.quality === 'clean' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {c.quality}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-stone-600">{c.collectorName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowQRModal(selectedVendor);
                    setSelectedVendor(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1A3D2F] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#12281F]"
                >
                  <QrCode className="w-4 h-4 text-[#D4A017]" />
                  <span>{t('View & Print Physical QR Stall Badge', 'የሱቁን QR ባጅ እይና አትም')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR BADGE DISPLAY & PRINT MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border-2 border-[#1A3D2F] text-center">
            <div className="flex justify-end">
              <button onClick={() => setShowQRModal(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Stall Badge Card */}
            <div className="border-4 border-[#1A3D2F] p-4 rounded-2xl bg-[#F8F6F0] space-y-3 shadow-inner">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#C85A32]">
                GreenMerkato • Addis Ababa Organic Waste System
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#DDD8CD] inline-block shadow-xs">
                {/* SVG Simulated QR code with Stall ID */}
                <svg viewBox="0 0 120 120" className="w-36 h-36 mx-auto">
                  <rect width="120" height="120" fill="white" />
                  {/* Outer QR Corner Anchors */}
                  <rect x="8" y="8" width="30" height="30" fill="#1A3D2F" />
                  <rect x="13" y="13" width="20" height="20" fill="white" />
                  <rect x="18" y="18" width="10" height="10" fill="#1A3D2F" />

                  <rect x="82" y="8" width="30" height="30" fill="#1A3D2F" />
                  <rect x="87" y="13" width="20" height="20" fill="white" />
                  <rect x="92" y="18" width="10" height="10" fill="#1A3D2F" />

                  <rect x="8" y="82" width="30" height="30" fill="#1A3D2F" />
                  <rect x="13" y="87" width="20" height="20" fill="white" />
                  <rect x="18" y="92" width="10" height="10" fill="#1A3D2F" />

                  {/* QR Matrix Bits */}
                  <rect x="44" y="12" width="6" height="6" fill="#1A3D2F" />
                  <rect x="56" y="12" width="6" height="6" fill="#1A3D2F" />
                  <rect x="68" y="12" width="6" height="6" fill="#1A3D2F" />

                  <rect x="44" y="24" width="6" height="6" fill="#C85A32" />
                  <rect x="60" y="24" width="6" height="6" fill="#1A3D2F" />

                  <rect x="14" y="44" width="6" height="6" fill="#1A3D2F" />
                  <rect x="28" y="44" width="6" height="6" fill="#1A3D2F" />
                  <rect x="48" y="48" width="24" height="24" fill="#1A3D2F" rx="3" />
                  
                  {/* Center Emblem */}
                  <circle cx="60" cy="60" r="7" fill="#D4A017" />

                  <rect x="80" y="48" width="6" height="6" fill="#1A3D2F" />
                  <rect x="94" y="56" width="6" height="6" fill="#1A3D2F" />
                  <rect x="44" y="82" width="6" height="6" fill="#1A3D2F" />
                  <rect x="60" y="94" width="6" height="6" fill="#C85A32" />
                  <rect x="76" y="82" width="6" height="6" fill="#1A3D2F" />
                  <rect x="94" y="94" width="6" height="6" fill="#1A3D2F" />
                </svg>
              </div>

              <div>
                <div className="font-mono text-2xl font-black text-[#1A3D2F]">
                  {showQRModal.stallNumber}
                </div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">
                  {language === 'am' ? showQRModal.amharicName : showQRModal.name}
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  {showQRModal.marketZone}
                </div>
              </div>

              <div className="text-[10px] text-stone-500 border-t border-[#DDD8CD] pt-2">
                Scan for rapid collection weighing • ግሪን መርካቶ
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold hover:bg-[#12281F] flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>{t('Print Stall Badge', 'ባጁን አትም')}</span>
              </button>
              <button
                onClick={() => setShowQRModal(null)}
                className="py-2 px-4 rounded-xl border border-[#DDD8CD] text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                {t('Close', 'ዝጋ')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REGISTER NEW VENDOR */}
      {showAddVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <h3 className="text-sm font-bold text-[#1A3D2F]">
                {t('Register New Market Vendor Stall', 'አዲስ የገበያ ነጋዴ ሱቅ መዝግብ')}
              </h3>
              <button onClick={() => setShowAddVendorModal(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Stall Number (e.g. AT-142):', 'የሱቅ ቁጥር፡')}
                  </label>
                  <input
                    type="text"
                    placeholder="AT-142"
                    value={newStall}
                    onChange={(e) => setNewStall(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#DDD8CD] font-mono font-bold uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Market Zone:', 'የገበያ ዞን፡')}
                  </label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                  >
                    <option value="Atikilt Tera (Fruit & Veg)">Atikilt Tera</option>
                    <option value="Bomb Tera Banana Shed">Bomb Tera</option>
                    <option value="Shera Tera Husks & Grain">Shera Tera</option>
                    <option value="Sebategna Organic">Sebategna</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Vendor Name (English):', 'የነጋዴው ስም (በእንግሊዝኛ)፡')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abebe Worku"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Vendor Name (Amharic):', 'የነጋዴው ስም (በአማርኛ)፡')}
                </label>
                <input
                  type="text"
                  placeholder="ምሳሌ፡ አበበ ወርቁ"
                  value={newAmharicName}
                  onChange={(e) => setNewAmharicName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Primary Organic Waste Stream:', 'የቆሻሻው አይነት፡')}
                </label>
                <input
                  type="text"
                  value={newWasteType}
                  onChange={(e) => setNewWasteType(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Contact Phone Number:', 'ስልክ ቁጥር፡')}
                </label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD] font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVendorModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#DDD8CD] font-semibold text-stone-600"
                >
                  {t('Cancel', 'ሰርዝ')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#1A3D2F] text-white font-bold hover:bg-[#12281F]"
                >
                  {t('Enroll Vendor', 'ነጋዴውን መዝግብ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
