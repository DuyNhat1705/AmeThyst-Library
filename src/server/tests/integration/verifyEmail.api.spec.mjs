import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import pool from '../../src/config/postgres.mjs';
import authRoutes from '../../src/routes/auth.routes.mjs';

vi.mock('../../src/config/postgres.mjs', () => {
  const queryMock = vi.fn();
  const connectMock = vi.fn();
  return {
    default: {
      query: queryMock,
      connect: connectMock,
      on: vi.fn(),
    },
  };
});

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Verify Email API Integration', () => {
  let mockClient;
  const mockToken = 'mock-uuid-token-54321';

  beforeEach(() => {
    vi.clearAllMocks();

    mockClient = {
      query: vi.fn(),
      release: vi.fn(),
    };

    pool.connect.mockResolvedValue(mockClient);
    mockClient.query.mockResolvedValue({ rows: [] });
    pool.query.mockResolvedValue({ rows: [] });
  });

  describe('Test 1 - Successful verification', { tags: ['@A_R1', '@A_R7', '@A_R9', '@A_R10'] }, () => {
    it('[TC-INT-VE-001] should return 200 OK with token and user payload', async () => {
      const mockPendingRow = {
        token: mockToken,
        email: 'verify@example.com',
        password_hash: 'hashed_password',
        username: 'verify_user',
        expired_at: new Date(Date.now() + 60000).toISOString(),
      };

      const mockUserRow = {
        user_id: 42,
        email: 'verify@example.com',
        username: 'verify_user',
        password_hash: 'hashed_password',
        avatar: null,
        role: 'user',
      };

      // 1. getPendingByToken
      pool.query.mockResolvedValueOnce({ rows: [mockPendingRow] });
      // 2. findUserByEmail
      pool.query.mockResolvedValueOnce({ rows: [] });

      // Inside transaction:
      mockClient.query.mockImplementation(async (sql) => {
        if (sql.includes('INSERT INTO users')) {
          return { rows: [mockUserRow] };
        }
        return { rows: [] };
      });

      const res = await request(app)
        .post('/auth/verify-email')
        .send({ token: mockToken });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          userId: 42,
          email: 'verify@example.com',
          username: 'verify_user',
          avatar: null,
          role: 'user',
          branch_id: null,
        },
      });

      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    });
  });

  describe('Test 2 - Duplicate email rejection', { tags: ['@A_R2', '@A_R10'] }, () => {
    it('[TC-INT-VE-002] should return 400 Bad Request when user email already exists', async () => {
      const mockPendingRow = {
        token: mockToken,
        email: 'verify@example.com',
        password_hash: 'hashed_password',
        username: 'verify_user',
        expired_at: new Date(Date.now() + 60000).toISOString(),
      };

      pool.query.mockResolvedValueOnce({ rows: [mockPendingRow] });
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 99, email: 'verify@example.com' }] }); // findUserByEmail returning row
      pool.query.mockResolvedValueOnce({ rows: [] }); // deletePendingByToken query outside transaction is pool.query

      const res = await request(app)
        .post('/auth/verify-email')
        .send({ token: mockToken });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Email already exists.' });
      expect(pool.query).toHaveBeenNthCalledWith(3, 'DELETE FROM pending_users WHERE token = $1', [
        mockToken,
      ]);
    });
  });

  describe('Test 3 - Token lifecycle and error codes', { tags: ['@A_R3', '@A_R10'] }, () => {
    it('[TC-INT-VE-003] should return 400 Bad Request when token is missing in request', async () => {
      const res = await request(app)
        .post('/auth/verify-email')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Verification token is required' });
    });

    it('[TC-INT-VE-004] should return 400 Bad Request when token is absent from pending_users', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // getPendingByToken returns empty

      const res = await request(app)
        .post('/auth/verify-email')
        .send({ token: 'absent-token-123' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid or expired verification link.' });
    });

    it('[TC-INT-VE-005] should return 410 Gone when token has expired', async () => {
      const mockPendingRow = {
        token: mockToken,
        email: 'verify@example.com',
        password_hash: 'hashed_password',
        username: 'verify_user',
        expired_at: new Date(Date.now() - 1000).toISOString(), // Expired
      };

      pool.query.mockResolvedValueOnce({ rows: [mockPendingRow] });
      pool.query.mockResolvedValueOnce({ rows: [] }); // deletePendingByToken query is pool.query

      const res = await request(app)
        .post('/auth/verify-email')
        .send({ token: mockToken });

      expect(res.status).toBe(410);
      expect(res.body).toEqual({
        error: 'Verification link has expired. Please register again.',
      });
      expect(pool.query).toHaveBeenNthCalledWith(2, 'DELETE FROM pending_users WHERE token = $1', [
        mockToken,
      ]);
    });
  });

  describe('Test 4 - Infrastructure failures and rollbacks', { tags: ['@A_R8', '@A_R9', '@A_R10'] }, () => {
    it('[TC-INT-VE-006] should return 500 and rollback transaction if user insertion fails', async () => {
      const mockPendingRow = {
        token: mockToken,
        email: 'verify@example.com',
        password_hash: 'hashed_password',
        username: 'verify_user',
        expired_at: new Date(Date.now() + 60000).toISOString(),
      };

      pool.query.mockResolvedValueOnce({ rows: [mockPendingRow] });
      pool.query.mockResolvedValueOnce({ rows: [] }); // findUserByEmail

      // mockClient inserts throws error
      mockClient.query.mockImplementation((sql) => {
        if (sql.includes('INSERT INTO users')) {
          return Promise.reject(new Error('Postgres unique constraint violation'));
        }
        return Promise.resolve({ rows: [] });
      });

      const res = await request(app)
        .post('/auth/verify-email')
        .send({ token: mockToken });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Postgres unique constraint violation' });
      expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
      expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
    });
  });
});
