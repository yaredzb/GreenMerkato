import { describe, it, expect } from 'vitest';
import { 
  DEMO_USERS, 
  INITIAL_VENDORS, 
  INITIAL_COLLECTIONS, 
  INITIAL_BATCHES, 
  INITIAL_INVENTORY, 
  INITIAL_BUYERS 
} from './mockData';

describe('GreenMerkato Operational Mock Data', () => {
  it('should define all five required user roles with English and Amharic names', () => {
    const requiredRoles = [
      'COLLECTION_WORKER',
      'COMPOST_OPERATOR',
      'SALES_OFFICER',
      'OPERATIONS_MANAGER',
      'ADMINISTRATOR'
    ];

    requiredRoles.forEach(role => {
      const user = DEMO_USERS[role];
      expect(user).toBeDefined();
      expect(user.role).toBe(role);
      expect(user.name.length).toBeGreaterThan(0);
      expect(user.amharicName.length).toBeGreaterThan(0);
      expect(user.phone).toMatch(/^\+251/);
    });
  });

  it('should contain valid market vendors in distinct Merkato zones', () => {
    expect(INITIAL_VENDORS.length).toBeGreaterThan(0);

    INITIAL_VENDORS.forEach(vendor => {
      expect(vendor.id).toBeDefined();
      expect(vendor.stallNumber).toMatch(/^[A-Z]{2,4}-\d+/);
      expect(vendor.name).toBeTruthy();
      expect(vendor.amharicName).toBeTruthy();
      expect(vendor.marketZone).toBeTruthy();
      expect(vendor.totalWasteKg).toBeGreaterThanOrEqual(0);
      expect(['Green Champion', 'Standard Partner', 'Needs Training']).toContain(vendor.rewardTier);
    });
  });

  it('should have initial collection records with valid weights and timestamps', () => {
    expect(INITIAL_COLLECTIONS.length).toBeGreaterThan(0);

    INITIAL_COLLECTIONS.forEach(col => {
      expect(col.id).toBeDefined();
      expect(col.weightKg).toBeGreaterThan(0);
      expect(['clean', 'minor_contamination', 'rejected']).toContain(col.quality);
      expect(new Date(col.timestamp).getTime()).not.toBeNaN();
    });
  });

  it('should have composting batches with active pile metrics', () => {
    expect(INITIAL_BATCHES.length).toBeGreaterThan(0);

    INITIAL_BATCHES.forEach(batch => {
      expect(batch.batchNumber).toBeDefined();
      expect(batch.inputWeightKg).toBeGreaterThan(0);
      expect(batch.currentTempC).toBeGreaterThan(0);
      expect(batch.currentStage).toBeTruthy();
    });
  });

  it('should maintain inventory bags and buyer cooperatives', () => {
    expect(INITIAL_INVENTORY.length).toBeGreaterThan(0);
    expect(INITIAL_BUYERS.length).toBeGreaterThan(0);

    INITIAL_BUYERS.forEach(buyer => {
      expect(buyer.name).toBeTruthy();
      expect(buyer.phone).toMatch(/^\+251/);
      expect(buyer.totalPurchasedKg).toBeGreaterThanOrEqual(0);
    });
  });
});
