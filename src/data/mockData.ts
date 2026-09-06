import { 
  UserProfile, 
  Vendor, 
  CollectionRecord, 
  CompostBatch, 
  CompostInventoryItem, 
  FarmerBuyer, 
  CompostSale, 
  OperationalAlert, 
  AuditLogEntry 
} from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  COLLECTION_WORKER: {
    id: 'USR-CW-01',
    name: 'Dawit Mekonnen',
    amharicName: 'ዳዊት መኮንን',
    role: 'COLLECTION_WORKER',
    phone: '+251 91 124 5589',
    assignedZone: 'Atikilt Tera (Fruit & Veg)',
    avatarInitials: 'DM'
  },
  COMPOST_OPERATOR: {
    id: 'USR-CO-02',
    name: 'Almaz Tadesse',
    amharicName: 'አልማዝ ታደሰ',
    role: 'COMPOST_OPERATOR',
    phone: '+251 92 341 9022',
    assignedZone: 'Repi Composting Facility',
    avatarInitials: 'AT'
  },
  SALES_OFFICER: {
    id: 'USR-SO-03',
    name: 'Bekele Haile',
    amharicName: 'በቀለ ኃይሌ',
    role: 'SALES_OFFICER',
    phone: '+251 91 388 4712',
    assignedZone: 'Akaki Distribution Hub',
    avatarInitials: 'BH'
  },
  OPERATIONS_MANAGER: {
    id: 'USR-OM-04',
    name: 'Selamawit Tesfaye',
    amharicName: 'ሰላማዊት ተስፋዬ',
    role: 'OPERATIONS_MANAGER',
    phone: '+251 91 176 3490',
    assignedZone: 'Merkato Operational Command',
    avatarInitials: 'ST'
  },
  ADMINISTRATOR: {
    id: 'USR-AD-05',
    name: 'Girma Wolde',
    amharicName: 'ግርማ ወልዴ',
    role: 'ADMINISTRATOR',
    phone: '+251 94 412 8831',
    assignedZone: 'Central Addis Authority',
    avatarInitials: 'GW'
  }
};

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'VND-AT-01',
    stallNumber: 'AT-104',
    name: 'Fatuma Kedir Veg & Enset Store',
    amharicName: 'ፋጡማ ከድር አትክልትና እንሰት',
    marketZone: 'Atikilt Tera (Fruit & Veg)',
    primaryProduce: 'Cabbage, Enset leaves, Tomato skins, Potato trimmings',
    participationStatus: 'active',
    totalWasteKg: 3420,
    collectionsCount: 142,
    contaminationCount: 2,
    contaminationRatePct: 1.4,
    rewardTier: 'Green Champion',
    joinedDate: '2025-11-10',
    contactPhone: '+251 91 100 2234',
    qrCode: 'GM-VND-AT104'
  },
  {
    id: 'VND-AT-02',
    stallNumber: 'AT-112',
    name: 'Tadesse & Sons Avocado & Citrus',
    amharicName: 'ታደሰ እና ልጆቹ አቮካዶና ሎሚ',
    marketZone: 'Atikilt Tera (Fruit & Veg)',
    primaryProduce: 'Avocado peels, Orange rinds, Papaya pulp',
    participationStatus: 'active',
    totalWasteKg: 4890,
    collectionsCount: 198,
    contaminationCount: 4,
    contaminationRatePct: 2.0,
    rewardTier: 'Green Champion',
    joinedDate: '2025-10-02',
    contactPhone: '+251 92 233 4455',
    qrCode: 'GM-VND-AT112'
  },
  {
    id: 'VND-SB-03',
    stallNumber: 'SB-044',
    name: 'Marta Hailu Onion & Garlic Mart',
    amharicName: 'ማርታ ኃይሉ ሽንኩርትና ነጭ ሽንኩርት',
    marketZone: 'Sebategna Organic',
    primaryProduce: 'Onion skins, garlic stems, dry root greens',
    participationStatus: 'warned',
    totalWasteKg: 1820,
    collectionsCount: 78,
    contaminationCount: 9,
    contaminationRatePct: 11.5,
    rewardTier: 'Needs Training',
    joinedDate: '2026-02-15',
    contactPhone: '+251 91 334 5678',
    qrCode: 'GM-VND-SB044'
  },
  {
    id: 'VND-ST-04',
    stallNumber: 'ST-208',
    name: 'Abebech Teff & Grain Cleaning',
    amharicName: 'አበበች የጤፍና እህል አበጣሪዎች',
    marketZone: 'Shera Tera Grain & Spice',
    primaryProduce: 'Teff husks, straw chaf, broken pulse pods',
    participationStatus: 'active',
    totalWasteKg: 5600,
    collectionsCount: 215,
    contaminationCount: 3,
    contaminationRatePct: 1.3,
    rewardTier: 'Green Champion',
    joinedDate: '2025-08-20',
    contactPhone: '+251 94 455 6677',
    qrCode: 'GM-VND-ST208'
  },
  {
    id: 'VND-BT-05',
    stallNumber: 'BT-031',
    name: 'Kassa Brothers Banana Shed',
    amharicName: 'ካሳ ወንድማማቾች የሙዝ ማከፋፈያ',
    marketZone: 'Bomb Tera Marketplace',
    primaryProduce: 'Overripe bananas, banana stalk pulp, leaves',
    participationStatus: 'active',
    totalWasteKg: 6240,
    collectionsCount: 188,
    contaminationCount: 5,
    contaminationRatePct: 2.6,
    rewardTier: 'Green Champion',
    joinedDate: '2025-09-12',
    contactPhone: '+251 91 566 7788',
    qrCode: 'GM-VND-BT031'
  },
  {
    id: 'VND-DT-06',
    stallNumber: 'DT-089',
    name: 'Rahel Greens & Herbs Corner',
    amharicName: 'ራሔል ትኩስ አትክልትና ቅጠላቅጠል',
    marketZone: 'Dubai Tera Fresh Arcade',
    primaryProduce: 'Gomen (kale), coriander, carrot greens',
    participationStatus: 'active',
    totalWasteKg: 2150,
    collectionsCount: 92,
    contaminationCount: 2,
    contaminationRatePct: 2.1,
    rewardTier: 'Standard Partner',
    joinedDate: '2026-01-10',
    contactPhone: '+251 92 778 8990',
    qrCode: 'GM-VND-DT089'
  }
];

