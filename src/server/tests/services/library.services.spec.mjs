import { describe, it, expect, vi, beforeEach } from 'vitest';
import pool from '../../src/config/postgres.mjs';
import { getRecommendations, getRelatedBooks } from '../../src/services/library.services.mjs';

// Mock postgres pool
vi.mock('../../src/config/postgres.mjs', () => {
  return {
    default: {
      query: vi.fn()
    }
  };
});

describe('library.services.mjs - getRecommendations and getRelatedBooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRecommendations', () => {
    it('[TC-SRV-LIB-001] should query random books matching limit and filtering out current book id', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [
          { book_id: 'b1', title: 'Book One', author: ['Author A'], image_url: 'http://a.com' },
          { book_id: 'b2', title: 'Book Two', author: ['Author B'], image_url: null }
        ]
      });

      const result = await getRecommendations('b0', 5);

      expect(pool.query).toHaveBeenCalledTimes(1);
      const queryCall = pool.query.mock.calls[0];
      expect(queryCall[0]).toContain('ORDER BY RANDOM()');
      expect(queryCall[0]).toContain('LIMIT $2');
      expect(queryCall[1]).toEqual(['b0', 5]);

      expect(result).toEqual([
        { id: 'b1', title: 'Book One', author: 'Author A', coverImage: 'http://a.com' },
        { id: 'b2', title: 'Book Two', author: 'Author B', coverImage: null }
      ]);
    });
  });

  describe('getRelatedBooks', () => {
    it('[TC-SRV-LIB-002] should query books by genres if current book has genres', async () => {
      // First call fetches current book genres
      pool.query.mockResolvedValueOnce({
        rows: [{ genres: ['Fiction', 'Sci-Fi'] }]
      });
      // Second call fetches related books
      pool.query.mockResolvedValueOnce({
        rows: [
          { book_id: 'b2', title: 'Book Two', author: ['Author B'], image_url: null }
        ]
      });

      const result = await getRelatedBooks('b1');

      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(pool.query.mock.calls[0][1]).toEqual(['b1']);
      expect(pool.query.mock.calls[1][0]).toContain('genres && $2');
      expect(pool.query.mock.calls[1][1]).toEqual(['b1', ['Fiction', 'Sci-Fi']]);

      expect(result).toEqual([
        { id: 'b2', title: 'Book Two', author: 'Author B', coverImage: null }
      ]);
    });

    it('[TC-SRV-LIB-003] should fallback to getRecommendations with limit 20 if current book is not found or has no genres', async () => {
      // First call returns no rows for genres
      pool.query.mockResolvedValueOnce({
        rows: []
      });
      // Second call (inside getRecommendations fallback) returns random books
      pool.query.mockResolvedValueOnce({
        rows: [
          { book_id: 'b3', title: 'Book Three', author: ['Author C'], image_url: null }
        ]
      });

      const result = await getRelatedBooks('b1');

      expect(pool.query).toHaveBeenCalledTimes(2);
      // Fallback query call check
      expect(pool.query.mock.calls[1][0]).toContain('ORDER BY RANDOM()');
      expect(pool.query.mock.calls[1][1]).toEqual(['b1', 20]);
      expect(result).toEqual([
        { id: 'b3', title: 'Book Three', author: 'Author C', coverImage: null }
      ]);
    });

    it('[TC-SRV-LIB-004] should fallback to getRecommendations with limit 20 if no related books with same genres are found', async () => {
      // First call fetches genres
      pool.query.mockResolvedValueOnce({
        rows: [{ genres: ['Mystery'] }]
      });
      // Second call (related books) returns empty list
      pool.query.mockResolvedValueOnce({
        rows: []
      });
      // Third call (inside getRecommendations fallback) returns random books
      pool.query.mockResolvedValueOnce({
        rows: [
          { book_id: 'b4', title: 'Book Four', author: ['Author D'], image_url: 'http://d.com' }
        ]
      });

      const result = await getRelatedBooks('b1');

      expect(pool.query).toHaveBeenCalledTimes(3);
      expect(pool.query.mock.calls[2][0]).toContain('ORDER BY RANDOM()');
      expect(pool.query.mock.calls[2][1]).toEqual(['b1', 20]);
      expect(result).toEqual([
        { id: 'b4', title: 'Book Four', author: 'Author D', coverImage: 'http://d.com' }
      ]);
    });
  });
});
