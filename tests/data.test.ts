import { describe, it, expect } from 'vitest';
import { services } from '../src/data/services';
import { models } from '../src/data/models';
import { portfolio } from '../src/data/portfolio';
import { faqs } from '../src/data/faq';

describe('content data', () => {
  it('has 6 services with unique slugs', () => {
    expect(services).toHaveLength(6);
    const slugs = new Set(services.map((s) => s.slug));
    expect(slugs.size).toBe(6);
  });

  it('has 4 model categories with starting prices', () => {
    expect(models.length).toBeGreaterThanOrEqual(4);
    models.forEach((m) => {
      expect(m.startingPriceTHB).toBeGreaterThan(0);
      expect(m.images.length).toBeGreaterThan(0);
    });
  });

  it('has at least 8 portfolio items with categories', () => {
    expect(portfolio.length).toBeGreaterThanOrEqual(8);
    const validCategories = ['small', '1br', '2br', 'commercial', 'site'];
    portfolio.forEach((p) => {
      expect(validCategories).toContain(p.category);
    });
  });

  it('has at least 6 FAQs', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    faqs.forEach((f) => {
      expect(f.question.length).toBeGreaterThan(5);
      expect(f.answer.length).toBeGreaterThan(10);
    });
  });
});