export const INITIAL_COLLECTIONS: CollectionRecord[] = [
  {
    id: 'COL-20260906-001',
    vendorId: 'VND-AT-01',
    vendorName: 'Fatuma Kedir Veg & Enset Store',
    vendorAmharicName: 'ፋጡማ ከድር አትክልትና እንሰት',
    stall: 'AT-104',
    marketZone: 'Atikilt Tera (Fruit & Veg)',
    weightKg: 28.5,
    quality: 'clean',
    collectorId: 'USR-CW-01',
    collectorName: 'Dawit Mekonnen',
    timestamp: '2026-09-06T08:15:00',
    syncStatus: 'synced',
    scaleSource: 'manual_keypad'
  },
  {
    id: 'COL-20260906-002',
    vendorId: 'VND-AT-02',
    vendorName: 'Tadesse & Sons Avocado & Citrus',
    vendorAmharicName: 'ታደሰ እና ልጆቹ አቮካዶና ሎሚ',
    stall: 'AT-112',
    marketZone: 'Atikilt Tera (Fruit & Veg)',
    weightKg: 42.0,
    quality: 'clean',
    collectorId: 'USR-CW-01',
    collectorName: 'Dawit Mekonnen',
    timestamp: '2026-09-06T08:35:00',
    syncStatus: 'synced',
    scaleSource: 'digital_scale_bt'
  },
  {
    id: 'COL-20260906-003',
    vendorId: 'VND-SB-03',
    vendorName: 'Marta Hailu Onion & Garlic Mart',
    vendorAmharicName: 'ማርታ ኃይሉ ሽንኩርትና ነጭ ሽንኩርት',
    stall: 'SB-044',
    marketZone: 'Sebategna Organic',
    weightKg: 19.4,
    quality: 'minor_contamination',
    contaminationTypes: ['Plastic'],
    notes: 'Plastic string removed on spot from onion bundles',
    collectorId: 'USR-CW-01',
    collectorName: 'Dawit Mekonnen',
    timestamp: '2026-09-06T09:05:00',
    syncStatus: 'synced',
    scaleSource: 'manual_keypad'
  },
  {
    id: 'COL-20260906-004',
    vendorId: 'VND-BT-05',
    vendorName: 'Kassa Brothers Banana Shed',
    vendorAmharicName: 'ካሳ ወንድማማቾች የሙዝ ማከፋፈያ',
    stall: 'BT-031',
    marketZone: 'Bomb Tera Marketplace',
    weightKg: 64.0,
    quality: 'clean',
    collectorId: 'USR-CW-01',
    collectorName: 'Dawit Mekonnen',
    timestamp: '2026-09-06T09:40:00',
    syncStatus: 'synced',
    scaleSource: 'manual_keypad'
  },
  {
    id: 'COL-20260906-005',
    vendorId: 'VND-ST-04',
    vendorName: 'Abebech Teff & Grain Cleaning',
    vendorAmharicName: 'አበበች የጤፍና እህል አበጣሪዎች',
    stall: 'ST-208',
    marketZone: 'Shera Tera Grain & Spice',
    weightKg: 35.2,
    quality: 'clean',
    collectorId: 'USR-CW-01',
    collectorName: 'Dawit Mekonnen',
    timestamp: '2026-09-06T10:10:00',
    syncStatus: 'synced',
    scaleSource: 'digital_scale_bt'
  }
];

