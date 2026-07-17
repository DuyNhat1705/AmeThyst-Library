import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import pool from '../src/config/postgres.mjs';
import * as recService from '../src/services/recommendation.services.mjs';
import net from 'net';

// Mock postgres pool
vi.mock('../src/config/postgres.mjs', () => {
  return {
    default: {
      query: vi.fn()
    }
  };
});

// Mock memgraph Sync
vi.mock('../src/services/memgraphSync.services.mjs', () => {
  return {
    syncRecommendationClick: vi.fn().mockResolvedValue(true)
  };
});

// Mock memgraph config
vi.mock('../src/config/memgraph.config.mjs', () => {
  return {
    getSession: vi.fn().mockReturnValue({
      run: vi.fn().mockResolvedValue({ records: [] }),
      close: vi.fn().mockResolvedValue(true)
    })
  };
});

describe('AI Recommendation Services Integration Tests', () => {
  let server;
  const port = 5999;

  beforeAll(async () => {
    process.env.RECOMMENDATION_PORT = String(port);
    
    // Set up a dynamic mock TCP inference server that echoes back inputs with scores
    server = net.createServer((socket) => {
      socket.on('data', (data) => {
        try {
          const str = data.toString().trim();
          const parsed = JSON.parse(str);
          const ranked = (parsed.candidates || []).map((c, i) => ({
            id: c.id,
            score: c.gcn_score || (0.9 - i * 0.05)
          })).sort((a, b) => b.score - a.score);
          
          socket.write(JSON.stringify({ success: true, ranked }) + '\n');
        } catch (e) {
          socket.write(JSON.stringify({ success: false, error: e.message }) + '\n');
        }
      });
    });

    await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  beforeEach(() => {
    // Clear mock histories and reset mock implementations to prevent test bleeding
    pool.query.mockReset();
    recService.invalidateUserRecommendationCache('test-user-id');
  });

  describe('Cache Management & Invalidation', () => {
    it('should fetch recommendations from database on cache miss and cache them', async () => {
      // Mock PG response for active recommendations (at least 15 items)
      const mockActiveRecs = Array.from({ length: 15 }, (_, i) => ({
        book_id: `book-${i}`,
        score: 0.9 - i * 0.05,
        title: `Book Title ${i}`,
        author: ['Author Name'],
        image_url: 'http://example.com/cover.jpg'
      }));
      
      pool.query.mockResolvedValueOnce({ rows: mockActiveRecs });

      // First call: cache miss
      const result1 = await recService.getUserRecommendations('test-user-id');
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result1).toHaveLength(15);
      expect(result1[0].id).toBe('book-0');

      // Second call: cache hit (should not call pool.query again)
      const result2 = await recService.getUserRecommendations('test-user-id');
      expect(pool.query).toHaveBeenCalledTimes(1); // Still 1 call
      expect(result2).toEqual(result1);
    });

    it('should bypass cache and regenerate when cache is invalidated', async () => {
      const mockActiveRecs = Array.from({ length: 15 }, (_, i) => ({
        book_id: `book-${i}`,
        score: 0.9 - i * 0.05,
        title: `Book Title ${i}`,
        author: ['Author Name'],
        image_url: 'http://example.com/cover.jpg'
      }));
      
      pool.query.mockResolvedValue({ rows: mockActiveRecs });

      // First fetch: cache miss
      await recService.getUserRecommendations('test-user-id');
      expect(pool.query).toHaveBeenCalledTimes(1);

      // Invalidate cache
      recService.invalidateUserRecommendationCache('test-user-id');

      // Second fetch: should hit DB again
      await recService.getUserRecommendations('test-user-id');
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('TCP Socket Client Inference Handler', () => {
    it('should communicate correctly over TCP socket', async () => {
      // Mock GCN candidates and trending candidates queries to run generateRecommendations
      // Memgraph session mock returning 15 GCN candidates
      const { getSession } = await import('../src/config/memgraph.config.mjs');
      const mockRun = vi.fn().mockResolvedValue({
        records: Array.from({ length: 15 }, (_, i) => ({
          get: (key) => (key === 'id' ? `book-${i}` : 0.9 - i * 0.05)
        }))
      });
      getSession.mockReturnValue({
        run: mockRun,
        close: vi.fn().mockResolvedValue(true)
      });

      const mockTrending = Array.from({ length: 15 }, (_, i) => ({
        book_id: `book-${i}`,
        interactions: 10
      }));

      const mockFeatures = Array.from({ length: 15 }, (_, i) => ({
        book_id: `book-${i}`,
        global_available_copies: 5,
        is_in_wishlist: false,
        past_impressions_count: 0
      }));

      const mockDetails = Array.from({ length: 15 }, (_, i) => ({
        book_id: `book-${i}`,
        title: `Book ${i}`,
        author: [`Author ${i}`],
        image_url: ''
      }));

      // PG mock queries within generateRecommendations
      pool.query
        // 1. Trending candidates
        .mockResolvedValueOnce({ rows: mockTrending })
        // 2. Previously recommended history
        .mockResolvedValueOnce({ rows: [] })
        // 3. Bulk features compilation
        .mockResolvedValueOnce({ rows: mockFeatures })
        // 4. Save recommendations insertQuery
        .mockResolvedValueOnce({ rowCount: 15 })
        // 5. Details query
        .mockResolvedValueOnce({ rows: mockDetails });

      // Call generateRecommendations
      const result = await recService.generateRecommendations('test-user-id');
      expect(result).toHaveLength(15);
      expect(result[0].id).toBe('book-0');
      expect(result[0].score).toBe(0.9);
    });
  });

  describe('Click Tracking and Cache Invalidation', () => {
    it('should update recommendations in PostgreSQL and invalidate user cache on click log', async () => {
      // Mock active recommendations with at least 15 items to prevent generation fallback
      const mockActiveRecs = Array.from({ length: 15 }, (_, i) => ({
        book_id: i === 0 ? 'book-1' : `book-other-${i}`,
        score: 0.9 - i * 0.05,
        title: 'Book',
        author: ['Author'],
        image_url: ''
      }));
      
      pool.query.mockResolvedValueOnce({ rows: mockActiveRecs });
      
      // Populate cache
      await recService.getUserRecommendations('test-user-id');
      expect(pool.query).toHaveBeenCalledTimes(1);

      // Mock update query
      pool.query.mockResolvedValueOnce({ rowCount: 1 });

      // Click the recommendation
      const logged = await recService.logRecommendationClick('test-user-id', 'book-1');
      expect(logged).toBe(true);
      expect(pool.query).toHaveBeenCalledTimes(2);

      // Verify that the cache was cleared (next getUserRecommendations should call database again)
      pool.query.mockResolvedValueOnce({ rows: mockActiveRecs });
      await recService.getUserRecommendations('test-user-id');
      expect(pool.query).toHaveBeenCalledTimes(3); // 1st fetch + 1st click + 2nd fetch
    });
  });
});
