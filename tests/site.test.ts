import { describe, it, expect } from 'vitest';
import { site } from '../src/data/site';

describe('site config', () => {
  it('has 2 phone numbers from client_information.md', () => {
    expect(site.phones).toEqual(['097-259-2502', '064-092-0412']);
  });

  it('has GBP coordinates for ต.ยางตาล อ.โกรกพระ', () => {
    expect(site.geo.lat).toBeCloseTo(15.6033605, 4);
    expect(site.geo.lng).toBeCloseTo(100.1217694, 4);
  });

  it('lists 5 service areas with นครสวรรค์ first', () => {
    expect(site.serviceAreas[0]).toBe('นครสวรรค์');
    expect(site.serviceAreas).toHaveLength(5);
  });

  it('has email and LINE ID', () => {
    expect(site.email).toBe('baannockdown.ns@gmail.com');
    expect(site.lineId).toBe('@baannockdown');
  });

  it('has founding date and price range for JSON-LD', () => {
    expect(site.founded).toBe('2023');
    expect(site.priceRange).toBe('฿฿');
  });
});