export const INITIAL_BATCHES: CompostBatch[] = [
  {
    id: 'BAT-2026-088',
    batchNumber: 'GM-C088',
    inputWeightKg: 4200,
    sourceCollectionIds: ['COL-HIST-441', 'COL-HIST-442', 'COL-HIST-443'],
    startDate: '2026-08-14',
    currentStage: 'active_composting',
    status: 'in_progress',
    responsibleOperator: 'Almaz Tadesse',
    currentTempC: 58.4,
    currentMoisturePct: 54,
    turnsCount: 3,
    targetCompletionDate: '2026-09-25',
    events: [
      {
        id: 'EV-01',
        batchId: 'BAT-2026-088',
        timestamp: '2026-08-14T09:00:00',
        eventType: 'created',
        operatorName: 'Almaz Tadesse',
        title: 'Batch Created from Atikilt Tera & Shera Tera Waste',
        titleAm: 'ማዳበሪያ ባች ከአትክልት ተራና ሸራ ተራ ተቋቋመ',
        notes: 'Balanced 60% vegetable green waste with 40% teff straw carbon brown'
      },
      {
        id: 'EV-02',
        batchId: 'BAT-2026-088',
        timestamp: '2026-08-18T11:30:00',
        eventType: 'temperature',
        operatorName: 'Almaz Tadesse',
        title: 'Thermophilic Phase Reached (56.5°C)',
        titleAm: 'የሙቀት መጠን 56.5°C ደረሰ',
        temperatureC: 56.5,
        moisturePct: 58
      },
      {
        id: 'EV-03',
        batchId: 'BAT-2026-088',
        timestamp: '2026-08-25T14:15:00',
        eventType: 'turned',
        operatorName: 'Almaz Tadesse',
        title: 'First Windrow Turn & Moisture Adjustment',
        titleAm: 'የመጀመሪያው ማገላበጥ እና እርጥበት ማስተካከል',
        notes: 'Aeration completed. Core sweet earthy smell, no anaerobic pockets.'
      },
      {
        id: 'EV-04',
        batchId: 'BAT-2026-088',
        timestamp: '2026-09-02T10:00:00',
        eventType: 'temperature',
        operatorName: 'Almaz Tadesse',
        title: 'Second Turn & Temp Stabilizing (58.4°C)',
        titleAm: 'ሁለተኛ ዙር ማገላበጥ - ሙቀት 58.4°C',
        temperatureC: 58.4,
        moisturePct: 54
      }
    ]
  },
  {
    id: 'BAT-2026-089',
    batchNumber: 'GM-C089',
    inputWeightKg: 5100,
    sourceCollectionIds: ['COL-HIST-450', 'COL-HIST-451'],
    startDate: '2026-08-26',
    currentStage: 'maturation',
    status: 'ready_for_testing',
    responsibleOperator: 'Almaz Tadesse',
    currentTempC: 38.2,
    currentMoisturePct: 44,
    turnsCount: 4,
    targetCompletionDate: '2026-09-12',
    testingMetrics: {
      carbonNitrogenRatio: '14:1',
      phLevel: 7.3,
      weedSeedViability: 'Zero',
      heavyMetalsPassed: true,
      moistureEndPct: 35
    },
    events: [
      {
        id: 'EV-05',
        batchId: 'BAT-2026-089',
        timestamp: '2026-08-26T08:30:00',
        eventType: 'created',
        operatorName: 'Almaz Tadesse',
        title: 'Batch Created from Weekend Market Surge',
        titleAm: 'ከሳምንቱ መጨረሻ የገበያ ተረፈ ምርት የተሰራ ባች',
        notes: 'High nitrogen mix from Atikilt Tera cabbages and banana waste'
      },
      {
        id: 'EV-06',
        batchId: 'BAT-2026-089',
        timestamp: '2026-09-04T16:00:00',
        eventType: 'sample_tested',
        operatorName: 'Almaz Tadesse',
        title: 'Curing Phase Commenced - Laboratory Sample Taken',
        titleAm: 'የማብሰያ ደረጃ ተጀመረ - ናሙና ለምርመራ ተወሰደ',
        notes: 'Rich dark humus texture. Excellent crumble test.'
      }
    ]
  },
  {
    id: 'BAT-2026-085',
    batchNumber: 'GM-C085',
    inputWeightKg: 6400,
    sourceCollectionIds: ['COL-HIST-410'],
    startDate: '2026-07-20',
    currentStage: 'finished_compost',
    status: 'completed',
    responsibleOperator: 'Almaz Tadesse',
    currentTempC: 24.0,
    currentMoisturePct: 32,
    turnsCount: 5,
    targetCompletionDate: '2026-08-28',
    completedDate: '2026-08-28',
    finalWeightKg: 2880,
    qualityGrade: 'Grade A (Bio-Enriched Organic)',
    testingMetrics: {
      carbonNitrogenRatio: '12:1',
      phLevel: 7.1,
      weedSeedViability: 'Zero',
      heavyMetalsPassed: true,
      moistureEndPct: 32
    },
    events: [
      {
        id: 'EV-07',
        batchId: 'BAT-2026-085',
        timestamp: '2026-08-28T15:00:00',
        eventType: 'completed',
        operatorName: 'Almaz Tadesse',
        title: 'Screened to 8mm & Bagged for Agricultural Distribution',
        titleAm: 'በ8ሚሜ ተነፍቶ ለእርሻ ዝግጁ ሆነ',
        notes: 'Passed certified biological and germination standards. Ready for sale.'
      }
    ]
  }
];

