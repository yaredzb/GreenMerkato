/**
 * GreenMerkato Operational System Types
 * Organic Waste to Compost Management in Merkato, Addis Ababa
 */

export type UserRole = 
  | 'COLLECTION_WORKER'
  | 'COMPOST_OPERATOR'
  | 'SALES_OFFICER'
  | 'OPERATIONS_MANAGER'
  | 'ADMINISTRATOR';

export type Language = 'en' | 'am';

export interface UserProfile {
  id: string;
  name: string;
  amharicName: string;
  role: UserRole;
  phone: string;
  assignedZone?: string;
  avatarInitials: string;
  activeStatus?: boolean;
  lastActive?: string;
}

export type User = UserProfile;

export type MarketZone = 
  | 'Atikilt Tera (Fruit & Veg)'
  | 'Sebategna Organic'
  | 'Shera Tera Grain & Spice'
  | 'Bomb Tera Marketplace'
  | 'Military Tera Perishables'
  | 'Dubai Tera Fresh Arcade';

export interface Vendor {
  id: string;
  stallNumber: string;
  name: string;
  amharicName: string;
  marketZone: MarketZone;
  primaryProduce: string;
  participationStatus: 'active' | 'warned' | 'inactive';
  totalWasteKg: number;
  collectionsCount: number;
  contaminationCount: number;
  contaminationRatePct: number;
  rewardTier: 'Green Champion' | 'Standard Partner' | 'Needs Training';
  joinedDate: string;
  contactPhone: string;
  qrCode: string;
}

export type WasteQuality = 'clean' | 'minor_contamination' | 'rejected';

export type ContaminationType = 'Plastic' | 'Glass' | 'Metal' | 'Mixed waste' | 'Chemical' | 'Other';

export interface CollectionRecord {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorAmharicName: string;
  stall: string;
  marketZone: MarketZone;
  weightKg: number;
  quality: WasteQuality;
  contaminationTypes?: ContaminationType[];
  notes?: string;
  collectorId: string;
  collectorName: string;
  timestamp: string; // ISO string
  syncStatus: 'synced' | 'pending';
  scaleSource?: 'manual_keypad' | 'digital_scale_bt';
}

export type BatchStage = 
  | 'waste_received'
  | 'batch_created'
  | 'active_composting'
  | 'maturation'
  | 'quality_check'
  | 'finished_compost';

export type BatchStatus = 'in_progress' | 'ready_for_testing' | 'completed' | 'rejected';

export interface BatchTimelineEvent {
  id: string;
  batchId: string;
  timestamp: string;
  eventType: 'created' | 'temperature' | 'moisture' | 'turned' | 'aerated' | 'sample_tested' | 'completed' | 'rejected_material';
  operatorName: string;
  title: string;
  titleAm: string;
  notes?: string;
  temperatureC?: number;
  moisturePct?: number;
  rejectedKg?: number;
}

export interface CompostBatch {
  id: string;
  batchNumber: string;
  inputWeightKg: number;
  sourceCollectionIds: string[];
  startDate: string;
  currentStage: BatchStage;
  status: BatchStatus;
  responsibleOperator: string;
  currentTempC: number;
  currentMoisturePct: number;
  turnsCount: number;
  targetCompletionDate: string;
  completedDate?: string;
  finalWeightKg?: number;
  qualityGrade?: 'Grade A (Bio-Enriched Organic)' | 'Grade B (General Agricultural)' | 'Non-Compliant';
  testingMetrics?: {
    carbonNitrogenRatio: string; // e.g. 15:1
    phLevel: number; // e.g. 7.2
    weedSeedViability: 'Zero' | 'Trace' | 'High';
    heavyMetalsPassed: boolean;
    moistureEndPct: number;
  };
  events: BatchTimelineEvent[];
}

export interface CompostInventoryItem {
  id: string;
  batchId?: string;
  batchNumber: string;
  grade: string;
  totalProducedKg?: number;
  totalQuantityKg?: number;
  availableKg: number;
  soldKg?: number;
  reservedKg?: number;
  bagged50kgUnits?: number;
  packagingType?: string;
  pricePerKgETB: number;
  productionFacility?: string;
  location?: string;
  completionDate?: string;
  certifiedBy?: string;
}

export interface FarmerBuyer {
  id: string;
  name: string;
  amharicName?: string;
  buyerType?: string;
  type?: string;
  location?: string;
  region?: string;
  phone?: string;
  contactPhone?: string;
  cropFocus?: string;
  totalPurchasedKg: number;
  totalSpentETB?: number;
  joinedDate?: string;
  lastPurchaseDate?: string;
}

export interface CompostSale {
  id: string;
  receiptNumber: string;
  buyerId: string;
  buyerName: string;
  buyerType: string;
  buyerLocation?: string;
  contactPhone?: string;
  inventoryBatchId?: string;
  batchNumber?: string;
  grade: string;
  quantityKg: number;
  bags50kg?: number;
  pricePerKgETB?: number;
  unitPriceETB?: number;
  totalAmountETB: number;
  totalPriceETB?: number;
  officerId: string;
  officerName: string;
  timestamp: string;
  paymentMethod: string;
  paymentStatus?: 'paid' | 'pending';
  deliveryNotes?: string;
  notes?: string;
}

export interface OperationalAlert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  timestamp: string;
  resolved: boolean;
  category: 'temperature' | 'contamination' | 'inventory' | 'schedule';
  targetId?: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  actionAm: string;
  entityType: 'Collection' | 'CompostBatch' | 'Inventory' | 'Sale' | 'Vendor' | 'User';
  entityId: string;
  timestamp: string;
  previousValue: string;
  newValue: string;
  details: string;
}

export interface ImpactMetrics {
  // Measured Operational Data
  totalWasteDivertedKg: number;
  totalCompostProducedKg: number;
  activeParticipatingVendors: number;
  totalCollectionsCompleted: number;
  farmersServedCount: number;
  totalSalesETB: number;

  // Calculated / Estimated Environmental Impact
  methaneAvoidedMTCO2e: number;
  syntheticFertilizerOffsetKg: number;
  soilOrganicCarbonRestoredKg: number;
  landfillSpaceSavedCubicM: number;
}
