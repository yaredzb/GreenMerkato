import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  UserProfile, 
  Language, 
  Vendor, 
  CollectionRecord, 
  CompostBatch, 
  CompostInventoryItem, 
  FarmerBuyer, 
  CompostSale, 
  OperationalAlert, 
  AuditLogEntry,
  ImpactMetrics,
  BatchTimelineEvent
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_VENDORS, 
  INITIAL_COLLECTIONS, 
  INITIAL_BATCHES, 
  INITIAL_INVENTORY, 
  INITIAL_BUYERS, 
  INITIAL_SALES, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockData';

interface ToastInfo {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: UserProfile;
  switchUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, am: string) => string;
  
  // Navigation & Ecosystem Modes
  viewMode: 'public' | 'app';
  setViewMode: (mode: 'public' | 'app') => void;
  publicSection: string;
  setPublicSection: (section: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Offline and PWA Sync
  isSimulatedOffline: boolean;
  toggleSimulatedOffline: () => void;
  pendingSyncQueue: CollectionRecord[];
  syncPendingRecords: () => void;
  
  // Operational Entities
  vendors: Vendor[];
  collections: CollectionRecord[];
  addCollection: (record: Omit<CollectionRecord, 'id' | 'timestamp' | 'syncStatus'>) => CollectionRecord;
  addVendor: (vendor: any) => void;
  updateVendor: (vendor: Vendor) => void;
  
  batches: CompostBatch[];
  createBatch: (batch: Omit<CompostBatch, 'id' | 'events'>) => void;
  addBatchEvent: (batchId: string, event: Omit<BatchTimelineEvent, 'id' | 'batchId' | 'timestamp' | 'operatorName'>) => void;
  completeBatch: (batchId: string, finalWeightKg: number, grade: 'Grade A (Bio-Enriched Organic)' | 'Grade B (General Agricultural)') => void;
  
  inventory: CompostInventoryItem[];
  buyers: FarmerBuyer[];
  sales: CompostSale[];
  recordSale: (sale: Omit<CompostSale, 'id' | 'receiptNumber' | 'timestamp' | 'officerId' | 'officerName'>) => boolean;
  addSale: (sale: any) => void;
  
  alerts: OperationalAlert[];
  resolveAlert: (alertId: string) => void;
  
  auditLogs: AuditLogEntry[];
  
  // Metrics
  impactMetrics: ImpactMetrics;
  
  // Toast
  toast: ToastInfo | null;
  showToast: (type: ToastInfo['type'], title: string, message: string) => void;
  dismissToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Operations Manager so the broad operational view is immediately accessible,
  // but role switcher is prominent and allows instant 1-click test of Collection Worker, Compost Operator, etc.
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gm_user_role');
    return (saved && DEMO_USERS[saved]) ? DEMO_USERS[saved] : DEMO_USERS['OPERATIONS_MANAGER'];
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('gm_language') as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Public website view mode vs authenticated operational PWA
  const [viewMode, setViewModeState] = useState<'public' | 'app'>(() => {
    const saved = localStorage.getItem('gm_view_mode');
    return (saved === 'app' || saved === 'public') ? saved : 'public';
  });
  
  const setViewMode = (mode: 'public' | 'app') => {
    setViewModeState(mode);
    localStorage.setItem('gm_view_mode', mode);
  };

  const [publicSection, setPublicSection] = useState<string>('home');
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [pendingSyncQueue, setPendingSyncQueue] = useState<CollectionRecord[]>([]);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Entities
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('gm_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [collections, setCollections] = useState<CollectionRecord[]>(() => {
    const saved = localStorage.getItem('gm_collections');
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });

  const [batches, setBatches] = useState<CompostBatch[]>(() => {
    const saved = localStorage.getItem('gm_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [inventory, setInventory] = useState<CompostInventoryItem[]>(() => {
    const saved = localStorage.getItem('gm_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [buyers] = useState<FarmerBuyer[]>(() => {
    const saved = localStorage.getItem('gm_buyers');
    return saved ? JSON.parse(saved) : INITIAL_BUYERS;
  });

  const [sales, setSales] = useState<CompostSale[]>(() => {
    const saved = localStorage.getItem('gm_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [alerts, setAlerts] = useState<OperationalAlert[]>(() => {
    const saved = localStorage.getItem('gm_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('gm_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Persist essential state
  useEffect(() => {
    localStorage.setItem('gm_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('gm_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('gm_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('gm_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('gm_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('gm_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('gm_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gm_language', lang);
  };

  const t = (en: string, am: string): string => {
    return language === 'am' ? am : en;
  };

  const showToast = (type: ToastInfo['type'], title: string, message: string) => {
    const newToast: ToastInfo = {
      id: Date.now().toString(),
      type,
      title,
      message
    };
    setToast(newToast);
    setTimeout(() => {
      setToast(prev => (prev?.id === newToast.id ? null : prev));
    }, 4500);
  };

  const dismissToast = () => setToast(null);

  const switchUserRole = (role: UserRole) => {
    const newUser = DEMO_USERS[role];
    if (newUser) {
      setCurrentUser(newUser);
      localStorage.setItem('gm_user_role', role);
      // Auto-route to primary view based on role
      if (role === 'COLLECTION_WORKER') {
        setActiveTab('worker_home');
      } else if (role === 'COMPOST_OPERATOR') {
        setActiveTab('composting');
      } else if (role === 'SALES_OFFICER') {
        setActiveTab('inventory');
      } else {
        setActiveTab('overview');
      }
      showToast(
        'info', 
        t(`Role Switched: ${newUser.name}`, `ሚና ተቀይሯል፡ ${newUser.amharicName}`), 
        t(`Permissions active for ${role.replace('_', ' ')}`, `የ${newUser.amharicName} ፈቃዶች ተፈጻሚ ሆነዋል`)
      );
    }
  };

  const toggleSimulatedOffline = () => {
    const nextState = !isSimulatedOffline;
    setIsSimulatedOffline(nextState);
    if (nextState) {
      showToast('warning', t('Field Mode: Offline', 'የሜዳ ሁነታ፡ ከመስመር ውጭ'), t('App will queue collections in local storage', 'መረጃዎች በጊዜያዊ ማከማቻ ይቀመጣሉ'));
    } else {
      showToast('success', t('Connection Restored', 'ግንኙነት ተመልሷል'), t('Syncing pending field records with server...', 'መረጃዎች ከዋናው ሰርቨር ጋር እየተመሳሰሉ ነው...'));
      syncPendingRecords();
    }
  };

  const syncPendingRecords = () => {
    if (pendingSyncQueue.length === 0) return;
    
    const count = pendingSyncQueue.length;
    // Mark pending records as synced in main collection list
    setCollections(prev => 
      prev.map(c => pendingSyncQueue.some(p => p.id === c.id) ? { ...c, syncStatus: 'synced' } : c)
    );
    setPendingSyncQueue([]);
    
    showToast(
      'success',
      t('Sync Complete', 'ማመሳሰል ተጠናቋል'),
      t(`${count} queued record${count > 1 ? 's' : ''} successfully synced to central database.`, `${count} መዝገቦች ወደ ዋናው የመረጃ ቋት ገብተዋል።`)
    );
  };

  const addCollection = (recordData: Omit<CollectionRecord, 'id' | 'timestamp' | 'syncStatus'>): CollectionRecord => {
    const id = `COL-${Date.now().toString().slice(-8)}`;
    const timestamp = new Date().toISOString();
    const isOffline = isSimulatedOffline;
    
    const newRecord: CollectionRecord = {
      ...recordData,
      id,
      timestamp,
      syncStatus: isOffline ? 'pending' : 'synced'
    };

    setCollections(prev => [newRecord, ...prev]);

    if (isOffline) {
      setPendingSyncQueue(prev => [...prev, newRecord]);
    }

    // Update vendor aggregate metrics
    setVendors(prev => prev.map(v => {
      if (v.id === recordData.vendorId) {
        const newTotal = Number((v.totalWasteKg + recordData.weightKg).toFixed(1));
        const newCollections = v.collectionsCount + 1;
        const newContamination = recordData.quality !== 'clean' ? v.contaminationCount + 1 : v.contaminationCount;
        const rate = Number(((newContamination / newCollections) * 100).toFixed(1));
        let tier: Vendor['rewardTier'] = v.rewardTier;
        if (rate <= 3.0 && newTotal > 2000) tier = 'Green Champion';
        else if (rate > 8.0) tier = 'Needs Training';
        else tier = 'Standard Partner';

        return {
          ...v,
          totalWasteKg: newTotal,
          collectionsCount: newCollections,
          contaminationCount: newContamination,
          contaminationRatePct: rate,
          rewardTier: tier
        };
      }
      return v;
    }));

    // Add Audit Log
    const auditEntry: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'RECORD_COLLECTION',
      actionAm: 'ቆሻሻ ምዝገባ ተከናወነ',
      entityType: 'Collection',
      entityId: id,
      timestamp,
      previousValue: 'None',
      newValue: `${recordData.weightKg} kg (${recordData.quality}) - Stall ${recordData.stall}`,
      details: `Collected by ${currentUser.name}. ${isOffline ? '[Offline Queue]' : '[Direct Online Sync]'}`
    };
    setAuditLogs(prev => [auditEntry, ...prev]);

    return newRecord;
  };

  const addVendor = (newVendorData: any) => {
    const id = `VND-${Date.now().toString().slice(-4)}`;
    const newVendor: Vendor = {
      id,
      stallNumber: newVendorData.stallNumber,
      name: newVendorData.name,
      amharicName: newVendorData.amharicName || newVendorData.name,
      marketZone: newVendorData.marketZone || 'Atikilt Tera (Fruit & Veg)',
      primaryProduce: newVendorData.primaryProduce || newVendorData.primaryWasteType || 'Organic Produce',
      participationStatus: newVendorData.participationStatus || 'active',
      totalWasteKg: newVendorData.totalWasteKg || 0,
      collectionsCount: newVendorData.collectionsCount || 0,
      contaminationCount: newVendorData.contaminationIncidentsCount || 0,
      contaminationRatePct: 0,
      rewardTier: 'Standard Partner',
      joinedDate: newVendorData.joinedDate || new Date().toISOString().split('T')[0],
      contactPhone: newVendorData.contactPhone || '+251 91 100 0000',
      qrCode: `GM-QR-${newVendorData.stallNumber}`
    };
    setVendors(prev => [newVendor, ...prev]);
    showToast('success', t('Vendor Enrolled', 'አዲስ ነጋዴ ተመዝግቧል'), `${newVendor.name} (${newVendor.stallNumber})`);
  };

  const updateVendor = (updatedVendor: Vendor) => {
    setVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v));
    showToast('success', t('Vendor Updated', 'የነጋዴ መረጃ ተስተካክሏል'), `${updatedVendor.name} (${updatedVendor.stallNumber})`);
  };

  const createBatch = (batchData: Omit<CompostBatch, 'id' | 'events'>) => {
    const id = `BAT-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();
    
    const initialEvent: BatchTimelineEvent = {
      id: `EV-${Date.now()}`,
      batchId: id,
      timestamp,
      eventType: 'created',
      operatorName: currentUser.name,
      title: `Batch created with ${batchData.inputWeightKg} kg waste`,
      titleAm: `ባች በ${batchData.inputWeightKg} ኪሎ ቆሻሻ ተመሰረተ`,
      notes: `Batch initiated by ${currentUser.name}`
    };

    const newBatch: CompostBatch = {
      ...batchData,
      id,
      events: [initialEvent]
    };

    setBatches(prev => [newBatch, ...prev]);

    // Audit log
    setAuditLogs(prev => [{
      id: `AUD-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'CREATE_COMPOST_BATCH',
      actionAm: 'የማዳበሪያ ባች ተመዘገበ',
      entityType: 'CompostBatch',
      entityId: id,
      timestamp,
      previousValue: 'None',
      newValue: `Batch ${batchData.batchNumber} (${batchData.inputWeightKg} kg input)`,
      details: `Operator: ${currentUser.name}`
    }, ...prev]);

    showToast('success', t('Compost Batch Initialized', 'አዲስ ባች ተመዝግቧል'), `Batch ${batchData.batchNumber}`);
  };

  const addBatchEvent = (
    batchId: string, 
    eventData: Omit<BatchTimelineEvent, 'id' | 'batchId' | 'timestamp' | 'operatorName'>
  ) => {
    const eventId = `EV-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const fullEvent: BatchTimelineEvent = {
      ...eventData,
      id: eventId,
      batchId,
      timestamp,
      operatorName: currentUser.name
    };

    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        const updatedTemp = eventData.temperatureC !== undefined ? eventData.temperatureC : b.currentTempC;
        const updatedMoisture = eventData.moisturePct !== undefined ? eventData.moisturePct : b.currentMoisturePct;
        const updatedTurns = eventData.eventType === 'turned' ? b.turnsCount + 1 : b.turnsCount;

        // Auto-advance stage if condition warrants
        let nextStage = b.currentStage;
        if (updatedTemp >= 55 && nextStage === 'batch_created') nextStage = 'active_composting';
        if (updatedTurns >= 4 && updatedTemp < 45 && nextStage === 'active_composting') nextStage = 'maturation';

        return {
          ...b,
          currentTempC: updatedTemp,
          currentMoisturePct: updatedMoisture,
          turnsCount: updatedTurns,
          currentStage: nextStage,
          events: [fullEvent, ...b.events]
        };
      }
      return b;
    }));

    showToast('success', t('Batch Event Logged', 'የባች ክትትል ተመዝግቧል'), eventData.title);
  };

  const completeBatch = (
    batchId: string, 
    finalWeightKg: number, 
    grade: 'Grade A (Bio-Enriched Organic)' | 'Grade B (General Agricultural)'
  ) => {
    const timestamp = new Date().toISOString();
    const batch = batches.find(b => b.id === batchId);
    if (!batch) return;

    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          currentStage: 'finished_compost',
          status: 'completed',
          finalWeightKg,
          completedDate: timestamp.split('T')[0],
          qualityGrade: grade,
          events: [{
            id: `EV-${Date.now()}`,
            batchId,
            timestamp,
            eventType: 'completed',
            operatorName: currentUser.name,
            title: `Batch certified as ${grade}. Yield: ${finalWeightKg} kg`,
            titleAm: `ባች በ${grade} ደረጃ ተጠናቀቀ። ውጤት፡ ${finalWeightKg} ኪ.ግ`,
            notes: 'Lab screening, weed seed viability, and biological activity approved.'
          }, ...b.events]
        };
      }
      return b;
    }));

    // Add to Finished Compost Inventory
    const newInventoryItem: CompostInventoryItem = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      batchId: batch.id,
      batchNumber: batch.batchNumber,
      grade,
      totalProducedKg: finalWeightKg,
      availableKg: finalWeightKg,
      soldKg: 0,
      bagged50kgUnits: Math.floor(finalWeightKg / 50),
      pricePerKgETB: grade.includes('Grade A') ? 18.5 : 14.0,
      productionFacility: 'Repi Circular Composting Yard',
      completionDate: timestamp.split('T')[0],
      certifiedBy: 'Ministry of Agriculture Organic Standard & Addis EPA'
    };

    setInventory(prev => [newInventoryItem, ...prev]);

    // Audit log
    setAuditLogs(prev => [{
      id: `AUD-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'COMPLETE_COMPOST_BATCH',
      actionAm: 'ባች ተጠናቆ ወደ መጋዘን ገባ',
      entityType: 'Inventory',
      entityId: newInventoryItem.id,
      timestamp,
      previousValue: `Batch ${batch.batchNumber} Active Composting`,
      newValue: `${finalWeightKg} kg Finished Compost (${grade})`,
      details: `Ready for agricultural distribution @ ${newInventoryItem.pricePerKgETB} ETB/kg`
    }, ...prev]);

    showToast('success', t('Compost Certified & Added to Inventory', 'ማዳበሪያው ጸድቆ ወደ መጋዘን ገብቷል'), `${finalWeightKg} kg ${grade}`);
  };

  const recordSale = (saleData: Omit<CompostSale, 'id' | 'receiptNumber' | 'timestamp' | 'officerId' | 'officerName'>): boolean => {
    const invItem = inventory.find(i => i.id === saleData.inventoryBatchId);
    if (!invItem || invItem.availableKg < saleData.quantityKg) {
      showToast('error', t('Insufficient Inventory', 'በቂ ክምችት የለም'), t(`Only ${invItem?.availableKg || 0} kg available in this batch`, `በዚህ ባች ውስጥ ${invItem?.availableKg || 0} ኪሎ ብቻ ነው የቀረው`));
      return false;
    }

    const timestamp = new Date().toISOString();
    const id = `SL-${Date.now().toString().slice(-6)}`;
    const receiptNumber = `GM-REC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSale: CompostSale = {
      ...saleData,
      id,
      receiptNumber,
      timestamp,
      officerId: currentUser.id,
      officerName: currentUser.name
    };

    // 1. Deduct from inventory
    setInventory(prev => prev.map(item => {
      if (item.id === saleData.inventoryBatchId) {
        const newAvailable = item.availableKg - saleData.quantityKg;
        const newSold = item.soldKg + saleData.quantityKg;
        return {
          ...item,
          availableKg: newAvailable,
          soldKg: newSold,
          bagged50kgUnits: Math.floor(newAvailable / 50)
        };
      }
      return item;
    }));

    // 2. Add to sales records
    setSales(prev => [newSale, ...prev]);

    // 3. Audit log
    setAuditLogs(prev => [{
      id: `AUD-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'RECORD_SALE',
      actionAm: 'ሽያጭ ተፈጸመ',
      entityType: 'Sale',
      entityId: id,
      timestamp,
      previousValue: `Available: ${invItem.availableKg} kg`,
      newValue: `Available: ${invItem.availableKg - saleData.quantityKg} kg (Sold: ${saleData.quantityKg} kg, ETB ${saleData.totalAmountETB})`,
      details: `Sold to ${saleData.buyerName} (${saleData.buyerLocation}) by ${currentUser.name}`
    }, ...prev]);

    showToast('success', t('Sale Recorded & Receipt Generated', 'ሽያጭ ተመዝግቧል ደረሰኝ ወጥቷል'), `${saleData.quantityKg} kg -> ${saleData.buyerName} (${saleData.totalAmountETB.toLocaleString()} ETB)`);
    return true;
  };

  const addSale = (saleData: any) => {
    const firstInv = inventory[0];
    const invId = saleData.inventoryBatchId || firstInv?.id || 'INV-001';
    const totalAmount = saleData.totalPriceETB || (saleData.quantityKg * (saleData.unitPriceETB || 18.5));
    recordSale({
      inventoryBatchId: invId,
      batchNumber: saleData.batchNumber || firstInv?.batchNumber || 'GM-C102',
      buyerId: saleData.buyerId || 'BYR-001',
      buyerName: saleData.buyerName || 'Buyer',
      buyerType: saleData.buyerType || 'Farmer',
      buyerLocation: saleData.buyerLocation || 'Addis Ababa / Oromia',
      quantityKg: saleData.quantityKg || 0,
      pricePerKgETB: saleData.unitPriceETB || 18.5,
      unitPriceETB: saleData.unitPriceETB || 18.5,
      totalAmountETB: totalAmount,
      totalPriceETB: totalAmount,
      paymentMethod: saleData.paymentMethod || 'Telebirr',
      paymentStatus: saleData.paymentStatus || 'paid',
      grade: saleData.grade || 'Grade A (Bio-Enriched Organic)',
      deliveryNotes: saleData.deliveryNotes || 'ISUZU-AA-3-44129'
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    showToast('info', t('Alert Resolved', 'ማንቂያው ተፈትቷል'), t('Status marked resolved in operational log', 'ሁኔታው እንደተፈታ ተመዝግቧል'));
  };

  // Measured vs Estimated Impact calculation
  const totalWasteDivertedKg = collections.reduce((acc, c) => acc + c.weightKg, 0);
  const totalCompostProducedKg = inventory.reduce((acc, i) => acc + i.totalProducedKg, 0);
  const totalSalesETB = sales.reduce((acc, s) => acc + s.totalAmountETB, 0);
  const activeParticipatingVendors = vendors.filter(v => v.participationStatus === 'active').length;
  const farmersServedCount = buyers.length;

  // Transparent calculations clearly separated from measured data
  const impactMetrics: ImpactMetrics = {
    totalWasteDivertedKg: Number(totalWasteDivertedKg.toFixed(1)),
    totalCompostProducedKg: Number(totalCompostProducedKg.toFixed(1)),
    activeParticipatingVendors,
    totalCollectionsCompleted: collections.length,
    farmersServedCount,
    totalSalesETB,
    // Factor: 1 ton organic waste in landfill emits ~1.2 MT CO2e in methane (CH4)
    methaneAvoidedMTCO2e: Number(((totalWasteDivertedKg / 1000) * 1.18).toFixed(2)),
    // Compost replaces chemical urea/DAP at ~0.15kg active nitrogen equivalent per kg
    syntheticFertilizerOffsetKg: Math.round(totalCompostProducedKg * 0.22),
    // Soil organic carbon restored
    soilOrganicCarbonRestoredKg: Math.round(totalCompostProducedKg * 0.58),
    // Landfill volume saved: ~0.85 cubic meters per metric ton of compacted organic waste
    landfillSpaceSavedCubicM: Number(((totalWasteDivertedKg / 1000) * 0.85).toFixed(1))
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      switchUserRole,
      language,
      setLanguage,
      t,
      viewMode,
      setViewMode,
      publicSection,
      setPublicSection,
      activeTab,
      setActiveTab,
      isSimulatedOffline,
      toggleSimulatedOffline,
      pendingSyncQueue,
      syncPendingRecords,
      vendors,
      collections,
      addCollection,
      addVendor,
      updateVendor,
      batches,
      createBatch,
      addBatchEvent,
      completeBatch,
      inventory,
      buyers,
      sales,
      recordSale,
      addSale,
      alerts,
      resolveAlert,
      auditLogs,
      impactMetrics,
      toast,
      showToast,
      dismissToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
