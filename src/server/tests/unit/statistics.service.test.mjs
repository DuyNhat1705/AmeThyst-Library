import { describe, it, expect, vi } from 'vitest';
import { getAdminStatisticsService } from '../../src/services/statistics.services.mjs';
import * as models from '../../src/models/statistics.models.mjs';

describe('Admin Statistics Service', () => {
  it('aggregates summary metrics, branches, categories, books, and rooms', async () => {
    vi.spyOn(models, 'getBranchesModel').mockResolvedValue([
      { branch_id: 1, name: 'Main Branch', name_short: 'MAIN' },
    ]);
    vi.spyOn(models, 'getSummaryMetricsModel').mockResolvedValue({
      totalUsers: 100,
      usersGrowthPct: 5.0,
      activeBorrows: 20,
      totalBorrows: 50,
      overdueBooksCount: 2,
      totalLateFees: 15000,
    });
    vi.spyOn(models, 'getTopCategoriesModel').mockResolvedValue([
      { rank: 1, categoryId: 'cat-1', categoryName: 'Science', borrowTurns: 30, percentageShare: 60.0 },
    ]);
    vi.spyOn(models, 'getTopBorrowedBooksModel').mockResolvedValue([
      { rank: 1, bookId: 'b-1', title: 'Clean Code', coverUrl: '/cover.png', borrowCount: 15, popularityPct: 100 },
    ]);
    vi.spyOn(models, 'getTopReservedRoomsModel').mockResolvedValue([
      { roomId: '1', roomName: 'Room A', branchId: '1', branchName: 'Main Branch', reservationTurns: 10 },
    ]);

    const result = await getAdminStatisticsService({ timeframe: 'week', branchId: 'all' });

    expect(result).toHaveProperty('filter');
    expect(result.summaryMetrics.totalUsers).toBe(100);
    expect(result.summaryMetrics.overdueBooksCount).toBe(2);
    expect(result.topCategories).toHaveLength(1);
    expect(result.topCategories[0].categoryName).toBe('Science');
    expect(result.branches).toHaveLength(1);
  });
});
