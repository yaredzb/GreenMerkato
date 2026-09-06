import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompostSale, CompostInventoryItem } from '../../types';
import { 
  Warehouse, 
  ShoppingBag, 
  Plus, 
  Users, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  Printer, 
  Search, 
  FileText, 
  X, 
  ArrowUpRight,
  Sparkles,
  CreditCard
} from 'lucide-react';

export const SalesAndInventory: React.FC = () => {
  const { 
    inventory, 
    sales, 
    buyers, 
    addSale, 
    currentUser, 
    t, 
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'buyers'>('sales');
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState<CompostSale | null>(null);

  // New Sale Form
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>(buyers[0]?.id || '');
  const [buyerNameInput, setBuyerNameInput] = useState('');
  const [buyerPhoneInput, setBuyerPhoneInput] = useState('+251 9');
  const [buyerTypeInput, setBuyerTypeInput] = useState<'Farmer' | 'Agricultural Cooperative' | 'Nursery / Landscaping' | 'Research / University'>('Agricultural Cooperative');
  const [quantityKgInput, setQuantityKgInput] = useState('1000');
  const [unitPriceInput, setUnitPriceInput] = useState('18.50');
  const [gradeInput, setGradeInput] = useState('Grade A (Bio-Enriched Organic)');
  const [paymentMethodInput, setPaymentMethodInput] = useState<'Telebirr' | 'CBE Birr' | 'Bank Transfer (CBE)' | 'Cash'>('Telebirr');
  const [paymentStatusInput, setPaymentStatusInput] = useState<'paid' | 'pending'>('paid');
  const [deliveryNotes, setDeliveryNotes] = useState('Dispatched from Repi Compost Yard on Isuzu Truck');

  // Calculations
  const totalStockKg = inventory.reduce((sum, i) => sum + (i.totalQuantityKg || i.totalProducedKg || 0), 0);
  const availableStockKg = inventory.reduce((sum, i) => sum + (i.availableKg || 0), 0);
  const reservedStockKg = inventory.reduce((sum, i) => sum + (i.reservedKg || 0), 0);

  const totalRevenueETB = sales.reduce((sum, s) => sum + (s.paymentStatus !== 'pending' ? (s.totalPriceETB || s.totalAmountETB || 0) : 0), 0);
  const totalKgSold = sales.reduce((sum, s) => sum + s.quantityKg, 0);

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantityKgInput);
    const price = parseFloat(unitPriceInput);
    if (!qty || !price) return;

    let buyerName = buyerNameInput;
    let buyerPhone = buyerPhoneInput;
    let buyerType = buyerTypeInput;

    const matched = buyers.find(b => b.id === selectedBuyerId);
    if (matched && !buyerNameInput.trim()) {
      buyerName = matched.name;
      buyerPhone = matched.contactPhone;
      buyerType = matched.type;
    }

    addSale({
      receiptNumber: `GM-REC-${Math.floor(10000 + Math.random() * 90000)}`,
      buyerId: selectedBuyerId,
      buyerName: buyerName || 'Oromia Teff Farmers Union',
      buyerType,
      contactPhone: buyerPhone || '+251 91 144 8899',
      grade: gradeInput,
      quantityKg: qty,
      unitPriceETB: price,
      totalPriceETB: qty * price,
      paymentMethod: paymentMethodInput,
      paymentStatus: paymentStatusInput,
      deliveryNotes: deliveryNotes.trim() || undefined,
      officerId: currentUser.id,
      officerName: currentUser.name
    });

    setShowNewSaleModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1A3D2F]">
              {t('Compost Sales, Inventory & Distribution', 'የማዳበሪያ ክምችት፣ ሽያጭና ስርጭት')}
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#D4A017] text-stone-900 text-[10px] font-bold">
              Farmer Distribution Hub
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t(
              'Finished organic compost warehouse batches, farmer cooperative sales, and Telebirr transaction tracking.',
              'የተጠናቀቀ ማዳበሪያ ክምችት፣ የገበሬዎችና ኅብረት ሽያጭ እና የቴሌብር ክፍያዎች መዝገብ።'
            )}
          </p>
        </div>

        <button
          onClick={() => setShowNewSaleModal(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F] flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-[#D4A017]" />
          <span>{t('Record Compost Sale', 'አዲስ ሽያጭ መዝግብ')}</span>
        </button>
      </div>

      {/* KPI STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex justify-between">
            <span>{t('Available Stock', 'ለሽያጭ ዝግጁ ክምችት')}</span>
            <Warehouse className="w-3.5 h-3.5 text-[#1A3D2F]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#1A3D2F] mt-1">
            {(availableStockKg / 1000).toFixed(1)} <span className="text-xs font-normal text-stone-500">MT</span>
          </div>
          <div className="text-[10px] text-stone-500 mt-1">
            {availableStockKg.toLocaleString()} kg {t('ready at Repi', 'በመጋዘን ውስጥ')}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex justify-between">
            <span>{t('Reserved Orders', 'የተያዘ ክምችት')}</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-800 mt-1">
            {(reservedStockKg / 1000).toFixed(1)} <span className="text-xs font-normal text-stone-500">MT</span>
          </div>
          <div className="text-[10px] text-stone-500 mt-1">
            {t('Pending pickup dispatch', 'በጭነት በመጠባበቅ ላይ')}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex justify-between">
            <span>{t('Total Sold', 'የተሸጠ ማዳበሪያ')}</span>
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="text-2xl font-black font-mono text-stone-900 mt-1">
            {(totalKgSold / 1000).toFixed(1)} <span className="text-xs font-normal text-stone-500">MT</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            {sales.length} {t('completed dispatches', 'የተጠናቀቁ ስርጭቶች')}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex justify-between">
            <span>{t('Total Revenue', 'አጠቃላይ ገቢ')}</span>
            <DollarSign className="w-3.5 h-3.5 text-[#D4A017]" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-[#1A3D2F] mt-1">
            {totalRevenueETB.toLocaleString()} <span className="text-xs font-normal text-stone-500">ETB</span>
          </div>
          <div className="text-[10px] text-stone-500 mt-1">
            {t('Telebirr & bank deposits', 'በቴሌብርና ባንክ የተሰበሰበ')}
          </div>
        </div>
      </div>

      {/* Sub Tabs: Sales Ledger, Finished Inventory, Farmer Buyers */}
      <div className="flex items-center gap-2 border-b border-[#DDD8CD] text-xs font-bold">
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'sales'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t('Sales & Distribution Ledger', 'የሽያጭ መዝገብ')}</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'inventory'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Warehouse className="w-3.5 h-3.5" />
          <span>{t('Warehouse Inventory by Grade', 'የመጋዘን ክምችት በየደረጃው')}</span>
        </button>

        <button
          onClick={() => setActiveTab('buyers')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'buyers'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{t('Farmers & Cooperative Directory', 'ገበሬዎችና ኅብረቶች')}</span>
        </button>
      </div>

      {/* SALES LEDGER VIEW */}
      {activeTab === 'sales' && (
        <div className="bg-white rounded-2xl border border-[#DDD8CD] p-4 sm:p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CD]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {t('Official Compost Distribution Transactions', 'የማዳበሪያ ሽያጭ ዝርዝር')}
            </h3>
            <span className="text-xs text-stone-400">{sales.length} transactions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F6F0] text-stone-600 font-bold uppercase text-[10px] tracking-wider border-b border-[#DDD8CD]">
                <tr>
                  <th className="py-2.5 px-3">{t('Receipt #', 'ደረሰኝ ቁ.')}</th>
                  <th className="py-2.5 px-3">{t('Buyer / Cooperative', 'ገዢ / ኅብረት')}</th>
                  <th className="py-2.5 px-3">{t('Grade', 'ደረጃ')}</th>
                  <th className="py-2.5 px-3">{t('Quantity', 'መጠን')}</th>
                  <th className="py-2.5 px-3">{t('Total (ETB)', 'ጠቅላላ ዋጋ (ብር)')}</th>
                  <th className="py-2.5 px-3">{t('Payment Method', 'የክፍያ ዘዴ')}</th>
                  <th className="py-2.5 px-3">{t('Status', 'ሁኔታ')}</th>
                  <th className="py-2.5 px-3 text-right">{t('Receipt', 'ደረሰኝ')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {sales.map(s => (
                  <tr key={s.id} className="hover:bg-[#F8F6F0]/70 transition">
                    <td className="py-3 px-3 font-mono font-bold text-stone-800">{s.receiptNumber}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">{s.buyerName}</div>
                      <div className="text-[10px] text-stone-400">{s.buyerType}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1A3D2F]/10 text-[#1A3D2F]">
                        {s.grade.split(' ')[0]} {s.grade.split(' ')[1]}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-stone-800">
                      {s.quantityKg.toLocaleString()} kg
                    </td>
                    <td className="py-3 px-3 font-mono font-extrabold text-[#1A3D2F]">
                      {(s.totalPriceETB || s.totalAmountETB || 0).toLocaleString()} ETB
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-stone-700 flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-emerald-700" />
                        {s.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {s.paymentStatus === 'paid' ? t('Paid (የተከፈለ)', 'የተከፈለ') : t('Pending', 'በመጠባበቅ ላይ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setShowReceiptModal(s)}
                        className="p-1.5 rounded-lg border border-[#DDD8CD] bg-[#F8F6F0] hover:bg-[#1A3D2F] hover:text-white transition shadow-2xs"
                        title={t('View and Print Receipt', 'ደረሰኝ አትም')}
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WAREHOUSE INVENTORY VIEW */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventory.map(item => (
            <div key={item.id} className="p-5 rounded-2xl bg-white border border-[#DDD8CD] shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1A3D2F] text-white">
                      {item.batchNumber}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.grade}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-2">
                    {item.location}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="font-mono text-sm font-bold text-[#1A3D2F]">
                    {item.pricePerKgETB} ETB / kg
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Packed: {item.packagingType}
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[#F8F6F0] rounded-xl text-center text-xs">
                <div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase">{t('Total Produced', 'የተመረተ')}</div>
                  <div className="font-mono font-bold text-stone-800 mt-0.5">{(item.totalQuantityKg || item.totalProducedKg || 0).toLocaleString()} kg</div>
                </div>

                <div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase">{t('Available Stock', 'ዝግጁ')}</div>
                  <div className="font-mono font-extrabold text-[#1A3D2F] mt-0.5">{item.availableKg.toLocaleString()} kg</div>
                </div>

                <div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase">{t('Reserved', 'የተያዘ')}</div>
                  <div className="font-mono font-bold text-amber-800 mt-0.5">{(item.reservedKg || 0).toLocaleString()} kg</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-stone-500">
                <span>{t('Certified by Repi Lab Lead', 'በላብራቶሪ የተረጋገጠ')}</span>
                <button
                  onClick={() => {
                    setGradeInput(item.grade);
                    setUnitPriceInput(item.pricePerKgETB.toString());
                    setShowNewSaleModal(true);
                  }}
                  className="font-bold text-[#1A3D2F] hover:underline"
                >
                  {t('Sell from this batch', 'ከዚህ ባች ሽጥ')} →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FARMERS & BUYERS VIEW */}
      {activeTab === 'buyers' && (
        <div className="bg-white rounded-2xl border border-[#DDD8CD] p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CD]">
            <h3 className="text-sm font-bold text-[#1A3D2F]">
              {t('Registered Agricultural Buyers & Cooperatives', 'የተመዘገቡ አርሶ አደሮችና ኅብረቶች')}
            </h3>
            <span className="text-xs text-stone-400">{buyers.length} registered</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {buyers.map(b => (
              <div key={b.id} className="p-4 rounded-xl border border-[#DDD8CD] bg-[#F8F6F0] space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{b.name}</h4>
                    <div className="text-[11px] text-stone-500">{b.type} • {b.region}</div>
                  </div>
                  <span className="font-mono font-bold text-[#1A3D2F] bg-white px-2 py-0.5 rounded border border-[#DDD8CD]">
                    {b.totalPurchasedKg.toLocaleString()} kg total
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-600 pt-1 border-t border-stone-200">
                  <span>Phone: <span className="font-mono font-semibold">{b.contactPhone}</span></span>
                  <span>Last: {b.lastPurchaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: NEW SALE */}
      {showNewSaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <h3 className="text-sm font-bold text-[#1A3D2F]">
                {t('Record Compost Sale & Distribution', 'የማዳበሪያ ሽያጭና ስርጭት መዝግብ')}
              </h3>
              <button onClick={() => setShowNewSaleModal(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Select Enrolled Buyer:', 'ገዢ ምረጥ፡')}
                </label>
                <select
                  value={selectedBuyerId}
                  onChange={(e) => setSelectedBuyerId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-medium"
                >
                  {buyers.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.region}) - {b.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Quantity (kg):', 'መጠን (ኪ.ግ)፡')}
                  </label>
                  <input
                    type="number"
                    step="50"
                    value={quantityKgInput}
                    onChange={(e) => setQuantityKgInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono font-bold text-base text-[#1A3D2F]"
                    required
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    = {(parseFloat(quantityKgInput) / 50 || 0)} bags (50kg bags)
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Unit Price (ETB / kg):', 'የአንዱ ዋጋ (ብር/ኪ.ግ)፡')}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={unitPriceInput}
                    onChange={(e) => setUnitPriceInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono font-bold text-base"
                    required
                  />
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="p-3 rounded-xl bg-stone-100 flex items-center justify-between">
                <span className="font-bold text-stone-700">{t('Total Payable Amount:', 'ጠቅላላ የሚከፈል፡')}</span>
                <span className="font-mono text-lg font-black text-[#1A3D2F]">
                  {((parseFloat(quantityKgInput) || 0) * (parseFloat(unitPriceInput) || 0)).toLocaleString()} ETB
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Payment Method:', 'የክፍያ መንገድ፡')}
                  </label>
                  <select
                    value={paymentMethodInput}
                    onChange={(e) => setPaymentMethodInput(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                  >
                    <option value="Telebirr">Telebirr (ቴሌብር)</option>
                    <option value="CBE Birr">CBE Birr (ሲቢኢ ብር)</option>
                    <option value="Bank Transfer (CBE)">Commercial Bank of Ethiopia</option>
                    <option value="Cash">Cash at Yard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Payment Status:', 'የክፍያ ሁኔታ፡')}
                  </label>
                  <select
                    value={paymentStatusInput}
                    onChange={(e) => setPaymentStatusInput(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                  >
                    <option value="paid">Paid & Confirmed</option>
                    <option value="pending">Pending Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Dispatch & Vehicle Notes:', 'የመኪና እና የጭነት መረጃ፡')}
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewSaleModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#DDD8CD] font-semibold text-stone-600"
                >
                  {t('Cancel', 'ሰርዝ')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#1A3D2F] text-white font-bold hover:bg-[#12281F]"
                >
                  {t('Confirm Sale & Issue Receipt', 'አረጋግጥና ደረሰኝ ቁረጥ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: OFFICIAL RECEIPT PREVIEW */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#DDD8CD]">
            <div className="flex justify-end">
              <button onClick={() => setShowReceiptModal(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Ethiopian GreenMerkato Receipt */}
            <div className="border-2 border-dashed border-stone-300 p-5 rounded-xl space-y-3 font-mono text-xs">
              <div className="text-center border-b border-stone-200 pb-3">
                <div className="font-extrabold text-sm text-[#1A3D2F]">
                  GREENMERKATO COMPOST ENTERPRISE
                </div>
                <div className="text-[10px] text-stone-500">
                  Repi Composting Facility, Addis Ababa, Ethiopia
                </div>
                <div className="text-[10px] font-bold text-[#C85A32] mt-0.5">
                  OFFICIAL DISTRIBUTION RECEIPT
                </div>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Receipt No:</span>
                <span className="font-bold">{showReceiptModal.receiptNumber}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Date:</span>
                <span>{new Date(showReceiptModal.timestamp).toLocaleDateString()} {new Date(showReceiptModal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Buyer:</span>
                <span className="font-bold text-stone-900">{showReceiptModal.buyerName}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Product:</span>
                <span>{showReceiptModal.grade}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Quantity:</span>
                <span className="font-bold">{showReceiptModal.quantityKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-500">Unit Rate:</span>
                <span>{showReceiptModal.unitPriceETB} ETB / kg</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-[#1A3D2F] border-t border-b border-stone-200 py-2">
                <span>TOTAL PAID:</span>
                <span>{(showReceiptModal.totalPriceETB || showReceiptModal.totalAmountETB || 0).toLocaleString()} ETB</span>
              </div>

              <div className="text-[10px] text-stone-500 space-y-1">
                <div>Payment Method: {showReceiptModal.paymentMethod}</div>
                <div>Status: {(showReceiptModal.paymentStatus || 'PAID').toUpperCase()}</div>
                <div>Officer: {showReceiptModal.officerName}</div>
              </div>

              <div className="text-center text-[10px] text-stone-400 border-t border-stone-200 pt-2">
                Thank you for building Addis Ababa's Circular Organic Economy!
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold hover:bg-[#12281F] flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t('Print Receipt', 'ደረሰኝ አትም')}</span>
              </button>
              <button
                onClick={() => setShowReceiptModal(null)}
                className="py-2 px-4 rounded-xl border border-[#DDD8CD] text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                {t('Close', 'ዝጋ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