export const INITIAL_INVENTORY: CompostInventoryItem[] = [
  {
    id: 'INV-085-A',
    batchId: 'BAT-2026-085',
    batchNumber: 'GM-C085',
    grade: 'Grade A (Bio-Enriched Organic)',
    totalProducedKg: 2880,
    availableKg: 1380,
    soldKg: 1500,
    bagged50kgUnits: 27, // 1350kg in bags + 30kg bulk
    pricePerKgETB: 18.5,
    productionFacility: 'Repi Circular Composting Yard',
    completionDate: '2026-08-28',
    certifiedBy: 'Ministry of Agriculture Organic Protocol & Addis EPA'
  },
  {
    id: 'INV-083-B',
    batchId: 'BAT-2026-083',
    batchNumber: 'GM-C083',
    grade: 'Grade B (General Agricultural)',
    totalProducedKg: 3400,
    availableKg: 2100,
    soldKg: 1300,
    bagged50kgUnits: 42,
    pricePerKgETB: 14.0,
    productionFacility: 'Akaki Composting Site',
    completionDate: '2026-08-15',
    certifiedBy: 'Addis EPA Green Standard'
  }
];

export const INITIAL_BUYERS: FarmerBuyer[] = [
  {
    id: 'BYR-01',
    name: 'Sululta Highland Dairy & Vegetable Union',
    amharicName: 'የሱሉልታ ወተትና አትክልት አምራቾች ማህበር',
    buyerType: 'agricultural_coop',
    location: 'Sululta (North Shewa Corridor)',
    phone: '+251 91 198 7654',
    cropFocus: 'Highland Veg, Potatoes, Barley forage',
    totalPurchasedKg: 3500,
    totalSpentETB: 61500,
    joinedDate: '2025-10-14'
  },
  {
    id: 'BYR-02',
    name: 'Debre Zeit Teff & Wheat Growers Coop',
    amharicName: 'የደብረዘይት ጤፍና ስንዴ አምራቾች ኅብረት',
    buyerType: 'agricultural_coop',
    location: 'Bishoftu (Debre Zeit)',
    phone: '+251 92 234 8899',
    cropFocus: 'Magna Teff, Durum Wheat',
    totalPurchasedKg: 4800,
    totalSpentETB: 79200,
    joinedDate: '2025-09-01'
  },
  {
    id: 'BYR-03',
    name: 'Yeka Forest & Urban Greening Initiative',
    amharicName: 'የየካ ደንና የከተማ ግብርና ተነሳሽነት',
    buyerType: 'urban_greening',
    location: 'Yeka Sub-city, Addis Ababa',
    phone: '+251 91 123 9988',
    cropFocus: 'Nursery seedlings, Tree saplings, Urban parks',
    totalPurchasedKg: 1200,
    totalSpentETB: 22200,
    joinedDate: '2026-01-22'
  },
  {
    id: 'BYR-04',
    name: 'Sebeta Agro-Eco Horticulture Farm',
    amharicName: 'የሰበታ አግሮ ኢኮ አትክልትና ፍራፍሬ',
    buyerType: 'commercial_farm',
    location: 'Sebeta (Southwest Shewa)',
    phone: '+251 93 456 1234',
    cropFocus: 'Greenhouse Tomatoes, Strawberries, Peppers',
    totalPurchasedKg: 2800,
    totalSpentETB: 51800,
    joinedDate: '2025-11-30'
  }
];

