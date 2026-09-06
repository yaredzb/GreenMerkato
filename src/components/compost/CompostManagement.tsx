import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompostBatch, BatchStage, BatchTimelineEvent } from '../../types';
import { 
  Layers, 
  Plus, 
  Thermometer, 
  Droplets, 
  RotateCw, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Scale, 
  ChevronRight, 
  ArrowRight, 
  X, 
  AlertCircle,
  FileCheck,
  Sparkles
} from 'lucide-react';

export const CompostManagement: React.FC = () => {
  const { 
    batches, 
    collections, 
    addBatchEvent, 
    completeBatch, 
    createBatch, 
    currentUser, 
    t, 
    language 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'active' | 'incoming' | 'quality' | 'completed'>('active');
  const [selectedBatch, setSelectedBatch] = useState<CompostBatch | null>(batches[0] || null);

  // Modals
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [showCertifyModal, setShowCertifyModal] = useState(false);

  // Add Record Form State
  const [eventType, setEventType] = useState<'temperature' | 'moisture' | 'turned' | 'sample_tested'>('temperature');
  const [tempInput, setTempInput] = useState('58.5');
  const [moistureInput, setMoistureInput] = useState('55');
  const [recordNotes, setRecordNotes] = useState('');

  // Create Batch Form State
  const [newBatchNumber, setNewBatchNumber] = useState(`GM-C${Math.floor(100 + Math.random() * 900)}`);
  const [newBatchWeight, setNewBatchWeight] = useState('4500');
  const [newBatchFacility, setNewBatchFacility] = useState('Repi Circular Composting Yard');

  // Certify Form State
  const [finalWeightInput, setFinalWeightInput] = useState('2250'); // standard ~50% compost yield
  const [selectedGrade, setSelectedGrade] = useState<'Grade A (Bio-Enriched Organic)' | 'Grade B (General Agricultural)'>('Grade A (Bio-Enriched Organic)');

  const lifecycleStages: { key: BatchStage; label: string; labelAm: string }[] = [
    { key: 'waste_received', label: 'Waste Received', labelAm: 'ቆሻሻ ተቀብሏል' },
    { key: 'batch_created', label: 'Batch Created', labelAm: 'ባች ተመሰረተ' },
    { key: 'active_composting', label: 'Active Composting', labelAm: 'ሙቀት ማፍላት' },
    { key: 'maturation', label: 'Maturation', labelAm: 'ማብሰል ደረጃ' },
    { key: 'quality_check', label: 'Quality Check', labelAm: 'የጥራት ፍተሻ' },
    { key: 'finished_compost', label: 'Finished Compost', labelAm: 'የተጠናቀቀ ማዳበሪያ' },
  ];

  const getStageIndex = (stage: BatchStage): number => {
    return lifecycleStages.findIndex(s => s.key === stage);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;

    let title = '';
    let titleAm = '';

    if (eventType === 'temperature') {
      title = `Core Temperature Checked: ${tempInput}°C`;
      titleAm = `የሙቀት ምርመራ፡ ${tempInput}°C`;
    } else if (eventType === 'moisture') {
      title = `Moisture Content Checked: ${moistureInput}%`;
      titleAm = `የእርጥበት መጠን ምርመራ፡ ${moistureInput}%`;
    } else if (eventType === 'turned') {
      title = `Windrow Turned & Aerated`;
      titleAm = `ባች ተገለበጠ አየር ገባበት`;
    } else {
      title = `Lab Quality Sample Extracted`;
      titleAm = `የላብራቶሪ ናሙና ተወሰደ`;
    }

    addBatchEvent(selectedBatch.id, {
      eventType,
      title,
      titleAm,
      notes: recordNotes.trim() || undefined,
      temperatureC: parseFloat(tempInput) || undefined,
      moisturePct: parseFloat(moistureInput) || undefined
    });

    // Update local selectedBatch view
    const updated = batches.find(b => b.id === selectedBatch.id);
    if (updated) setSelectedBatch(updated);

    setShowAddRecordModal(false);
    setRecordNotes('');
  };

  const handleCreateNewBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newBatchWeight);
    if (!weight || weight <= 0) return;

    createBatch({
      batchNumber: newBatchNumber,
      inputWeightKg: weight,
      sourceCollectionIds: collections.slice(0, 5).map(c => c.id),
      startDate: new Date().toISOString().split('T')[0],
      currentStage: 'batch_created',
      status: 'in_progress',
      responsibleOperator: currentUser.name,
      currentTempC: 32.0,
      currentMoisturePct: 60,
      turnsCount: 0,
      targetCompletionDate: new Date(Date.now() + 35 * 24 * 3600 * 1000).toISOString().split('T')[0]
    });

    setShowCreateBatchModal(false);
    setNewBatchNumber(`GM-C${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleCompleteBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;
    const finalWeight = parseFloat(finalWeightInput);
    if (!finalWeight || finalWeight <= 0) return;

    completeBatch(selectedBatch.id, finalWeight, selectedGrade);
    setShowCertifyModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1A3D2F]">
              {t('Compost Processing & Facility Management', 'የማዳበሪያ ዝግጅትና ማቀነባበሪያ')}
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#1A3D2F] text-white text-[10px] font-bold">
              Repi Facility
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t(
              'Windrow aeration kinetics, thermophilic cycle tracking, maturation, and certified lab analysis.',
              'የኦርጋኒክ ማዳበሪያ አዘገጃጀት፣ የሙቀት ቁጥጥር፣ ማገላበጥ እና የላብራቶሪ ጥራት ምርመራ ማዕከል።'
            )}
          </p>
        </div>

        {/* Primary Action: New Batch */}
        <button
          onClick={() => setShowCreateBatchModal(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F] flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-[#D4A017]" />
          <span>{t('Initialize Compost Batch', 'አዲስ ባች ጀምር')}</span>
        </button>
      </div>

      {/* Sub-Tabs: Active Batches, Incoming Waste, Quality Checks, Completed Batches */}
      <div className="flex items-center gap-2 border-b border-[#DDD8CD] overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('active')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'active'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t('Active Windrow Batches', 'ንቁ ባቾች')} ({batches.filter(b => b.status === 'in_progress').length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('incoming')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'incoming'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>{t('Incoming Waste from Merkato', 'የገባ ቆሻሻ')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quality')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'quality'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>{t('Quality Checks & Lab Metrics', 'የጥራት ምርመራ')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('completed')}
          className={`px-3 py-2 rounded-t-lg transition flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'completed'
              ? 'bg-white border-t-2 border-[#1A3D2F] text-[#1A3D2F] shadow-2xs'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('Completed & Certified Batches', 'የተጠናቀቁ ባቾች')}</span>
        </button>
      </div>

      {/* ACTIVE BATCHES VIEW */}
      {activeSubTab === 'active' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Batches List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex justify-between">
              <span>{t('Select Batch for Operational Logs:', 'ባች ይምረጡ፡')}</span>
              <span>{batches.length} {t('total', 'አጠቃላይ')}</span>
            </div>

            {batches.map(batch => {
              const isSelected = selectedBatch?.id === batch.id;
              const isThermophilic = batch.currentTempC >= 55;
              return (
                <div
                  key={batch.id}
                  onClick={() => setSelectedBatch(batch)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-white border-[#1A3D2F] shadow-md ring-2 ring-[#1A3D2F]/10'
                      : 'bg-[#F8F6F0] border-[#DDD8CD] hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-base text-[#1A3D2F]">
                          {batch.batchNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1A3D2F]/10 text-[#1A3D2F]">
                          {batch.currentStage.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        <span>{t('Started:', 'የተጀመረበት፡')} {batch.startDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-stone-900">
                        {batch.inputWeightKg.toLocaleString()} kg
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {batch.turnsCount}x {t('turns', 'ማገላበጥ')}
                      </div>
                    </div>
                  </div>

                  {/* Temperature & Moisture live tags */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-stone-200/60 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Thermometer className={`w-3.5 h-3.5 ${isThermophilic ? 'text-emerald-700' : 'text-amber-700'}`} />
                      <span className="font-mono font-bold text-stone-800">{batch.currentTempC}°C</span>
                      <span className="text-[10px] text-stone-400">
                        ({isThermophilic ? t('Active', 'ንቁ') : t('Cooling', 'ማቀዝቀዝ')})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-mono font-bold text-stone-800">{batch.currentMoisturePct}%</span>
                      <span className="text-[10px] text-stone-400">{t('Moisture', 'እርጥበት')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Batch Detail, Lifecycle, and Timeline (7 cols) */}
          {selectedBatch && (
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDD8CD] shadow-2xs p-5 space-y-6">
              {/* Batch Detail Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD8CD]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black font-mono text-[#1A3D2F]">
                      {selectedBatch.batchNumber}
                    </h2>
                    <span className="text-xs text-stone-500">
                      • {selectedBatch.responsibleOperator}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {t('Target Finished Date:', 'የሚጠናቀቅበት ቀን፡')} {selectedBatch.targetCompletionDate}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddRecordModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span>{t('Add Batch Record', 'የክትትል መረጃ መዝግብ')}</span>
                  </button>

                  {selectedBatch.status !== 'completed' && (
                    <button
                      onClick={() => setShowCertifyModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#C85A32] text-white text-xs font-bold shadow-xs hover:bg-[#B2533E] flex items-center gap-1"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{t('Complete & Certify', 'አጽድቅና ወደ መጋዘን አስገባ')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* LIFECYCLE STEPPER: Waste Received → Batch Created → Active Composting → Maturation → Quality Check → Finished Compost */}
              <div>
                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                  {t('Compost Lifecycle Progression:', 'የማዳበሪያ ዝግጅት ደረጃዎች፡')}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 text-center">
                  {lifecycleStages.map((stage, idx) => {
                    const currentIdx = getStageIndex(selectedBatch.currentStage);
                    const isDone = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={stage.key}
                        className={`p-2 rounded-xl text-xs font-bold border transition ${
                          isCurrent
                            ? 'bg-[#1A3D2F] text-[#F8F6F0] border-[#1A3D2F] shadow-xs'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-[#F8F6F0] text-stone-400 border-[#DDD8CD]'
                        }`}
                      >
                        <div className="text-[9px] uppercase tracking-wider opacity-80">
                          {idx + 1}. {stage.key.replace('_', ' ')}
                        </div>
                        <div className="mt-0.5 text-[11px] truncate">
                          {language === 'am' ? stage.labelAm : stage.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Kinetic Readings */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#F8F6F0] border border-[#DDD8CD]">
                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-500">{t('Input Biomass', 'የገባ ቆሻሻ')}</div>
                  <div className="text-base font-extrabold font-mono text-stone-900 mt-0.5">
                    {selectedBatch.inputWeightKg.toLocaleString()} kg
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-500">{t('Core Temperature', 'የውስጥ ሙቀት')}</div>
                  <div className="text-base font-extrabold font-mono text-emerald-800 mt-0.5 flex items-center gap-1">
                    <Thermometer className="w-4 h-4" />
                    {selectedBatch.currentTempC}°C
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-500">{t('Windrow Moisture', 'እርጥበት')}</div>
                  <div className="text-base font-extrabold font-mono text-blue-800 mt-0.5 flex items-center gap-1">
                    <Droplets className="w-4 h-4" />
                    {selectedBatch.currentMoisturePct}%
                  </div>
                </div>
              </div>

              {/* Batch Activity Timeline */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-700 pb-2 border-b border-[#DDD8CD] flex items-center justify-between">
                  <span>{t('Activity Timeline & Temperature Logs', 'የእንቅስቃሴና የሙቀት ክትትል ታሪክ')}</span>
                  <span className="text-[11px] font-normal text-stone-400">{selectedBatch.events.length} logs</span>
                </div>

                <div className="mt-3 space-y-3 relative pl-4 border-l-2 border-[#DDD8CD]">
                  {selectedBatch.events.map(event => (
                    <div key={event.id} className="relative group text-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[#1A3D2F] border-2 border-white shadow-xs" />
                      
                      <div className="flex items-baseline justify-between">
                        <div className="font-bold text-stone-900">
                          {language === 'am' ? event.titleAm : event.title}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {new Date(event.timestamp).toLocaleDateString()} {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {event.notes && (
                        <p className="text-stone-600 mt-0.5 text-[11px] leading-snug">
                          {event.notes}
                        </p>
                      )}

                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {t('Logged by:', 'የመዘገበው፡')} <span className="font-medium text-stone-700">{event.operatorName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* INCOMING WASTE SUB-TAB */}
      {activeSubTab === 'incoming' && (
        <div className="bg-white rounded-2xl border border-[#DDD8CD] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
            <div>
              <h3 className="text-sm font-bold text-[#1A3D2F]">
                {t('Incoming Separated Organic Waste from Merkato Stalls', 'ከመርካቶ ሱቆች የገቡ ኦርጋኒክ ቆሻሻዎች')}
              </h3>
              <p className="text-xs text-stone-500">
                {t('Ready to be blended with carbon bulking agent (teff straw/woodchips) for new compost piles.', 'ከጤፍ ጭድና ደረቅ እንጨት ጋር ተደባልቆ አዲስ ባች ለማዘጋጀት ዝግጁ።')}
              </p>
            </div>
            <button
              onClick={() => setShowCreateBatchModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#1A3D2F] text-white text-xs font-bold hover:bg-[#12281F]"
            >
              {t('Form Batch from Waste', 'ባች መስርት')}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F6F0] text-stone-600 font-bold uppercase text-[10px] border-b border-[#DDD8CD]">
                <tr>
                  <th className="py-2.5 px-3">{t('Receipt', 'ደረሰኝ')}</th>
                  <th className="py-2.5 px-3">{t('Vendor Stall', 'የነጋዴ ሱቅ')}</th>
                  <th className="py-2.5 px-3">{t('Zone', 'ዞን')}</th>
                  <th className="py-2.5 px-3">{t('Weight', 'ሚዛን')}</th>
                  <th className="py-2.5 px-3">{t('Quality', 'ጥራት')}</th>
                  <th className="py-2.5 px-3">{t('Timestamp', 'ቀንና ሰዓት')}</th>
                  <th className="py-2.5 px-3">{t('Collector', 'ሰብሳቢ')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {collections.map(c => (
                  <tr key={c.id} className="hover:bg-[#F8F6F0]">
                    <td className="py-2.5 px-3 font-mono text-stone-700">{c.id}</td>
                    <td className="py-2.5 px-3 font-bold text-stone-900">{c.stall} - {c.vendorName}</td>
                    <td className="py-2.5 px-3 text-stone-600">{c.marketZone}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#1A3D2F]">{c.weightKg} kg</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.quality === 'clean' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.quality}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-stone-500 font-mono">
                      {new Date(c.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="py-2.5 px-3 text-stone-600">{c.collectorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUALITY CHECKS SUB-TAB */}
      {activeSubTab === 'quality' && (
        <div className="bg-white rounded-2xl border border-[#DDD8CD] p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#1A3D2F]">
              {t('Certified Biological and Laboratory Quality Standards', 'የላብራቶሪ የጥራት መስፈርቶችና ማረጋገጫዎች')}
            </h3>
            <p className="text-xs text-stone-500">
              {t('Compliance testing before compost distribution to farmers in Oromia and urban agriculture cooperatives.', 'ወደ አርሶ አደሮች ከመሰራጨቱ በፊት የሚደረጉ ፍተሻዎች።')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Grade A (Bio-Enriched Organic)</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                C:N ratio 12:1 - 16:1, Weed seeds 0%, Heavy metals passed, pH 6.8 - 7.4. Suitable for horticulture, seedlings, and high-value teff.
              </p>
              <div className="mt-3 font-mono text-sm font-extrabold text-emerald-900">
                Market Price: 18.50 ETB / kg
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/60">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <span>Grade B (General Agricultural)</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Screened to 12mm, C:N ratio up to 20:1, pH 6.5 - 7.8. Used for broadacre field restoration, grain unions, and erosion control.
              </p>
              <div className="mt-3 font-mono text-sm font-extrabold text-blue-900">
                Market Price: 14.00 ETB / kg
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-300 bg-[#F8F6F0]">
              <div className="text-stone-800 font-bold text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>Addis EPA Protocol</span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Every batch must undergo thermophilic temperature &gt;55°C for at least 15 consecutive days with a minimum of 3 turns to ensure weed seed and pathogen eradication.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETED BATCHES SUB-TAB */}
      {activeSubTab === 'completed' && (
        <div className="bg-white rounded-2xl border border-[#DDD8CD] p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#1A3D2F]">
            {t('Finished & Certified Compost Batches', 'የተጠናቀቁና የተረጋገጡ ባቾች')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {batches.filter(b => b.status === 'completed').map(b => (
              <div key={b.id} className="p-4 rounded-xl border border-[#DDD8CD] bg-[#F8F6F0]">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-base text-[#1A3D2F]">{b.batchNumber}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {b.qualityGrade || 'Grade A'}
                  </span>
                </div>
                <div className="text-xs text-stone-600 mt-1 flex justify-between">
                  <span>Input: {b.inputWeightKg.toLocaleString()} kg</span>
                  <span className="font-bold text-[#1A3D2F]">Yield: {b.finalWeightKg?.toLocaleString()} kg finished</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-2">
                  Completed on {b.completedDate} • Certified by Repi Lab Lead
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD BATCH RECORD */}
      {showAddRecordModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <div>
                <h3 className="text-sm font-bold text-[#1A3D2F]">
                  {t('Add Batch Operational Record', 'የባች ክትትል መረጃ መዝግብ')}
                </h3>
                <span className="text-xs text-stone-500 font-mono">{selectedBatch.batchNumber}</span>
              </div>
              <button onClick={() => setShowAddRecordModal(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Record Type:', 'የምዝገባ አይነት፡')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEventType('temperature')}
                    className={`p-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 ${
                      eventType === 'temperature' ? 'bg-[#1A3D2F] text-white' : 'bg-stone-50 text-stone-700'
                    }`}
                  >
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>Temperature Check</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEventType('moisture')}
                    className={`p-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 ${
                      eventType === 'moisture' ? 'bg-[#1A3D2F] text-white' : 'bg-stone-50 text-stone-700'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Moisture Check</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEventType('turned')}
                    className={`p-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 ${
                      eventType === 'turned' ? 'bg-[#1A3D2F] text-white' : 'bg-stone-50 text-stone-700'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Windrow Turn</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEventType('sample_tested')}
                    className={`p-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 ${
                      eventType === 'sample_tested' ? 'bg-[#1A3D2F] text-white' : 'bg-stone-50 text-stone-700'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Lab Sample</span>
                  </button>
                </div>
              </div>

              {/* Dynamic metric field */}
              {eventType === 'temperature' && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Core Pile Temperature (°C):', 'የውስጥ ሙቀት (°C)፡')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono text-base font-bold text-[#1A3D2F]"
                    required
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {t('Optimum thermophilic composting range: 55°C to 65°C', 'ተመራጭ የማፍላት ሙቀት፡ ከ 55°C እስከ 65°C')}
                  </span>
                </div>
              )}

              {eventType === 'moisture' && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {t('Moisture Percentage (%):', 'የእርጥበት መጠን (%)፡')}
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="10"
                    max="80"
                    value={moistureInput}
                    onChange={(e) => setMoistureInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono text-base font-bold text-[#1A3D2F]"
                    required
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {t('Ideal sponge-squeeze target: 50% to 60%', 'ተመራጭ እርጥበት፡ ከ 50% እስከ 60%')}
                  </span>
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Observations / Operator Notes:', 'ተጨማሪ ማስታወሻ፡')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('e.g. Earthy smell, turn completed with loader, moisture added...', 'ማስታወሻ...')}
                  value={recordNotes}
                  onChange={(e) => setRecordNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD] text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecordModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#DDD8CD] font-semibold text-stone-600 hover:bg-stone-50"
                >
                  {t('Cancel', 'ሰርዝ')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#1A3D2F] text-white font-bold hover:bg-[#12281F]"
                >
                  {t('Save Record', 'መዝግብ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW BATCH */}
      {showCreateBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <h3 className="text-sm font-bold text-[#1A3D2F]">
                {t('Initialize New Compost Batch', 'አዲስ የማዳበሪያ ባች መመስረት')}
              </h3>
              <button onClick={() => setShowCreateBatchModal(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleCreateNewBatch} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Batch Number Identifier:', 'የባች መለያ ቁጥር፡')}
                </label>
                <input
                  type="text"
                  value={newBatchNumber}
                  onChange={(e) => setNewBatchNumber(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Initial Waste Input Weight (kg):', 'የተመደበ ቆሻሻ ክብደት (ኪ.ግ)፡')}
                </label>
                <input
                  type="number"
                  step="50"
                  value={newBatchWeight}
                  onChange={(e) => setNewBatchWeight(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono font-bold text-[#1A3D2F]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Facility Composting Yard:', 'የማቀነባበሪያ ስፍራ፡')}
                </label>
                <select
                  value={newBatchFacility}
                  onChange={(e) => setNewBatchFacility(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DDD8CD]"
                >
                  <option value="Repi Circular Composting Yard">Repi Circular Composting Yard (ረጲ)</option>
                  <option value="Akaki Organic Processing Hub">Akaki Organic Processing Hub (ቃሊቲ)</option>
                </select>
              </div>

              <div className="p-3 bg-[#F8F6F0] rounded-xl text-[11px] text-stone-600">
                {t('Carbon/Nitrogen Ratio Rule: Balance green market waste with 40% dry carbon materials.', 'የካርቦንና ናይትሮጅን ሚዛን፡ 60% አረንጓዴ የገበያ ቆሻሻ ከ 40% ደረቅ ጭድ ጋር መደባለቅ አለበት።')}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateBatchModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#DDD8CD] font-semibold text-stone-600"
                >
                  {t('Cancel', 'ሰርዝ')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#1A3D2F] text-white font-bold hover:bg-[#12281F]"
                >
                  {t('Establish Batch', 'ባች መስርት')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: COMPLETE & CERTIFY */}
      {showCertifyModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <div>
                <h3 className="text-sm font-bold text-[#1A3D2F]">
                  {t('Complete & Certify Compost Batch', 'ባች አጽድቅና ወደ መጋዘን አስገባ')}
                </h3>
                <span className="text-xs text-stone-500 font-mono">{selectedBatch.batchNumber}</span>
              </div>
              <button onClick={() => setShowCertifyModal(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleCompleteBatchSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Final Screened Compost Weight (kg):', 'የተጣራ ያለቀለት ማዳበሪያ ክብደት (ኪ.ግ)፡')}
                </label>
                <input
                  type="number"
                  step="10"
                  value={finalWeightInput}
                  onChange={(e) => setFinalWeightInput(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-mono text-base font-bold text-[#1A3D2F]"
                  required
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  {t(`Input was ${selectedBatch.inputWeightKg.toLocaleString()} kg (~50% mass conversion)`, `የገባው ${selectedBatch.inputWeightKg} ኪ.ግ ነበረ`)}
                </span>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Certified Quality Grade:', 'የተረጋገጠ የጥራት ደረጃ፡')}
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-semibold"
                >
                  <option value="Grade A (Bio-Enriched Organic)">Grade A (Bio-Enriched Organic) - 18.50 ETB/kg</option>
                  <option value="Grade B (General Agricultural)">Grade B (General Agricultural) - 14.00 ETB/kg</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <CheckCircle2 className="w-4 h-4 inline-block mr-1 text-emerald-700" />
                <span>{t('Once certified, this batch will automatically appear in Finished Compost Inventory for farmer sales.', 'እንደተረጋገጠ በቀጥታ ወደ ሽያጭ ክምችት ይገባል።')}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCertifyModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#DDD8CD] font-semibold text-stone-600"
                >
                  {t('Cancel', 'ሰርዝ')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#1A3D2F] text-white font-bold hover:bg-[#12281F]"
                >
                  {t('Certify & Transfer to Inventory', 'አጽድቅና አስገባ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
