import { describe, it, expect, vi } from 'vitest';
import { getTopCategoriesModel } from '../../src/models/statistics.models.mjs';
import pool from '../../src/config/postgres.mjs';

describe('Top 10 Categories Model', () => {
  it('returns formatted top 10 categories with percentage share', async () => {
    vi.spyOn(pool, 'query').mockResolvedValue({
      rows: [
        { category_name: 'Computer Science', borrow_turns: 50 },
        { category_name: 'Literature', borrow_turns: 30 },
        { category_name: 'History', borrow_turns: 20 },
      ],
    });

    const result = await getTopCategoriesModel({ timeframe: 'week', branchId: 'all' });

    expect(result).toHaveLength(3);
    expect(result[0].rank).toBe(1);
    expect(result[0].categoryName).toBe('Computer Science');
    expect(result[0].borrowTurns).toBe(50);
    expect(result[0].percentageShare).toBe(50.0);
  });
});