export const INITIAL_SALES: CompostSale[] = [
  {
    id: 'SL-2026-001',
    receiptNumber: 'GM-REC-901',
    buyerId: 'BYR-01',
    buyerName: 'Sululta Highland Dairy & Vegetable Union',
    buyerType: 'agricultural_coop',
    buyerLocation: 'Sululta',
    inventoryBatchId: 'INV-085-A',
    batchNumber: 'GM-C085',
    grade: 'Grade A (Bio-Enriched Organic)',
    quantityKg: 1000,
    bags50kg: 20,
    pricePerKgETB: 18.5,
    totalAmountETB: 18500,
    officerId: 'USR-SO-03',
    officerName: 'Bekele Haile',
    timestamp: '2026-09-02T11:20:00',
    paymentMethod: 'Telebirr',
    notes: 'Dispatched on flatbed truck for Sululta nursery planting season'
  },
  {
    id: 'SL-2026-002',
    receiptNumber: 'GM-REC-902',
    buyerId: 'BYR-02',
    buyerName: 'Debre Zeit Teff & Wheat Growers Coop',
    buyerType: 'agricultural_coop',
    buyerLocation: 'Bishoftu',
    inventoryBatchId: 'INV-083-B',
    batchNumber: 'GM-C083',
    grade: 'Grade B (General Agricultural)',
    quantityKg: 800,
    bags50kg: 16,
    pricePerKgETB: 14.0,
    totalAmountETB: 11200,
    officerId: 'USR-SO-03',
    officerName: 'Bekele Haile',
    timestamp: '2026-09-04T15:45:00',
    paymentMethod: 'CBE Birr',
    notes: 'Soil remediation ahead of post-Kiremt planting'
  }
];

export const INITIAL_ALERTS: OperationalAlert[] = [
  {
    id: 'ALT-01',
    level: 'warning',
    title: 'Batch GM-C088 Temperature Check Due',
    titleAm: 'የባች GM-C088 የሙቀት ምርመራ ደርሷል',
    description: 'Active composting day 23: Core probe required before 14:00 to verify pathogen eradication window (>55°C).',
    descriptionAm: 'የሙቀት መጠን ምርመራ ከቀኑ 8:00 በፊት መከናወን አለበት።',
    timestamp: '2026-09-06T07:30:00',
    resolved: false,
    category: 'temperature',
    targetId: 'BAT-2026-088'
  },
  {
    id: 'ALT-02',
    level: 'critical',
    title: 'Repeated Contamination: Stall SB-044',
    titleAm: 'ተደጋጋሚ ብክለት፡ ሱቅ SB-044 (ሰባተኛ)',
    description: 'Marta Hailu Stall recorded 9 contamination incidents this month (plastic baling twine). Education visit scheduled.',
    descriptionAm: 'በዚህ ወር 9 ጊዜ የፕላስቲክ ብክለት ተመዝግቧል። ስልጠና ሊሰጣቸው ይገባል።',
    timestamp: '2026-09-06T09:10:00',
    resolved: false,
    category: 'contamination',
    targetId: 'VND-SB-03'
  },
  {
    id: 'ALT-03',
    level: 'info',
    title: 'Compost Stock Notice: Grade A Inventory < 1.5 MT',
    titleAm: 'የማዳበሪያ ክምችት ማስታወቂያ፡ ደረጃ ሀ ከ 1.5 ቶን በታች',
    description: 'Available Grade A organic compost is currently 1,380 kg. Batch GM-C089 curing will replenish in 6 days.',
    descriptionAm: 'ያለቀለት ደረጃ ሀ ማዳበሪያ 1,380 ኪሎ ደርሷል።',
    timestamp: '2026-09-05T16:00:00',
    resolved: true,
    category: 'inventory',
    targetId: 'INV-085-A'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-001',
    userId: 'USR-CW-01',
    userName: 'Dawit Mekonnen',
    userRole: 'COLLECTION_WORKER',
    action: 'CREATE_COLLECTION',
    actionAm: 'ቆሻሻ ምዝገባ ተፈጸመ',
    entityType: 'Collection',
    entityId: 'COL-20260906-001',
    timestamp: '2026-09-06T08:15:00',
    previousValue: 'None',
    newValue: '28.5 kg (Clean) - Fatuma Kedir (AT-104)',
    details: 'Collection performed at stall AT-104, weighed via certified field scale.'
  },
  {
    id: 'AUD-002',
    userId: 'USR-CO-02',
    userName: 'Almaz Tadesse',
    userRole: 'COMPOST_OPERATOR',
    action: 'UPDATE_BATCH_TEMP',
    actionAm: 'የባች ሙቀት ተመዘገበ',
    entityType: 'CompostBatch',
    entityId: 'BAT-2026-088',
    timestamp: '2026-09-02T10:00:00',
    previousValue: '56.5°C',
    newValue: '58.4°C (Turn #2 completed)',
    details: 'Digital soil core probe used. Optimum biological thermophilic activity confirmed.'
  },
  {
    id: 'AUD-003',
    userId: 'USR-SO-03',
    userName: 'Bekele Haile',
    userRole: 'SALES_OFFICER',
    action: 'RECORD_SALE',
    actionAm: 'የማዳበሪያ ሽያጭ ተመዘገበ',
    entityType: 'Sale',
    entityId: 'SL-2026-002',
    timestamp: '2026-09-04T15:45:00',
    previousValue: 'Inventory Available: 2,900 kg',
    newValue: 'Inventory Available: 2,100 kg (Sold: 800 kg to Debre Zeit Coop)',
    details: 'Sold 16 bags (50kg) @ 14 ETB/kg. Total ETB 11,200 via CBE Birr.'
  },
  {
    id: 'AUD-004',
    userId: 'USR-AD-05',
    userName: 'Girma Wolde',
    userRole: 'ADMINISTRATOR',
    action: 'UPDATE_VENDOR_STATUS',
    actionAm: 'የነጋዴ ሁኔታ ተቀየረ',
    entityType: 'Vendor',
    entityId: 'VND-SB-03',
    timestamp: '2026-09-05T11:00:00',
    previousValue: 'Status: active, Tier: Standard Partner',
    newValue: 'Status: warned, Tier: Needs Training',
    details: 'Issued formal contamination flag following 9 unseparated plastic incidents.'
  }
];
